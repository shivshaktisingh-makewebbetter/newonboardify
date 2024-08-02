import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useState } from "react";
import { SortBy } from "./component/SortBy";
import { FilterBy } from "./component/FilterBy";
import { ExportBy } from "./component/ExportBy";
import { Button, Radio } from "antd";
import { RequestComponent } from "./component/RequestComponent";
import {
  getBoardIdByUser,
  getBoardSettingDataCustomerByID,
  getColorMappingForUser,
  getRequestTrackingDataByBoardIdAndSearch,
  getTrackingDataByBoardId,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";

let flag = false;

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
  const [colorMappingData, setColorMappingData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(9);
  const [statusItems, setStatusItems] = useState([]);
  const [cursor, setCursor] = useState("");
  const [searchKeys, setSearchKeys] = useState([]);
  const [loadMoreValue, setLoadMoreValue] = useState(1);

  const onChangeRadio = (item) => {
    if (item === "ASC") {
      setSelectedOrder(1);
    }
    if (item === "DESC") {
      setSelectedOrder(2);
    }
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
    let listOfStatus = {};
    items.forEach((subItem) => {
      if (subItem.id === columnIdData.required_columns.overall_status) {
        listOfStatus = JSON.parse(subItem.settings_str);
      }
    });

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

  const getTrackRequestData = async () => {
    let tempBoardId = "";
    setLoading(true);
    try {
      const boardIdData = await getBoardIdByUser();
      if (boardIdData.success) {
        setBoardId(boardIdData.data.response);
        tempBoardId = boardIdData.data.response;
      }
      const response = await getTrackingDataByBoardId(tempBoardId, null);

      const response1 = await getBoardSettingDataCustomerByID(
        response.data.response.data.boards[0].id
      );

      const response2 = await getColorMappingForUser();

      if (response.success) {
        console.log(response, "response");
        // getFilterColumns(response.data.response.data.boards[0].columns);
        setData(response.data.response.data.boards[0].items_page.items);
        setCursor(response.data.response.data.boards[0].items_page.cursor);
        setAllColumns(response.data.response.data.boards[0].columns);
      }

      if (response1.success) {
        setColumnIdData(JSON.parse(response1.data.response[0].columns));
        setSearchKeys(
          JSON.parse(response1.data.response[0].columns).required_columns
            .profession
        );
        console.log(JSON.parse(response1.data.response[0].columns));
      }
      if (response2.success) {
        setColorMappingData(response2.data.response);
      }
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
    if (selectedFilter !== 9) {
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

    // Ensure endIndex does not exceed the array length
    const validEndIndex = Math.min(endIndex, originalArray.length - 1);

    // Get the subarray from startIndex to validEndIndex (inclusive)
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
    if (flag) {
      getDataByFilterAndSearch();
    }
    setTimeout(() => {
      flag = true;
    }, 4000);
  }, [selectedOrder, selectedFilter, searchData]);

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
      />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          paddingTop: "8px",
          marginBottom: "32px",
        }}
      >
        <SortBy items={sortingItems} />
        <FilterBy items={statusItems} setSelectedFilter={setSelectedFilter} />
        <ExportBy handleExport={handleExport} />
      </div>
      <RequestComponent
        data={data}
        boardId={boardId}
        filterOption={filterOption}
        columnIdData={columnIdData}
        allColumns={allColumns}
        colorData={colorMappingData}
      />
      {cursor !== null && (
        <div>
          <Button
            onClick={
              selectedFilter !== 9 ||
              searchData.length > 0 ||
              selectedOrder !== 1
                ? getMoreData
                : loadMoreHandler
            }
          >
            Load More
          </Button>
        </div>
      )}
      {/* <Pagination
        showQuickJumper
        total={dataLength}
        onChange={onChange}
        showTotal={(total) => `Total ${total} items`}
        current={currentPage}
        showSizeChanger={true}
        onShowSizeChange={onShowSizeChange}
        defaultPageSize={10}
        pageSizeOptions={[10, 20, 50, 100]}
        align="center"
      /> */}
    </div>
  );
};
