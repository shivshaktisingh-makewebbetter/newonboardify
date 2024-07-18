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
  getRequestTrackingData,
} from "../apiservice/ApiService";

export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption] = useState([]);
  const [selectedSortingOrder, setSelectedSortingOrder] = useState("");
  const [boardId, setBoardId] = useState("");
  const [data, setData] = useState([]);
  const [columnIdData, setColumnIdData] = useState({});
  const [allColumns, setAllColumns] = useState([]);
  const [dataLength, setDataLength] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [originalArray, setOriginalArray] = useState([]);
  const [clonedData, setClonedData] = useState([]);

  const onChangeRadio = (item) => {
    console.log(item);
  };

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onShowSizeChange = (current, size) => {
    setLimit(size);
  };

  const sortingItems = [
    {
      key: "1",
      label: (
        <Radio.Group
          onChange={() => onChangeRadio("ASC")}
          value={selectedSortingOrder}
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
          value={selectedSortingOrder}
        >
          <Radio value={2}>Desc</Radio>
        </Radio.Group>
      ),
    },
  ];

  const handleExport = () => {};

  const getTrackRequestData = async () => {
    const response = await getRequestTrackingData();
    const response1 = await getBoardSettingDataCustomerByID();
    if (response.success) {
      setOriginalArray(response.data.response.data.boards[0].items_page.items);
      setClonedData(response.data.response.data.boards[0].items_page.items);
      setData(response.data.response.data.boards[0].items_page.items.slice(0, 10));
      setAllColumns(response.data.response.data.boards[0].columns);
    }

    if (response1.success) {
      setColumnIdData(JSON.parse(response1.data.response[0].columns));
    }

    console.log(JSON.parse(response1.data.response[0].columns));
  };

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
        searchData={searchData}
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
        <FilterBy items={filterOption} setFilter={setFilter} />
        <ExportBy handleExport={handleExport} />
      </div>
      <RequestComponent
        data={data}
        boardId={boardId}
        filterOption={filterOption}
        columnIdData={columnIdData}
        allColumns={allColumns}
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
