import { Button, Collapse, Dropdown, Input, Select } from "antd";
import { useEffect, useState } from "react";
// import Hero from "../common/Hero";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
// import { fetcher } from "../../utils/helper";

export const ComplianceReportSettings = () => {
  const location = useLocation();
  const { TextArea } = Input;
  const [recommendationText, setRecommendationText] = useState("");
  const [companyChartData, setCompanyChartData] = useState([]);
  const [saudizationChartData, setSaudizationChartData] = useState([]);
  const [visaChartData, setVisaChartData] = useState([]);
  const [employeesChartData, setEmployeesChartData] = useState([]);
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
    if (type === "saudization") {
      let tempSaudizationData = [...saudizationChartData];
      tempSaudizationData.push({
        type: "Text Chart",
        heading: "",
        mainText: "",
        tag: "",
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = [...visaChartData];
      tempVisaData.push({
        type: "Text Chart",
        heading: "",
        mainText: "",
        tag: "",
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = [...employeesChartData];
      tempEmployeeData.push({
        type: "Text Chart",
        heading: "",
        mainText: "",
        tag: "",
      });
      setEmployeesChartData(tempEmployeeData);
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
    if (type === "saudization") {
      let tempSaudizationData = [...saudizationChartData];
      tempSaudizationData.push({
        type: "Value Chart",
        mainColumn: "",
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = [...visaChartData];
      tempVisaData.push({
        type: "Value Chart",
        mainColumn: "",
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = [...employeesChartData];
      tempEmployeeData.push({
        type: "Value Chart",
        mainColumn: "",
      });
      setEmployeesChartData(tempEmployeeData);
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
    if (type === "saudization") {
      let tempSaudizationData = [...saudizationChartData];
      tempSaudizationData.push({
        type: "Percentage Chart",
        mainColumn: "",
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = [...visaChartData];
      tempVisaData.push({
        type: "Percentage Chart",
        mainColumn: "",
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = [...employeesChartData];
      tempEmployeeData.push({
        type: "Percentage Chart",
        mainColumn: "",
      });
      setEmployeesChartData(tempEmployeeData);
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
    if (type === "saudization") {
      let tempSaudizationData = [...saudizationChartData];
      tempSaudizationData.push({
        type: "Bar Chart",
        selectedColumns: [],
      });
      setSaudizationChartData(tempSaudizationData);
    }

    if (type === "visa") {
      let tempVisaData = [...visaChartData];
      tempVisaData.push({
        type: "Bar Chart",
        selectedColumns: [],
      });
      setVisaChartData(tempVisaData);
    }

    if (type === "employees") {
      let tempEmployeeData = [...employeesChartData];
      tempEmployeeData.push({
        type: "Bar Chart",
        selectedColumns: [],
      });
      setEmployeesChartData(tempEmployeeData);
    }
  };

  const typesOfChart = [];

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
        <span onClick={() => handleSelectChartTypeBar("company")}>
          Bar Chart
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
        <span onClick={() => handleSelectChartTypePercentage("saudization")}>
          Percentage Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypeBar("saudization")}>
          Bar Chart
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
        <span onClick={() => handleSelectChartTypePercentage("visa")}>
          Percentage Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypeBar("visa")}>Bar Chart</span>
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
        <span onClick={() => handleSelectChartTypePercentage("employees")}>
          Percentage Chart
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleSelectChartTypeBar("employees")}>
          Bar Chart
        </span>
      ),
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onChangeRecommendtionText = (e) => {
    setRecommendationText(e.target.value);
  };

  const handlChangeTextChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].heading = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTextChartHeadingSaudization = (e, index) => {
    let tempSaudizationChartData = [...saudizationChartData];
    tempSaudizationChartData[index].heading = e.target.value;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeTextChartHeadingEmployees = (e, index) => {
    let tempEmployeesChartData = [...employeesChartData];
    tempEmployeesChartData[index].heading = e.target.value;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangeTextChartHeadingVisa = (e, index) => {
    let tempVisaChartData = [...visaChartData];
    tempVisaChartData[index].heading = e.target.value;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeMainTextChartHeadingCompany = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
    console.log(e, index, "sdssdsdfsd");
  };

  const handlChangeMainTextChartHeadingSaudization = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeMainTextChartHeadingEmployees = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeMainTextChartHeadingVisa = (e, index) => {
    // let tempCompanyChartData = [...companyChartData];
    // tempCompanyChartData[index].heading = e.target.value;
    // setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTagTextChartHeadingCompany = (e, index) => {
    let tempCompanyChartData = [...companyChartData];
    tempCompanyChartData[index].heading = e.target.value;
    setCompanyChartData(tempCompanyChartData);
  };

  const handlChangeTagTextChartHeadingSaudization = (e, index) => {
    let tempSaudizationChartData = [...saudizationChartData];
    tempSaudizationChartData[index].heading = e.target.value;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeTagTextChartHeadingVisa = (e, index) => {
    let tempVisaChartData = [...visaChartData];
    tempVisaChartData[index].heading = e.target.value;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeTagTextChartHeadingEmployees = (e, index) => {
    let tempEmployeesChartData = [...employeesChartData];
    tempEmployeesChartData[index].heading = e.target.value;
    setEmployeesChartData(tempEmployeesChartData);
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

  const handlChangeValueChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = [...saudizationChartData];
    tempSaudizationChartData[index].mainColumn = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangePercentageChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = [...saudizationChartData];
    tempSaudizationChartData[index].mainColumn = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeBarChartColumnSaudization = (e, index) => {
    let tempSaudizationChartData = [...saudizationChartData];
    tempSaudizationChartData[index].selectedColumns = e;
    setSaudizationChartData(tempSaudizationChartData);
  };

  const handlChangeValueChartColumnEmployees = (e, index) => {
    let tempEmployeesChartData = [...employeesChartData];
    tempEmployeesChartData[index].mainColumn = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangePercentageChartColumnEmployees = (e, index) => {
    let tempEmployeesChartData = [...employeesChartData];
    tempEmployeesChartData[index].mainColumn = e;
    setEmployeesChartData(tempEmployeesChartData);
  };

  const handlChangeBarChartColumnEmployees = (e, index) => {
    let tempEmployeeChartData = [...employeesChartData];
    tempEmployeeChartData[index].selectedColumns = e;
    setEmployeesChartData(tempEmployeeChartData);
  };

  const handlChangeValueChartColumnVisa = (e, index) => {
    let tempVisaChartData = [...visaChartData];
    tempVisaChartData[index].mainColumn = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangePercentageChartColumnVisa = (e, index) => {
    let tempVisaChartData = [...visaChartData];
    tempVisaChartData[index].mainColumn = e;
    setVisaChartData(tempVisaChartData);
  };

  const handlChangeBarChartColumnVisa = (e, index) => {
    let tempVisaChartData = [...visaChartData];
    tempVisaChartData[index].selectedColumns = e;
    setVisaChartData(tempVisaChartData);
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
  };

  const getCollapseItemsTypeSaudization = (item, index) => {
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
                    handlChangeTextChartHeadingSaudization(e, index);
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
                    handlChangeMainTextChartHeadingSaudization(e, index);
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
                    handlChangeTagTextChartHeadingSaudization(e, index);
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
                    handlChangeValueChartColumnSaudization(e, index);
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
                    handlChangePercentageChartColumnSaudization(e, index)
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
                  onChange={(e) =>
                    handlChangeBarChartColumnSaudization(e, index)
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
  };

  const getCollapseItemsTypeEmployees = (item, index) => {
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
                    handlChangeTextChartHeadingEmployees(e, index);
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
                    handlChangeMainTextChartHeadingEmployees(e, index);
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
                    handlChangeTagTextChartHeadingEmployees(e, index);
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
                    handlChangeValueChartColumnEmployees(e, index);
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
                    handlChangePercentageChartColumnEmployees(e, index)
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
                  onChange={(e) => handlChangeBarChartColumnEmployees(e, index)}
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

  const getCollapseItemsTypeVisa = (item, index) => {
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
                    handlChangeTextChartHeadingVisa(e, index);
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
                    handlChangeMainTextChartHeadingVisa(e, index);
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
                    handlChangeTagTextChartHeadingVisa(e, index);
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
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => {
                    handlChangeValueChartColumnVisa(e, index);
                  }}
                  options={columnOptions}
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
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) =>
                    handlChangePercentageChartColumnVisa(e, index)
                  }
                  options={columnOptions}
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
                  mode="multiple"
                  placeholder="Select Tag"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => handlChangeBarChartColumnVisa(e, index)}
                  options={columnOptions}
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
          {saudizationChartData.map((item, index) => {
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
          {visaChartData.map((item, index) => {
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
          {employeesChartData.map((item, index) => {
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
          heading={"Compliance Report Setting"}
          subheading="Stay informed and in control of the compliance reports of your requests"
          forHome={false}
        />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div style={{ textAlign: "left" }}>
          <span>Recommendation Text</span>
        </div>
        <TextArea
          rows={4}
          value={recommendationText}
          onChange={onChangeRecommendtionText}
        />
      </div>
      <Collapse
        collapsible="icon"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
    </div>
  );
};
