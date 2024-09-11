import { Button, Collapse, Dropdown, Input, Select } from "antd";
import { useEffect, useState } from "react";
// import Hero from "../common/Hero";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
// import { fetcher } from "../../utils/helper";

export const ServiceReportSettings = () => {
  const location = useLocation();
  const [companyChartData, setCompanyChartData] = useState([]);
  const [insightsChartData, setInsightsChartData] = useState([]);
  const [activeKey, setActiveKey] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);

  const handleSelectChartTypeText = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Text Chart",
        heading: "",
        mainText: "",
        tag: "",
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Text Chart",
        heading: "",
        mainText: "",
        tag: "",
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypeValue = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Value Chart",
        mainColumn: "",
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Value Chart",
        mainColumn: "",
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypePercentage = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Percentage Chart",
        mainColumn: "",
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Percentage Chart",
        mainColumn: "",
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypeBar = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Bar Chart",
        selectedColumns: [],
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Bar Chart",
        selectedColumns: [],
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypePie = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Pie Chart",
        selectedColumns: [],
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Pie Chart",
        selectedColumns: [],
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const typesOfChartCompany = [
    {
      key: "1",
      label: (
        <span onClick={() => handleSelectChartTypeText("company")}>
          Text Chart
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleSelectChartTypeValue("company")}>
          Value Chart
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("company")}>
          Percentage Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePie("company")}>
          Pie Chart
        </span>
      ),
    },

    {
      key: "5",
      label: (
        <span onClick={() => handleSelectChartTypeBar("company")}>
          Bar Chart
        </span>
      ),
    },
  ];

  const typesOfChartInsights = [
    {
      key: "1",
      label: (
        <span onClick={() => handleSelectChartTypeText("insights")}>
          Text Chart
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleSelectChartTypeValue("insights")}>
          Value Chart
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("insights")}>
          Percentage Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePie("insights")}>
          Pie Chart
        </span>
      ),
    },

    {
      key: "5",
      label: (
        <span onClick={() => handleSelectChartTypeBar("insights")}>
          Bar Chart
        </span>
      ),
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
  };

  const handlChangeTextChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].heading = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTextChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].heading = e.target.value;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeMainTextChartHeadingCompany = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
    console.log(e, index, "sdssdsdfsd");
  };

  const handlChangeMainTextChartHeadingInsights = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTagTextChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].mainColumn = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeValueChartColumnCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].mainColumn = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePercentageChartColumnCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].mainColumn = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeBarChartColumnCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].selectedColumns = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartColumnCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].selectedColumns = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeValueChartColumnInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].selectedColumns = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeTagTextChartHeadingInsighta = (e, index) => {};

  const handlChangePercentageChartColumnInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].selectedColumns = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeBarChartColumnInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].selectedColumns = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangePieChartColumnInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].selectedColumns = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const getCollapseItemsTypeCompany = (item, index) => {
    let newIndex = index + 1;
    if (item.type === "Text Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Input
                  addonBefore="Heading"
                  style={{
                    width: "50%",
                  }}
                  value={item.heading}
                  onChange={(e) => {
                    handlChangeTextChartHeadingCompany(e, index);
                  }}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column Id For Main Text"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeMainTextChartHeadingCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeTagTextChartHeadingCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Value Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Percentage Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnCompany(e, index)
                  }
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Bar Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangeBarChartColumnCompany(e, index)}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Pie Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangePieChartColumnCompany(e, index)}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }
  };

  const getCollapseItemsTypeInsights = (item, index) => {
    let newIndex = index + 1;
    if (item.type === "Text Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Input
                  addonBefore="Heading"
                  style={{
                    width: "50%",
                  }}
                  value={item.heading}
                  onChange={(e) => {
                    handlChangeTextChartHeadingInsights(e, index);
                  }}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column Id For Main Text"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeMainTextChartHeadingInsights(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeTagTextChartHeadingInsighta(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Value Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnInsights(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Percentage Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnInsights(e, index)
                  }
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Bar Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangeBarChartColumnInsights(e, index)}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (item.type === "Pie Chart") {
      return [
        {
          key: index,
          label: item.type + " " + newIndex,
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangePieChartColumnInsights(e, index)}
                  options={columnOptions}
                  filterOption={filterOption}
                />
              </div>
            </>
          ),
        },
      ];
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>About Company</span>{" "}
          {activeKey.includes("1") ? (
            <Dropdown
              menu={{
                items: typesOfChartCompany,
              }}
              placement="bottom"
              arrow
            >
              <Button>Add New Chart</Button>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
      ),
      children: (
        <div style={{ marginTop: "10px" }}>
          {companyChartData.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ marginTop: "10px" }}>
                  <Collapse items={getCollapseItemsTypeCompany(item, index)} />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Insights</span>{" "}
          {activeKey.includes("2") ? (
            <Dropdown
              menu={{
                items: typesOfChartInsights,
              }}
              placement="bottom"
              arrow
            >
              <Button>Add New Chart</Button>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
      ),
      children: (
        <div style={{ marginTop: "10px" }}>
          {insightsChartData.map((item, index) => {
            return (
              <div>
                <div style={{ marginTop: "10px" }}>
                  <Collapse items={getCollapseItemsTypeInsights(item, index)} />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    // try {
    //   const url = `newonboardify/admin/get-board-columns/${location.state.selectedProfileData.governify_board_id}`;
    //   const method = "GET";
    //   const response = await fetcher(url, method);
    //   if (response.status) {
    //     const tempData = [];
    //     response.response.forEach((item) => {
    //       tempData.push({ label: item.title, value: item.id });
    //     });
    //     setColumnOptions(tempData);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "48px", marginBottom: "16px" }}>
        <Hero
          heading={"Service Report Setting"}
          subheading="Stay informed and in control of the service reports of your requests"
          forHome={false}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Collapse
          collapsible="icon"
          items={items}
          onChange={onChange}
          activeKey={activeKey}
        />
      </div>
    </div>
  );
};
