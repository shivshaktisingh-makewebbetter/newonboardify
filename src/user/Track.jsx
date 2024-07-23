import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useState } from "react";
import { SortBy } from "./component/SortBy";
import { FilterBy } from "./component/FilterBy";
import { ExportBy } from "./component/ExportBy";
import { Pagination, Radio } from "antd";
import { RequestComponent } from "./component/RequestComponent";
import {
  getBoardSettingDataCustomerByID,
  getColorMappingForUser,
  getRequestTrackingData,
} from "../apiservice/ApiService";
import { useDispatch } from "react-redux";
import {
  setColumnData,
  setTrackBoardData,
} from "../redux/slices/trackBoardData";
import { Loader } from "../common/Loader";

let flag = false;

export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption] = useState([]);
  const [boardId, setBoardId] = useState("");
  const [data, setData] = useState([]);
  const [columnIdData, setColumnIdData] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [dataLength, setDataLength] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [originalArray, setOriginalArray] = useState([]);
  const [clonedData, setClonedData] = useState([]);
  const [colorMappingData, setColorMappingData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(9);
  const [statusItems, setStatusItems] = useState([]);
  const dispatch = useDispatch();

  const onChangeRadio = (item) => {
    if (item === "ASC") {
      setSelectedOrder(1);
    }
    if (item === "DESC") {
      setSelectedOrder(2);
    }
  };

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onShowSizeChange = (current, size) => {
    setLimit(size);
  };

  const setStateData = (data, length) => {
    setData(data.slice(0, 10));
    setOriginalArray(data);
    setDataLength(length);
    setCurrentPage(1);
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

  const filterDataBySearchString = (data, searchString) => {
    console.log(allColumns , columnIdData)
    return data.filter((item) => item.name.includes(searchString));
  };

  const handleFilter = (data, filter) => {
    if (filter == 9) {
      return data;
    }

    let tempStatus = "";
    statusItems.forEach((subItem) => {
      if (subItem.key == filter) {
        tempStatus = subItem.label;
      }
    });
    let tempStatusKey = "";

    allColumns.forEach((subItem) => {
      if (subItem.title === "Overall Status") {
        tempStatusKey = subItem.id;
      }
    });

    const tempFilterArray = [];
    data.forEach((item) => {
      item.column_values.forEach((subItem) => {
        if (subItem.id === tempStatusKey) {
          if (subItem.label === tempStatus) {
            tempFilterArray.push(item);
          }
        }
      });
    });
    return tempFilterArray;
  };

  const sortData = (data, order) => {
    return order === 1 ? data : data.slice().reverse();
  };

  const onChangeSearchData = () => {
    let tempData = [...clonedData];
    if (searchData.length > 0) {
      tempData = filterDataBySearchString(tempData, searchData);
    }
    tempData = sortData(tempData, selectedOrder);
    tempData = handleFilter(tempData, selectedFilter);
    setStateData(tempData, tempData.length);
  };

  const getFilterColumns = (items) => {
    let listOfStatus = {};
    items.forEach((subItem) => {
      if (subItem.title === "Overall Status") {
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

    let tempData = [...originalArray];
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
    setLoading(true);
    try {
      const response = await getRequestTrackingData();

      const response1 = await getBoardSettingDataCustomerByID(
        response.data.response.data.boards[0].id,
      );

      console.log(response1 ,'res')
      const response2 = await getColorMappingForUser();

      if (response.success) {
        dispatch(
          setTrackBoardData(
            response.data.response.data.boards[0].items_page.items
          )
        );
        getFilterColumns(response.data.response.data.boards[0].columns);
        setDataLength(
          response.data.response.data.boards[0].items_page.items.length
        );
        setOriginalArray(
          response.data.response.data.boards[0].items_page.items
        );
        setClonedData(response.data.response.data.boards[0].items_page.items);
        setData(
          response.data.response.data.boards[0].items_page.items.slice(0, 10)
        );
        setAllColumns(response.data.response.data.boards[0].columns);
      }

      if (response1.success) {
        setColumnIdData(JSON.parse(response1.data.response[0].columns));
        dispatch(setColumnData(JSON.parse(response1.data.response[0].columns)));
      }
      if (response2.success) {
        setColorMappingData(response2.data.response);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (flag) {
      onChangeSearchData();
    }

    setTimeout(() => {
      flag = true;
    }, 2000);
  }, [selectedOrder, selectedFilter, searchData]);

  useEffect(() => {
    getTrackRequestData();
  }, []);

  useEffect(() => {
    const tempData = [...originalArray];
    const from = (currentPage - 1) * limit;
    const to =
      dataLength < currentPage * limit ? dataLength : currentPage * limit;
    const newData = tempData.slice(from, to);
    setData(newData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, limit]);

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
        placeHolder={"Search By name or profession"}
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
      <Pagination
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
      />
    </div>
  );
};
