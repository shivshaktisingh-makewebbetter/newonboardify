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
  getAllProfileDataByUser,
  getAllFilters,
  getRequestTrackingDataByBoardIdAndSearch,
  getTrackingDataByBoardId,
  exportServiceData,
  requestTrackingWithOrCondition,
  getLastServiceUsedByUser,
  updateLastServiceUsedByUser,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";
import { FilterByService } from "./component/FilterByService";
import { CustomEmptyMessage } from "../common/CustomErrorComponent";

export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [boardId, setBoardId] = useState("");
  const [data, setData] = useState([]);
  const [columnIdData, setColumnIdData] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("9");
  const [selectedService, setSelectedService] = useState(0);
  const [statusItems, setStatusItems] = useState([]);
  const [cursor, setCursor] = useState("");
  const [searchKeys, setSearchKeys] = useState([]);
  const [loadMoreValue, setLoadMoreValue] = useState(1);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [tempSearchData, setTempSearchData] = useState("");
  const [filterKeyData, setFilterKeyData] = useState({});
  const [placeHolderSearch, setPlaceHolderSearch] = useState("");
  const [profileId, setProfileId] = useState("");

  const onChangeRadio = (item) => {
    let tempSelectedOrder = "";
    if (item === "ASC") {
      tempSelectedOrder = 1;
      setSelectedOrder(1);
    }
    if (item === "DESC") {
      tempSelectedOrder = 2;
      setSelectedOrder(2);
    }
    let data = {
      order: tempSelectedOrder,
      boardId: boardId,
      statusFilter: selectedFilter,
      searchData: searchData,
    };
    getDataByFilterAndSearch(data);
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

  const handleExport = async () => {
    setLoading(true);
    try {
      const data = [];
      const response = await exportServiceData(boardId);
      const tempResult = response.data.split("\n");
      tempResult.forEach((item) => {
        data.push(item);
      });

      const csvContent = data.join("\n");

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
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await getAllProfileDataByUser();

      return response;
    } catch (err) {
    } finally {
    }
  };

  const getTrackData = async (tempBoardId, filterKeyDataByUser) => {
    if (tempBoardId === "") {
      return;
    }
    const rules = [];

    if (
      Object.keys(filterKeyDataByUser).length > 0 &&
      filterKeyDataByUser.key.length > 0 &&
      filterKeyDataByUser.value.length > 0
    ) {
      rules.push({
        column_id: filterKeyDataByUser.key,
        compare_value: [filterKeyDataByUser.value],
        operator: "contains_text",
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
        ...(rules.length > 0 && { rules, operator: "and" }),
      },
    };

    try {
      const response = await getTrackingDataByBoardId(tempBoardId, payload);
      if (response.success) {
        setData(response.data.response.data.boards[0].items_page.items);
        setCursor(response.data.response.data.boards[0].items_page.cursor);
        setAllColumns(response.data.response.data.boards[0].columns);
      } else {
        if (
          response.data.response.data.boards[0].items_page.items.length === 0
        ) {
          setData([]);
        }
      }
    } catch (err) {
    } finally {
      setSelectedFilter("9");
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

  const getPreviousSelectedService = async () => {
    try {
      const response = await getLastServiceUsedByUser();

      return response;
    } catch (err) {
    } finally {
    }
  };

  const updateSelectedService = async (data) => {
    try {
      const response = await updateLastServiceUsedByUser(data);
    } catch (err) {
    } finally {
    }
  };

  const getTrackRequestData = async () => {
    let tempBoardId = "";
    let filterKeyDataByUser = {};
    setLoading(true);
    try {
      const lastServiceResponse = await getPreviousSelectedService();

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
        setServiceOptions(tempData);
        setProfileData(profileResponse.data.response[0].services);
        setProfileId(profileResponse.data.response[0].id);

        if (lastServiceResponse.success) {
          tempData.forEach((detail) => {
            if (
              detail.value.toString() ===
              lastServiceResponse.data.response[0].service_id
            ) {
              setSelectedService(detail.key);
              setBoardId(detail.boardId);
              tempBoardId = detail.boardId;
            }
          });
        } else {
          setSelectedService(tempData[0].key);
          setBoardId(tempData[0].boardId);
          tempBoardId = tempData[0].boardId;
        }

        profileResponse.data.response[0].services.forEach((item) => {
          if (item.board_id === tempBoardId) {
            if (JSON.parse(item.service_column_value_filter).value.length > 0) {
              filterKeyDataByUser = JSON.parse(
                item.service_column_value_filter
              );
              setFilterKeyData(filterKeyDataByUser);
            }

            setColumnIdData(JSON.parse(item.service_setting_data));
            setSearchKeys(
              JSON.parse(item.service_setting_data).required_columns.profession
            );
          }
        });
      }

      await getTrackData(tempBoardId, filterKeyDataByUser);
      await getStatusFilterData(tempBoardId);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const setPlaceHolderText = () => {
    let text = "Search by ";
    if (
      Object.keys(columnIdData).length > 0 &&
      Object.keys(columnIdData.required_columns.profession).length > 0 &&
      allColumns.length > 0
    ) {
      allColumns.forEach((item) => {
        if (columnIdData.required_columns.profession.includes(item.id)) {
          text = text + item.title + " or ";
        }
      });
      text = text.slice(0, -4);
      setPlaceHolderSearch(text);
    } else {
      setPlaceHolderSearch("Search here");
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

  const getDataByFilterAndSearch = async (tempFilters) => {
    const rules = [];
    const newRules = [];
    if (tempFilters.statusFilter != 9) {
      rules.push({
        column_id: columnIdData.required_columns.overall_status,
        compare_value: [Number(tempFilters.statusFilter)],
      });
    }
    if (Object.keys(filterKeyData).length > 0 && filterKeyData.key.length > 0) {
      rules.push({
        column_id: filterKeyData.key,
        compare_value: [filterKeyData.value],
        operator: "contains_text",
      });
    }
    if (tempFilters.searchData.length > 0) {
      searchKeys.forEach((item) => {
        newRules.push({
          column_id: item,
          compare_value: [tempFilters.searchData],
          operator: "contains_text",
        });
      });
    }

    const payload = {
      query_params: {
        order_by: [
          {
            direction: tempFilters.order === 1 ? "asc" : "desc",
            column_id: "__creation_log__",
          },
        ],
        ...(rules.length > 0 && { rules, operator: "and" }),
      },
    };

    const newPayload = {
      query_params: {
        order_by: [
          {
            direction: tempFilters.order === 1 ? "asc" : "desc",
            column_id: "__creation_log__",
          },
        ],
        ...(newRules.length > 0 && { rules: newRules, operator: "or" }),
      },
    };

    setLoading(true);

    try {
      const response = await getRequestTrackingDataByBoardIdAndSearch(
        tempFilters.boardId,
        JSON.stringify(payload)
      );

      const response1 = await requestTrackingWithOrCondition(
        tempFilters.boardId,
        JSON.stringify(newPayload)
      );
      const arr1 = response.data.response.data.boards[0].items_page.items;
      const arr2 = response1.data.response.data.boards[0].items_page.items;

      const getCommonObjects = (arr1, arr2) => {
        return arr1.filter((obj1) => arr2.some((obj2) => obj1.id === obj2.id));
      };

      const commonObjects = getCommonObjects(arr1, arr2);
      console.log(commonObjects, "common");
      if (commonObjects.length > 0) {
        if (commonObjects.length > 10) {
          setData(commonObjects.slice(0, 10));
          setOriginalArray(commonObjects);
          setCursor('');
        } else {
          setData(commonObjects);
          setCursor(null)
        }
      } else {
      }

      // if (response.success) {
      //   if (tempFilters.searchData.length > 0) {
      //     setData(commonObjects.slice(0, 10));
      //     setOriginalArray(commonObjects);
      //   } else {
      //     setData(
      //       response.data.response.data.boards[0].items_page.items.slice(0, 10)
      //     );
      //     setOriginalArray(
      //       response.data.response.data.boards[0].items_page.items
      //     );
      //   }

      //   if (tempFilters.searchData.length > 0) {
      //   } else {
      //     if (
      //       response.data.response.data.boards[0].items_page.items.length <= 10
      //     ) {
      //       setCursor(null);
      //     }
      //   }
      // }
      // if (
      //   response.success &&
      //   response.data.response.data.boards[0].items_page.items.length === 0
      // ) {
      //   setData([]);
      //   setOriginalArray([]);

      //   if (
      //     response.data.response.data.boards[0].items_page.items.length <= 10
      //   ) {
      //     setCursor(null);
      //   }
      // }
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

  useEffect(() => {
    setPlaceHolderText();
  }, [profileData, allColumns]);

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
        placeHolder={placeHolderSearch}
        setSearchData={setSearchData}
        getDataByFilterAndSearch={getDataByFilterAndSearch}
        boardId={boardId}
        order={selectedOrder}
        selectedFilter={selectedFilter}
        flag={true}
        tempSearchData={tempSearchData}
        setTempSearchData={setTempSearchData}
      />
      <div className="onboardify-filter-sort-container">
        <div className="onboardify-service-sort">
          <FilterByService
            items={serviceOptions}
            setSelectedService={setSelectedService}
            setBoardId={setBoardId}
            getDataByFilterAndSearch={getDataByFilterAndSearch}
            order={selectedOrder}
            selectedFilter={selectedFilter}
            searchData={searchData}
            profileData={profileData}
            setColumnIdData={setColumnIdData}
            setSearchKeys={setSearchKeys}
            setSearchData={setSearchData}
            tempSearchData={tempSearchData}
            setTempSearchData={setTempSearchData}
            getTrackData={getTrackData}
            setLoading={setLoading}
            setSelectedFilter={setSelectedFilter}
            filterKeyData={filterKeyData}
            setFilterKeyData={setFilterKeyData}
            updateSelectedService={updateSelectedService}
            profileId={profileId}
            selectedService={selectedService}
          />
          <SortBy
            items={sortingItems}
            getDataByFilterAndSearch={getDataByFilterAndSearch}
          />
        </div>
        <div className="onboardify-filter-export">
          <FilterBy
            items={statusItems}
            setSelectedFilter={setSelectedFilter}
            getDataByFilterAndSearch={getDataByFilterAndSearch}
            boardId={boardId}
            order={selectedOrder}
            selectedFilter={selectedFilter}
            searchData={searchData}
          />
          <ExportBy handleExport={handleExport} />
        </div>
      </div>
      {!loading && (
        <RequestComponent
          data={data}
          boardId={boardId}
          columnIdData={columnIdData}
          allColumns={allColumns}
          profileData={profileData}
        />
      )}
      {!loading && data.length === 0 && <CustomEmptyMessage />}
      {cursor !== null && data.length !== 0 && !loading && (
        <div>
          <Button
            onClick={originalArray.length > 0 ? getMoreData : loadMoreHandler}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
