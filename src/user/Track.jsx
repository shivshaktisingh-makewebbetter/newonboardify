import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useRef, useState } from "react";
import { SortBy } from "./component/SortBy";
import { FilterBy } from "./component/FilterBy";
import { ExportBy } from "./component/ExportBy";
import { Button, Radio } from "antd";
import { RequestComponent } from "./component/RequestComponent";
import {
  getAllProfileDataByUser,
  getAllFilters,
  getBoardSettingDataCustomerByID,
  getRequestTrackingDataByBoardIdAndSearch,
  getTrackingDataByBoardId,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";
import { FilterByService } from "./component/FilterByService";

export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [filterOption, setFilterOption] = useState([]);
  const [boardId, setBoardId] = useState("");
  const [data, setData] = useState([]);
  const [columnIdData, setColumnIdData] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState(9);
  const [selectedService, setSelectedService] = useState(0);
  const [statusItems, setStatusItems] = useState([]);
  const [cursor, setCursor] = useState("");
  const [searchKeys, setSearchKeys] = useState([]);
  const [loadMoreValue, setLoadMoreValue] = useState(1);
  const [serviceOptions, setServiceOptions] = useState([]);
  const initialRender = useRef(true);

  const onChangeRadio = (item) => {
    if (item === "ASC") {
      setSelectedOrder(1);
    }
    if (item === "DESC") {
      setSelectedOrder(2);
    }
    getDataByFilterAndSearch();
  };

  const sortingItems = [
    {
      key: "1",
      label: (
        <Radio.Group
          onChange={() => onChangeRadio("ASC")}
          value={selectedOrder}
        >
          <Radio value={1}>Asc</Radio>
        </Radio.Group>
      ),
    },
    {
      key: "2",
      label: (
        <Radio.Group
          onChange={() => onChangeRadio("DESC")}
          value={selectedOrder}
        >
          <Radio value={2}>Desc</Radio>
        </Radio.Group>
      ),
    },
  ];

  const getFilterColumns = (items) => {
    let listOfStatus = JSON.parse(items.settings_str);

    let updatedFilterColumn = [
      {
        label: "All",
        key: "9",
      },
    ];
    let statusObject = listOfStatus.labels;

    Object.keys(statusObject).map((key) =>
      updatedFilterColumn.push({
        label: statusObject[key],
        key: parseInt(key, 10),
      })
    );

    setStatusItems(updatedFilterColumn);
  };

  const handleExport = () => {
    let tempAllColumns = ["Name"];
    let tempAllColumnsIds = ["name"];
    if (columnIdData.candidate_coulmns === undefined) {
      return;
    }

    let tempData = [...data];
    columnIdData.candidate_coulmns.forEach((subItem) => {
      if (!tempAllColumns.includes(subItem.name)) {
        tempAllColumns.push(subItem.name);
        tempAllColumnsIds.push(subItem.id);
      }
    });
    columnIdData.onboarding_columns.forEach((subItem) => {
      if (!tempAllColumns.includes(subItem.name)) {
        tempAllColumns.push(subItem.name);
        tempAllColumnsIds.push(subItem.id);
      }
    });
    columnIdData.sub_headings_column.forEach((subItem) => {
      if (!tempAllColumns.includes(subItem.name)) {
        tempAllColumns.push(subItem.name);
        tempAllColumnsIds.push(subItem.id);
      }
    });

    const dataFormatToPrepare = [tempAllColumns];
    tempData.forEach((item) => {
      // Initialize clonedColumnId with empty strings
      let clonedColumnId = new Array(tempAllColumnsIds.length).fill("");

      // Set the first column value to item.name
      clonedColumnId[0] = item.name;

      item.column_values.forEach((subItem) => {
        let index = tempAllColumnsIds.indexOf(subItem.id);
        if (index !== -1) {
          clonedColumnId[index] = subItem.text;
        }
      });

      dataFormatToPrepare.push(clonedColumnId);
    });

    // Convert data array to CSV string
    const csvContent = dataFormatToPrepare
      .map((row) => row.join(","))
      .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");

    // Append the link to the body (necessary for Firefox)
    document.body.appendChild(link);

    // Trigger the download by simulating a click on the link
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };
  const getProfileData = async () => {
    try {
      const response = await getAllProfileDataByUser();

      return response;
    } catch (err) {
    } finally {
    }
  };

  const getTrackData = async (tempBoardId) => {
    if (tempBoardId === "") {
      return;
    }
    const rules = [];
    if (selectedFilter != 9) {
      rules.push({
        column_id: columnIdData.required_columns.overall_status,
        compare_value: [Number(selectedFilter)],
      });
    }
    if (searchData.length > 0) {
      searchKeys.forEach((item) => {
        rules.push({
          column_id: item,
          compare_value: [searchData],
          operator: "contains_text",
        });
      });
    }

    const payload = {
      query_params: {
        order_by: [
          {
            direction: selectedOrder === 1 ? "asc" : "desc",
            column_id: "__creation_log__",
          },
        ],
        ...(rules.length > 0 && { rules, operator: "or" }),
      },
    };

    try {
      const response = await getTrackingDataByBoardId(tempBoardId, payload);
      if (response.success) {
        setData(response.data.response.data.boards[0].items_page.items);
        setCursor(response.data.response.data.boards[0].items_page.cursor);
        setAllColumns(response.data.response.data.boards[0].columns);
      }
    } catch (err) {
    } finally {
    }
  };

  const getBoardSettingData = async (tempBoardId) => {
    try {
      const response = await getBoardSettingDataCustomerByID(tempBoardId);
      if (response.success) {
        let tempData = JSON.parse(response.data.response[0].columns);
        setColumnIdData(tempData);
        setSearchKeys(
          JSON.parse(response.data.response[0].columns).required_columns
            .profession
        );
      }
    } catch (err) {
    } finally {
    }
  };

  const getStatusFilterData = async (tempBoardId) => {
    try {
      const response = await getAllFilters(tempBoardId);
      if (response.success) {
        getFilterColumns(response.data.response.data.boards[0].columns[0]);
      }
    } catch (err) {
    } finally {
    }
  };

  const getTrackRequestData = async () => {
    let tempBoardId = "";
    setLoading(true);
    try {
      const profileResponse = await getProfileData();
      if (profileResponse.success) {
        let tempData = [];
        profileResponse.data.response[0].services.forEach((item, index) => {
          tempData.push({
            label: item.title,
            boardId: item.board_id,
            value: item.id,
            key: index,
          });
        });
        tempBoardId = tempData[0].boardId;
        setBoardId(tempData[0].boardId);
        setServiceOptions(tempData);
        setSelectedService(tempData[0].key);
      }
      await getBoardSettingData(tempBoardId);
      await getTrackData(tempBoardId);
      await getStatusFilterData(tempBoardId);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const loadMoreHandler = async () => {
    setLoading(true);
    try {
      const response = await getTrackingDataByBoardId(
        boardId,
        JSON.stringify({ cursor: cursor })
      );
      if (response.success) {
        let tempData = [
          ...data,
          ...response.data.response.data.boards[0].items_page.items,
        ];
        setData(tempData);
        setCursor(response.data.response.data.boards[0].items_page.cursor);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getDataByFilterAndSearch = async () => {
    const rules = [];
    if (selectedFilter != 9) {
      rules.push({
        column_id: columnIdData.required_columns.overall_status,
        compare_value: [Number(selectedFilter)],
      });
    }
    if (searchData.length > 0) {
      searchKeys.forEach((item) => {
        rules.push({
          column_id: item,
          compare_value: [searchData],
          operator: "contains_text",
        });
      });
    }

    const payload = {
      query_params: {
        order_by: [
          {
            direction: selectedOrder === 1 ? "asc" : "desc",
            column_id: "__creation_log__",
          },
        ],
        ...(rules.length > 0 && { rules, operator: "or" }),
      },
    };

    setLoading(true);

    try {
      const response = await getRequestTrackingDataByBoardIdAndSearch(
        boardId,
        JSON.stringify(payload)
      );
      if (response.success) {
        setData(
          response.data.response.data.boards[0].items_page.items.slice(0, 10)
        );
        setOriginalArray(
          response.data.response.data.boards[0].items_page.items
        );
        if (
          response.data.response.data.boards[0].items_page.items.length <= 10
        ) {
          setCursor(null);
        }
      }
      if (
        response.success &&
        response.data.response.data.boards[0].items_page.items.length === 0
      ) {
        setData([]);
        setOriginalArray([]);
        if (
          response.data.response.data.boards[0].items_page.items.length <= 10
        ) {
          setCursor(null);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getMoreData = () => {
    const startIndex = loadMoreValue * 10;
    const endIndex = startIndex + 10;
    const validEndIndex = Math.min(endIndex, originalArray.length - 1);
    const subArray = originalArray.slice(startIndex, validEndIndex + 1);
    if (subArray.length > 0) {
      setLoading(true);
      setTimeout(() => {
        if (subArray.length < 10) {
          setCursor(null);
        }
        const tempData = [...data, ...subArray];
        setData(tempData);
        setLoadMoreValue(loadMoreValue + 1);
        setLoading(false);
      }, 2000);
    } else {
      setCursor(null);
    }
    // originalArray.slice(10 , 20);
  };

  useEffect(() => {
    getTrackRequestData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {loading && <Loader />}
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Request Tracking"}
          subheading="Track your onboarding progress effortlessly by using our request-tracking center"
          forHome={true}
        />
      </div>
      <BreadcrumbComponent data={breadCrumbData} />
      <SearchBox
        placeHolder={"Search By profession"}
        setSearchData={setSearchData}
        getDataByFilterAndSearch={getDataByFilterAndSearch}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          paddingTop: "8px",
          marginBottom: "32px",
        }}
      >
        <FilterByService
          items={serviceOptions}
          setSelectedService={setSelectedService}
          setBoardId={setBoardId}
          getDataByFilterAndSearch={getDataByFilterAndSearch}
          boardId={boardId}
        />
        <SortBy
          items={sortingItems}
          getDataByFilterAndSearch={getDataByFilterAndSearch}
        />
        <FilterBy
          items={statusItems}
          setSelectedFilter={setSelectedFilter}
          getDataByFilterAndSearch={getDataByFilterAndSearch}
        />
        <ExportBy handleExport={handleExport} />
      </div>
      <RequestComponent
        data={data}
        boardId={boardId}
        filterOption={filterOption}
        columnIdData={columnIdData}
        allColumns={allColumns}
      />
      {cursor !== null && (
        <div>
          <Button
            onClick={
              selectedFilter !== 9 || searchData.length > 0
                ? getMoreData
                : loadMoreHandler
            }
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
