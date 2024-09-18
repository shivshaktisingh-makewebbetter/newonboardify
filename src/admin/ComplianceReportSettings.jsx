import { Button, Collapse, Dropdown, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import {
  getAllColumnsOfBoard,
  getProfileListing,
  governifyComplianceReportAdminSetting,
} from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";

export const ComplianceReportSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendationText, setRecommendationText] = useState("");
  const [companyChartData, setCompanyChartData] = useState({
    id: 0,
    height: 400,
    boxes: [],
  });
  const [saudizationChartData, setSaudizationChartData] = useState({
    id: 0,
    height: 800,
    boxes: [],
  });
  const [visaChartData, setVisaChartData] = useState({
    id: 0,
    height: 400,
    boxes: [],
  });
  const [employeesChartData, setEmployeesChartData] = useState({
    id: 0,
    height: 400,
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
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
        position: { x: 0, y: -40 },
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "saudization") {
      let tempSaudizationData = { ...saudizationChartData };
      tempSaudizationData.boxes.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        id: tempSaudizationData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = { ...visaChartData };
      tempVisaData.boxes.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        id: tempVisaData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = { ...employeesChartData };
      tempEmployeeData.boxes.push({
        type: "Text Chart",
        column1: "",
        column2: "",
        id: tempEmployeeData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setEmployeesChartData(tempEmployeeData);
    }
  };

  const handleSelectChartTypeValue = (type) => {
    if (type === "company") {
      let tempCompanyData = { ...companyChartData };
      tempCompanyData.boxes.push({
        type: "Value Chart",
        column: "",
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "saudization") {
      let tempSaudizationData = { ...saudizationChartData };
      tempSaudizationData.boxes.push({
        type: "Value Chart",
        column: "",
        id: tempSaudizationData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = { ...visaChartData };
      tempVisaData.boxes.push({
        type: "Value Chart",
        column: "",
        id: tempVisaData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = { ...employeesChartData };
      tempEmployeeData.boxes.push({
        type: "Value Chart",
        column: "",
        id: tempEmployeeData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 360, height: 100 },
        showDragHandle: false,
      });
      setEmployeesChartData(tempEmployeeData);
    }
  };

  const handleSelectChartTypeBar = (type) => {
    if (type === "company") {
      let tempCompanyData = {...companyChartData};
      tempCompanyData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "saudization") {
      let tempSaudizationData = {...saudizationChartData};
      tempSaudizationData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempSaudizationData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = {...visaChartData};
      tempVisaData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempVisaData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = {...employeesChartData};
      tempEmployeeData.boxes.push({
        type: "Bar Chart",
        horizontal: false,
        selectedColumns: [],
        id: tempEmployeeData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setEmployeesChartData(tempEmployeeData);
    }
  };

  const handleSelectChartTypePercentage = (type) => {
    if (type === "company") {
      let tempCompanyData = { ...companyChartData };
      tempCompanyData.boxes.push({
        type: "Multi Value Chart",
        selectedColumns: [],
        id: tempCompanyData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 800 },
        showDragHandle: false,
      });
      setCompanyChartData(tempCompanyData);
    }
    if (type === "saudization") {
      let tempSaudizationData = { ...saudizationChartData };
      tempSaudizationData.boxes.push({
        type: "Multi Value Chart",
        selectedColumns: [],
        id: tempSaudizationData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = { ...visaChartData };
      tempVisaData.boxes.push({
        type: "Multi Value Chart",
        selectedColumns: [],
        id: tempVisaData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = { ...employeesChartData };
      tempEmployeeData.boxes.push({
        type: "Multi Value Chart",
        selectedColumns: [],
        id: tempEmployeeData.boxes.length + 1,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        showDragHandle: false,
      });
      setEmployeesChartData(tempEmployeeData);
    }
  };

  const barTypeChartOptions = [
    { label: "Horizontal chart", value: true },
    { label: "Vertical Chart", value: false },
  ];

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
        <span onClick={() => handleSelectChartTypeBar("company")}>
          Bar Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("company")}>
          Multi Value Chart
        </span>
      ),
    },
  ];

  const typesOfChartSaudization = [
    {
      key: "1",
      label: (
        <span onClick={() => handleSelectChartTypeText("saudization")}>
          Text Chart
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleSelectChartTypeValue("saudization")}>
          Value Chart
        </span>
      ),
    },

    {
      key: "3",
      label: (
        <span onClick={() => handleSelectChartTypeBar("saudization")}>
          Bar Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("saudization")}>
          Multi Value Chart
        </span>
      ),
    },
  ];

  const typesOfChartVisa = [
    {
      key: "1",
      label: (
        <span onClick={() => handleSelectChartTypeText("visa")}>
          Text Chart
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleSelectChartTypeValue("visa")}>
          Value Chart
        </span>
      ),
    },

    {
      key: "3",
      label: (
        <span onClick={() => handleSelectChartTypeBar("visa")}>Bar Chart</span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("visa")}>
          Multi Value Chart
        </span>
      ),
    },
  ];

  const typesOfChartEmployees = [
    {
      key: "1",
      label: (
        <span onClick={() => handleSelectChartTypeText("employees")}>
          Text Chart
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleSelectChartTypeValue("employees")}>
          Value Chart
        </span>
      ),
    },

    {
      key: "3",
      label: (
        <span onClick={() => handleSelectChartTypeBar("employees")}>
          Bar Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypePercentage("employees")}>
          Multi Value Chart
        </span>
      ),
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onChangeRecommendtionText = (e) => {
    setRecommendationText(e);
  };

  const handlChangeColumn1ChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].column1 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn1ChartHeadingSaudization = (e, index) => {
    let tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].column1 = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeColumn1ChartHeadingEmployees = (e, index) => {
    let tempEmployeeChartData = {...employeesChartData};
    tempEmployeeChartData.boxes[index].column1 = e;
    setEmployeesChartData(tempEmployeeChartData);
  };

  const handlChangeColumn1ChartHeadingVisa = (e, index) => {
    let tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].column1 = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeColumn2ChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].column2 = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeColumn2ChartHeadingSaudization = (e, index) => {
    let tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].column2 = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeColumn2ChartHeadingEmployees = (e, index) => {
    let tempEmployeesChartData = {...employeesChartData};
    tempEmployeesChartData.boxes[index].column2 = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangeColumn2ChartHeadingVisa = (e, index) => {
    let tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].column2 = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeValueChartColumnCompany = (e, index) => {
    let tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].column = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangePercentageChartColumnCompany = (e, index) => {
    let tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].selectedColumns = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeBarChartColumnCompany = (e, index) => {
    let tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].selectedColumns = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeValueChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].column = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangePercentageChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].selectedColumns = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeBarChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].selectedColumns = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeValueChartColumnEmployees = (e, index) => {
    let tempEmployeesChartData = {...employeesChartData};
    tempEmployeesChartData.boxes[index].column = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangePercentageChartColumnEmployees = (e, index) => {
    let tempEmployeesChartData = {...employeesChartData};
    tempEmployeesChartData.boxes[index].selectedColumns = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangeBarChartColumnEmployees = (e, index) => {
    let tempEmployeeChartData = {...employeesChartData};
    tempEmployeeChartData.boxes[index].selectedColumns = e;
    setEmployeesChartData(tempEmployeeChartData);
  };

  const handlChangeValueChartColumnVisa = (e, index) => {
    let tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].column = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangePercentageChartColumnVisa = (e, index) => {
    let tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].selectedColumns = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeBarChartColumnVisa = (e, index) => {
    let tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].selectedColumns = e;
    setVisaChartData(tempVisaChartData);
  };

  const onChangeSwitchCompany = (e, index) => {
    const tempCompanyChartData = {...companyChartData};
    tempCompanyChartData.boxes[index].horizontal = e;
    setCompanyChartData(tempCompanyChartData);
  };

  const onChangeSwitchVisa = (e, index) => {
    const tempVisaChartData = {...visaChartData};
    tempVisaChartData.boxes[index].horizontal = e;
    setVisaChartData(tempVisaChartData);
  };

  const onChangeSwitchEmployees = (e, index) => {
    const tempEmployeesChartData = {...employeesChartData};
    tempEmployeesChartData.boxes[index].horizontal = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const onChangeSwitchSaudization = (e, index) => {
    const tempSaudizationChartData = {...saudizationChartData};
    tempSaudizationChartData.boxes[index].horizontal = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleChangeDelete = (index, type) => {
    if (type === "company") {
      const tempCompanyChartData = {...companyChartData};
      tempCompanyChartData.boxes.splice(index, 1);
      setCompanyChartData(tempCompanyChartData);
    }
    if (type === "employees") {
      const tempEmployeesChartData = {...employeesChartData};
      tempEmployeesChartData.boxes.splice(index, 1);
      setEmployeesChartData(tempEmployeesChartData);
    }
    if (type === "visa") {
      const tempVisaChartData = {...visaChartData};
      tempVisaChartData.boxes.splice(index, 1);
      setVisaChartData(tempVisaChartData);
    }
    if (type === "saudization") {
      const tempSaudizationChartData = {...saudizationChartData};
      tempSaudizationChartData.boxes.splice(index, 1);
      setSaudizationChartData(tempSaudizationChartData);
    }
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

    if (item.type === "Value Chart") {
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
                  placeholder="Select Column"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnCompany(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column}
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
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div>Bar Chart Type :</div>
                <Select
                  showSearch
                  placeholder="Select Bar Chart Type"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => onChangeSwitchCompany(e, index)}
                  options={barTypeChartOptions}
                  filterOption={filterOption}
                  value={item.horizontal}
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
            </>
          ),
        },
      ];
    }

    if (item.type === "Multi Value Chart") {
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
                  mode="multiple"
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnCompany(e, index)
                  }
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

  const getCollapseItemsTypeSaudization = (item, index) => {
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
              <Button onClick={() => handleChangeDelete(index, "saudization")}>
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
                    handlChangeColumn1ChartHeadingSaudization(e, index);
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
                    handlChangeColumn2ChartHeadingSaudization(e, index);
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

    if (item.type === "Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "saudization")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnSaudization(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column}
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
              <Button onClick={() => handleChangeDelete(index, "saudization")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div>Bar Chart Type :</div>
                <Select
                  showSearch
                  placeholder="Select Bar Chart Type"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => onChangeSwitchSaudization(e, index)}
                  options={barTypeChartOptions}
                  filterOption={filterOption}
                  value={item.horizontal}
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
                  onChange={(e) =>
                    handlChangeBarChartColumnSaudization(e, index)
                  }
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.selectedColumns}
                />
              </div>

              {/* <div>
                {item.selectedColumns.map((item) =>{
                  return (
                  <div>
                    
                  </div>
                  )
                  })}
              </div> */}
            </>
          ),
        },
      ];
    }

    if (item.type === "Multi Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "saudization")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnSaudization(e, index)
                  }
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

  const getCollapseItemsTypeEmployees = (item, index) => {
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
              <Button onClick={() => handleChangeDelete(index, "employees")}>
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
                    handlChangeColumn1ChartHeadingEmployees(e, index);
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
                    handlChangeColumn2ChartHeadingEmployees(e, index);
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

    if (item.type === "Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "employees")}>
                Delete
              </Button>
            </div>
          ),
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
                    handlChangeValueChartColumnEmployees(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column}
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
              <Button onClick={() => handleChangeDelete(index, "employees")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div>Bar Chart Type :</div>
                <Select
                  showSearch
                  placeholder="Select Bar Chart Type"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => onChangeSwitchEmployees(e, index)}
                  options={barTypeChartOptions}
                  filterOption={filterOption}
                  value={item.horizontal}
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
                  onChange={(e) => handlChangeBarChartColumnEmployees(e, index)}
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

    if (item.type === "Multi Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "employees")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnEmployees(e, index)
                  }
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

  const getCollapseItemsTypeVisa = (item, index) => {
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
              <Button onClick={() => handleChangeDelete(index, "visa")}>
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
                    handlChangeColumn1ChartHeadingVisa(e, index);
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
                    handlChangeColumn2ChartHeadingVisa(e, index);
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

    if (item.type === "Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "visa")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnVisa(e, index);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.column}
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
              <Button onClick={() => handleChangeDelete(index, "visa")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div>Bar Chart Type :</div>
                <Select
                  showSearch
                  placeholder="Select Bar Chart Type"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => onChangeSwitchVisa(e, index)}
                  options={barTypeChartOptions}
                  filterOption={filterOption}
                  value={item.horizontal}
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
                  onChange={(e) => handlChangeBarChartColumnVisa(e, index)}
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

    if (item.type === "Multi Value Chart") {
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
              <Button onClick={() => handleChangeDelete(index, "visa")}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Columns"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnVisa(e, index)
                  }
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
          {companyChartData.boxes.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ marginTop: "10px" }}>
                  <Collapse
                    items={getCollapseItemsTypeCompany(item, index)}
                    collapsible="icon"
                  />
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
          <span>Saudization</span>{" "}
          {activeKey.includes("2") ? (
            <Dropdown
              menu={{
                items: typesOfChartSaudization,
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
          {saudizationChartData.boxes.map((item, index) => {
            return (
              <div>
                <div style={{ marginTop: "10px" }}>
                  <Collapse
                    items={getCollapseItemsTypeSaudization(item, index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Visa</span>{" "}
          {activeKey.includes("3") ? (
            <Dropdown
              menu={{
                items: typesOfChartVisa,
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
          {visaChartData.boxes.map((item, index) => {
            return (
              <div>
                <div style={{ marginTop: "10px" }}>
                  <Collapse items={getCollapseItemsTypeVisa(item, index)} />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Employees</span>{" "}
          {activeKey.includes("4") ? (
            <Dropdown
              menu={{
                items: typesOfChartEmployees,
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
          {employeesChartData.boxes.map((item, index) => {
            return (
              <div>
                <div style={{ marginTop: "10px" }}>
                  <Collapse
                    items={getCollapseItemsTypeEmployees(item, index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Recommendation</span>{" "}
        </div>
      ),
      children: (
        <div style={{ marginTop: "10px" }}>
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <Select
              showSearch
              placeholder="Select Id For Recommendation Text"
              style={{
                width: "50%",
              }}
              onChange={onChangeRecommendtionText}
              options={columnOptions}
              filterOption={filterOption}
              value={recommendationText}
            />
          </div>
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
            const tempData = JSON.parse(item.governify_compliance_report);
            console.log(tempData , 'tempData')
            if (tempData === null || tempData === "") {
            } else {
              setCompanyChartData(tempData.companyChartData);
              setVisaChartData(tempData.visaChartData);
              setEmployeesChartData(tempData.employeesChartData);
              setSaudizationChartData(tempData.saudizationChartData);
              setRecommendationText(tempData.recommendation_text);
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChartDataFormat = (data) => {
    let position = { x: 0, y: -40 };
    let count = 0;
    const tempData = {id:'' , height:400 , boxes:[]};

    data.boxes.forEach((item) => {
      // Create a new position object for each item to avoid reference issues
      let newPosition = { x: position.x, y: position.y };

      if (count < 3) {
        newPosition.x = newPosition.x + 457 * count;
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

    return tempData;
  };

  const handleSubmit = async () => {
    console.log(getChartDataFormat(companyChartData));
    const governify_compliance_report = JSON.stringify({
      companyChartData: getChartDataFormat(companyChartData),
      saudizationChartData: getChartDataFormat(saudizationChartData),
      visaChartData: getChartDataFormat(visaChartData),
      employeesChartData: getChartDataFormat(employeesChartData),
      recommendation_text: recommendationText,
    });
    const payloadData = {
      profile_id: location.state.profileId.toString(),
      governify_compliance_report: governify_compliance_report,
    };

    try {
      const response = await governifyComplianceReportAdminSetting(payloadData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleViewChart = () => {
    navigate("/admin/complianceReportAdminView", { state: location.state });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "48px", marginBottom: "16px" }}>
        <Hero
          heading={"Compliance Report Setting"}
          subheading="Stay informed and in control of the compliance reports of your requests"
          forHome={false}
        />
      </div>

      <Collapse
        collapsible="icon"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};
