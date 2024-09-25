import {
  Button,
  Collapse,
  ColorPicker,
  Dropdown,
  Input,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
// import Hero from "../common/Hero";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import {
  getAllColumnsOfBoard,
  getProfileListing,
  governifyServiceReportAdminSetting,
} from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";
// import { fetcher } from "../../utils/helper";

export const ServiceReportSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [changeTitleModal, setChangeTitleModal] = useState({
    flag: false,
    type: "",
    previousValue: "",
    updatedValue: "",
  });
  const [companyChartData, setCompanyChartData] = useState({
    id: 0,
    title: "About Company",
    height: 400,
    boxes: [],
  });
  const [insightsChartData, setInsightsChartData] = useState({
    id: 0,
    title: "Insights",
    height: 800,
    boxes: [],
  });
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
      let tempCompanyData = { ...companyChartData };
      tempCompanyData.boxes.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        color: "",
        id: tempCompanyData.boxes.length + 1,
        size: { width: 360, height: 100 },
        showDragHandle: false,
        position: { x: 0, y: 20 },
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = { ...insightsChartData };
      tempInsightsData.boxes.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        color: "",
        id: tempInsightsData.boxes.length + 1,
        size: { width: 360, height: 100 },
        showDragHandle: false,
        position: { x: 0, y: 20 },
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypeBar = (type) => {
    if (type === "company") {
      let tempCompanyData = { ...companyChartData };
      tempCompanyData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        selectedColor: [],
        heading: "",
        description: "",
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: -40 },
        size: { width: 721, height: 422 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = { ...insightsChartData };
      tempInsightsData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        selectedColor: [],
        heading: "",
        description: "",
        id: tempInsightsData.boxes.length + 1,
        position: { x: 0, y: -40 },
        size: { width: 721, height: 422 },
        showDragHandle: false,
      });
      setInsightsChartData(tempInsightsData);
    }
  };

  const handleSelectChartTypePie = (type) => {
    if (type === "company") {
      let tempCompanyData = { ...companyChartData };
      tempCompanyData.boxes.push({
        type: "Pie Chart",
        horizontal: false,
        selectedColumns: [],
        selectedColor: [],
        heading: "",
        description: "",
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: -40 },
        size: { width: 721, height: 422 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "insights") {
      let tempInsightsData = { ...insightsChartData };
      tempInsightsData.boxes.push({
        type: "Pie Chart",
        horizontal: false,
        selectedColumns: [],
        selectedColor: [],
        heading: "",
        description: "",
        id: tempInsightsData.boxes.length + 1,
        position: { x: 0, y: -40 },
        size: { width: 350, height: 380 },
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
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].column1 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn1ChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].column2 = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeColumn2ChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].column2 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn2ChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].column2 = e;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeBarChartColumnCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    let tempColor = tempCompanyChartData.boxes[index].selectedColor;
    tempCompanyChartData.boxes[index].selectedColor = [];
    tempCompanyChartData.boxes[index].selectedColumns = e;

    e.forEach((subItem) => {
      // Check if the item already exists in tempColor
      const existingColor = tempColor.find((color) => color.key === subItem);

      // If the object exists, push the existing object
      if (existingColor) {
        tempCompanyChartData.boxes[index].selectedColor.push(existingColor);
      } else {
        // If it doesn't exist, create a new object with an empty value
        tempCompanyChartData.boxes[index].selectedColor.push({
          key: subItem,
          value: "",
        });
      }
    });

    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartColumnCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    let tempColor = tempCompanyChartData.boxes[index].selectedColor;
    tempCompanyChartData.boxes[index].selectedColor = [];
    tempCompanyChartData.boxes[index].selectedColumns = e;

    e.forEach((subItem) => {
      // Check if the item already exists in tempColor
      const existingColor = tempColor.find((color) => color.key === subItem);

      // If the object exists, push the existing object
      if (existingColor) {
        tempCompanyChartData.boxes[index].selectedColor.push(existingColor);
      } else {
        // If it doesn't exist, create a new object with an empty value
        tempCompanyChartData.boxes[index].selectedColor.push({
          key: subItem,
          value: "",
        });
      }
    });

    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeBarChartColumnInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    let tempColor = tempInsightsChartData.boxes[index].selectedColor;
    tempInsightsChartData.boxes[index].selectedColumns = e;
    tempInsightsChartData.boxes[index].selectedColor = [];

    e.forEach((subItem) => {
      // Check if the item already exists in tempColor
      const existingColor = tempColor.find((color) => color.key === subItem);

      // If the object exists, push the existing object
      if (existingColor) {
        tempInsightsChartData.boxes[index].selectedColor.push(existingColor);
      } else {
        // If it doesn't exist, create a new object with an empty value
        tempInsightsChartData.boxes[index].selectedColor.push({
          key: subItem,
          value: "",
        });
      }
    });
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangePieChartColumnInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    let tempColor = tempInsightsChartData.boxes[index].selectedColor;
    tempInsightsChartData.boxes[index].selectedColumns = e;
    tempInsightsChartData.boxes[index].selectedColor = [];

    e.forEach((subItem) => {
      // Check if the item already exists in tempColor
      const existingColor = tempColor.find((color) => color.key === subItem);

      console.log(existingColor, "existing");

      // If the object exists, push the existing object
      if (existingColor) {
        tempInsightsChartData.boxes[index].selectedColor.push(existingColor);
      } else {
        // If it doesn't exist, create a new object with an empty value
        tempInsightsChartData.boxes[index].selectedColor.push({
          key: subItem,
          value: "",
        });
      }
    });
    setInsightsChartData(tempInsightsChartData);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleChangeDelete = (index, type) => {
    if (type === "company") {
      const tempCompanyChartData = { ...companyChartData };
      tempCompanyChartData.boxes.splice(index, 1);
      setCompanyChartData(tempCompanyChartData);
    }
    if (type === "insights") {
      const tempInsightsChartData = { ...insightsChartData };
      tempInsightsChartData.boxes.splice(index, 1);
      setInsightsChartData(tempInsightsChartData);
    }
  };

  const handlChangeBarChartColorInsights = (value, index, childIndex) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].selectedColor[childIndex].value =
      value.toHexString();
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeBarChartColorCompany = (value, index, childIndex) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].selectedColor[childIndex].value =
      value.toHexString();
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartColorCompany = (value, index, childIndex) => {
    console.log(value, index, companyChartData);
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].selectedColor[childIndex].value =
      value.toHexString();
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartColorInsights = (value, index, childIndex) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].selectedColor[childIndex].value =
      value.toHexString();
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeBarChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].heading = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeBarChartDescriptionCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].description = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].heading = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePieChartDescriptionCompany = (e, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].description = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeBarChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].heading = e.target.value;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeBarChartDescriptionInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].description = e.target.value;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangePieChartHeadingInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].heading = e.target.value;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangePieChartDescriptionInsights = (e, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].description = e.target.value;
    setInsightsChartData(tempInsightsChartData);
  };

  const handlChangeTextChartColorCompany = (value, index) => {
    let tempCompanyChartData = { ...companyChartData };
    tempCompanyChartData.boxes[index].color = value.toHexString();
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTextChartColorInsights = (value, index) => {
    let tempInsightsChartData = { ...insightsChartData };
    tempInsightsChartData.boxes[index].color = value.toHexString();
    setInsightsChartData(tempInsightsChartData);
  };

  const getAddOnBeforeForColor = (key) => {
    let text = "";
    columnOptions.forEach((item) => {
      if (item.value === key) {
        text = `Color For ${item.label}`;
      }
    });
    return text;
  };

  const getCollapseItemsTypeCompany = (item, index) => {
    let newIndex = index + 1;
    if (item.type === "Text Chart") {
      return [
        {
          key: index,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "company")}>
                Delete
              </Button>
            </div>
          ),
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
                  value={item.column1 || undefined}
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
                  value={item.column2 || undefined}
                />
              </div>
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  width: "50%",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <span>Color For Column 2</span>
                <ColorPicker
                  value={item.color}
                  size="large"
                  showText
                  onChange={(value) =>
                    handlChangeTextChartColorCompany(value, index)
                  }
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
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "company")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Heading"}
                    value={item.heading}
                    onChange={(e) =>
                      handlChangeBarChartHeadingCompany(e, index)
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Description"}
                    value={item.description}
                    onChange={(e) =>
                      handlChangeBarChartDescriptionCompany(e, index)
                    }
                  />
                </div>
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
              <div>
                {item.selectedColor.map((subItem, childIndex) => {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "left",
                        width: "50%",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {getAddOnBeforeForColor(
                          item.selectedColumns[childIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={subItem.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangeBarChartColorCompany(
                            value,
                            index,
                            childIndex
                          )
                        }
                      />
                    </div>
                  );
                })}
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
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "company")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Heading"}
                    value={item.heading}
                    onChange={(e) =>
                      handlChangePieChartHeadingCompany(e, index)
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Description"}
                    value={item.description}
                    onChange={(e) =>
                      handlChangePieChartDescriptionCompany(e, index)
                    }
                  />
                </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangePieChartColumnCompany(e, index)}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.selectedColumns}
                />
              </div>
              <div>
                {item.selectedColor.map((subItem, childIndex) => {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "left",
                        width: "50%",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {getAddOnBeforeForColor(
                          item.selectedColumns[childIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={subItem.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangePieChartColorCompany(
                            value,
                            index,
                            childIndex
                          )
                        }
                      />
                    </div>
                  );
                })}
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
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "insights")}>
                Delete
              </Button>
            </div>
          ),
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
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  width: "50%",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <span>Color For Column 2</span>
                <ColorPicker
                  value={item.color}
                  size="large"
                  showText
                  onChange={(value) =>
                    handlChangeTextChartColorInsights(value, index)
                  }
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
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "insights")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Heading"}
                    value={item.heading}
                    onChange={(e) =>
                      handlChangeBarChartHeadingInsights(e, index)
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Description"}
                    value={item.description}
                    onChange={(e) =>
                      handlChangeBarChartDescriptionInsights(e, index)
                    }
                  />
                </div>
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

              <div>
                {item.selectedColor.map((subItem, childIndex) => {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "left",
                        width: "50%",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {getAddOnBeforeForColor(
                          item.selectedColumns[childIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={subItem.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangeBarChartColorInsights(
                            value,
                            index,
                            childIndex
                          )
                        }
                      />
                    </div>
                  );
                })}
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
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.type + " " + newIndex}</span>{" "}
              <Button onClick={() => handleChangeDelete(index, "insights")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
            <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Heading"}
                    value={item.heading}
                    onChange={(e) =>
                      handlChangePieChartHeadingInsights(e, index)
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Input
                    addonBefore={"Description"}
                    value={item.description}
                    onChange={(e) =>
                      handlChangePieChartDescriptionInsights(e, index)
                    }
                  />
                </div>
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
              <div>
                {item.selectedColor.map((subItem, childIndex) => {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "left",
                        width: "50%",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        {getAddOnBeforeForColor(
                          item.selectedColumns[childIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={subItem.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangePieChartColorInsights(
                            value,
                            index,
                            childIndex
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
      ];
    }
  };

  const handleChangeCompanyTitle = (e) => {
    setChangeTitleModal({
      flag: true,
      type: "company",
      previousValue: companyChartData.title,
      updatedValue: "",
    });
  };

  const handleChangeInsightsTitle = (e) => {
    setChangeTitleModal({
      flag: true,
      type: "insights",
      previousValue: companyChartData.title,
      updatedValue: "",
    });
  };

  const handleChangeTitle = (e) => {
    let tempChangeTitleModal = { ...changeTitleModal };
    tempChangeTitleModal.updatedValue = e.target.value;
    setChangeTitleModal(tempChangeTitleModal);
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
          <div>
            <span>{companyChartData.title}</span>
            <Button
              style={{ marginLeft: "10px" }}
              type="text"
              icon={<EditOutlined />}
              iconPosition="start"
              onClick={handleChangeCompanyTitle}
            ></Button>
          </div>{" "}
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
          {companyChartData.boxes.map((item, index) => {
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
          <div>
            <span>{insightsChartData.title}</span>
            <Button
              style={{ marginLeft: "10px" }}
              type="text"
              icon={<EditOutlined />}
              iconPosition="start"
              onClick={handleChangeInsightsTitle}
            ></Button>
          </div>{" "}
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
          {insightsChartData.boxes.map((item, index) => {
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
            if (tempData === null) {
            } else {
              setCompanyChartData(tempData.companyChartData);
              setInsightsChartData(tempData.insightsChartData);
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChartDataFormat = (data, flag) => {
    let position = { x: 0, y: 20 };
    let count = 0;
    const tempData = { id: data.id, height: 400, boxes: [] };

    data.boxes.forEach((item) => {
      // Create a new position object for each item to avoid reference issues
      let newPosition = { x: position.x, y: position.y };

      if (count < 3) {
        newPosition.x = newPosition.x + 435 * count;
      } else {
        newPosition.x = 0;
        newPosition.y = newPosition.y + 125;
        position.y = position.y + 125;
        count = 0; // Reset count for the next row
      }

      count = count + 1;

      let obj = { ...item, position: newPosition };
      tempData.boxes.push(obj);
    });
    tempData.height = position.y + 250;
    tempData.id = data.id;
    tempData.title = data.title;

    if (flag === "insights") {
      tempData.height = 1700;
    }

    return tempData;
  };

  const handleSubmit = async () => {
    const governify_service_report = JSON.stringify({
      companyChartData: getChartDataFormat(companyChartData),
      insightsChartData: getChartDataFormat(insightsChartData , 'insights'),
    });
    const payloadData = {
      profile_id: location.state.profileId.toString(),
      governify_service_report: governify_service_report,
    };

    try {
      const response = await governifyServiceReportAdminSetting(payloadData);
      if (response.success) {
        sessionStorage.removeItem('draggableResizableStateService');
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleViewChart = () => {
    navigate("/admin/serviceReportAdminView", { state: location.state });
  };

  const handleSaveTitle = () => {
    if (changeTitleModal.type === "company") {
      let tempCompanyChartData = { ...companyChartData };
      tempCompanyChartData.title = changeTitleModal.updatedValue;
      setCompanyChartData(tempCompanyChartData);
    }
    if (changeTitleModal.type === "insights") {
      let tempInsightsChartData = { ...insightsChartData };
      tempInsightsChartData.title = changeTitleModal.updatedValue;
      setInsightsChartData(tempInsightsChartData);
    }

    setChangeTitleModal({
      flag: false,
      type: "",
      previousValue: "",
      updatedValue: "",
    });
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
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          style={{ background: data.button_bg, color: "white", border: "none" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          style={{ background: data.button_bg, color: "white", border: "none" }}
          onClick={handleViewChart}
        >
          View
        </Button>
      </div>

      <Modal
        open={changeTitleModal.flag}
        title="Change Title"
        centered
        footer={(_, record) => (
          <>
            <Button
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleSaveTitle}
            >
              Save
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => {
                setChangeTitleModal({
                  flag: false,
                  type: "",
                  previousValue: "",
                  updatedValue: "",
                });
              }}
            >
              Cancel
            </Button>
          </>
        )}
        onCancel={() => {
          setChangeTitleModal({
            flag: false,
            type: "",
            previousValue: "",
            updatedValue: "",
          });
        }}
      >
        <Input
          value={changeTitleModal.updatedValue}
          onChange={handleChangeTitle}
        />
      </Modal>
    </div>
  );
};
