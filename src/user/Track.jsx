import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";
import { SearchBox } from "../components/SearchBox";
import { useState } from "react";
import { SortBy } from "./component/SortBy";
import { FilterBy } from "./component/FilterBy";
import { ExportBy } from "./component/ExportBy";
import { Radio } from "antd";
import { RequestComponent } from "./component/RequestComponent";

export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption] = useState([]);
  const [selectedSortingOrder, setSelectedSortingOrder] = useState("");
  const [boardId , setBoardId] = useState('');
  const data = [
    {
      createdDate: "Created at July 3, 2024",
      topHead: "Expat Outside KSA",
      name: "Test MWB",
      subName: "ARFF Training Officer",
      status: "IN PROGRESS",
    },
    {
      createdDate: "Created at July 3, 2024",
      topHead: "Expat Outside KSA",
      name: "Test MWB",
      subName: "ARFF Training Officer",
      status: "IN PROGRESS",
    },
    {
      createdDate: "Created at July 3, 2024",
      topHead: "Expat Outside KSA",
      name: "Test MWB",
      subName: "ARFF Training Officer",
      status: "IN PROGRESS",
    },
  ];

  const onChangeRadio = (item) => {
    console.log(item);
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
      />
    </div>
  );
};
