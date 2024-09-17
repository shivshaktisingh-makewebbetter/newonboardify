import { Button, Collapse, Dropdown, Input, Select } from "antd";
import { useEffect, useState } from "react";
// import Hero from "../common/Hero";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { getAllColumnsOfBoard, getProfileListing, governifyComplianceReportAdminSetting, governifyServiceReportAdminSetting } from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";
// import { fetcher } from "../../utils/helper";

export const ServiceReportSettings = () => {
  const location = useLocation();
  const [companyChartData, setCompanyChartData] = useState([]);
  const [insightsChartData, setInsightsChartData] = useState([]);
  const [activeKey, setActiveKey] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);

  const data = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const handleSelectChartTypeText = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        id: tempCompanyData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        id: tempInsightsData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypeBar = (type) => {
    if (type === "company") {
      let tempCompanyData = [...companyChartData];
      tempCompanyData.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempCompanyData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempInsightsData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
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
        id: tempCompanyData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = [...insightsChartData];
      tempInsightsData.push({
        type: "Pie Chart",
        selectedColumns: [],
        id: tempInsightsData.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
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
        <span onClick={() => handleSelectChartTypePie("company")}>
          Pie Chart
        </span>
      ),
    },
    {
      key: "3",
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
        <span onClick={() => handleSelectChartTypePie("insights")}>
          Pie Chart
        </span>
      ),
    },
    {
      key: "3",
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

  const handlChangeColumn1ChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].column1 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn1ChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].column2 = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeColumn2ChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].column2 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn2ChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = [...insightsChartData];
    tempInsightsChartData[index].column2 = e;
    setInsightsChartData(tempInsightsChartData);
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
                <Select
                  showSearch
                  placeholder="Select Id For Column1"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeColumn1ChartHeadingCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column1}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Id For Column2"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeColumn2ChartHeadingCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column2}
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
                  value={item.selectedColumns}
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
                  value={item.selectedColumns}
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
                <Select
                  showSearch
                  placeholder="Select Id For Column1"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeColumn1ChartHeadingInsights(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column1}
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Id For Column2"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeColumn2ChartHeadingInsights(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column2}
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
                  value={item.selectedColumns}
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
                  value={item.selectedColumns}
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
    try {
      const response = await getAllColumnsOfBoard(location.state.boardId);
      const response1 = await getProfileListing();

      if (response.success) {
        const tempData = [];
        response.data.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
        });
        setColumnOptions(tempData);
      }
      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (item.id.toString() === location.state.profileId.toString()) {
            const tempData = JSON.parse(item.governify_service_report);
            setCompanyChartData(tempData.companyChartData);
            setInsightsChartData(tempData.insightsChartData);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const governify_service_report = JSON.stringify({
      companyChartData: companyChartData,
      insightsChartData: insightsChartData
    });
    const payloadData = {
      profile_id: location.state.profileId.toString(),
      governify_service_report: governify_service_report,
    };

    try {
      const response = await governifyServiceReportAdminSetting(payloadData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
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
      <ToastContainer position="bottom-right" />
      <div style={{marginTop:"20px"}}>

      <Button
          style={{ background: data.button_bg, color: "white", border: "none" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
      
    </div>
  );
};
