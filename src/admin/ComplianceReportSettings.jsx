// import {
//   Button,
//   Collapse,
//   ColorPicker,
//   Dropdown,
//   Input,
//   Modal,
//   Select,
// } from "antd";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Hero } from "../components/Hero";
// import {
//   getAllColumnsOfBoard,
//   getProfileListing,
//   governifyComplianceReportAdminSetting,
//   saveAdminComplianceView,
// } from "../apiservice/ApiService";
// import { toast, ToastContainer } from "react-toastify";
// import { EditOutlined } from "@ant-design/icons";

// export const ComplianceReportSettings = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [changeTitleModal, setChangeTitleModal] = useState({
//     flag: false,
//     type: "",
//     previousValue: "",
//     updatedValue: "",
//   });

//   const [activeKey, setActiveKey] = useState([]);
//   const [columnOptions, setColumnOptions] = useState([]);

//   const data = JSON.parse(sessionStorage.getItem("settings")) || {
//     image: "https://onboardify.tasc360.com/uploads/y22.png",
//     site_bg: "#ffffff",
//     button_bg: "#497ed8",
//     banner_bg: "#497ed8",
//     banner_content:
//       "Hire an attitude, not just experience and qualification. Greg Savage.",
//     header_bg: "#f7f7f7",
//     head_title_color: "#497ed8",
//   };

//   const handleSelectChartTypeText = (type) => {
//     if (type === "company") {
//       let tempCompanyData = { ...companyChartData };
//       tempCompanyData.boxes.push({
//         type: "Text Chart",
//         column1: "",
//         column2: "",
//         color: "",
//         id: tempCompanyData.boxes.length + 1,
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//         position: { x: 0, y: 20 },
//       });
//       setCompanyChartData(tempCompanyData);
//     }
//     if (type === "saudization") {
//       let tempSaudizationData = { ...saudizationChartData };
//       tempSaudizationData.boxes.push({
//         type: "Text Chart",
//         column1: "",
//         column2: "",
//         color: "",
//         id: tempSaudizationData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setSaudizationChartData(tempSaudizationData);
//     }
//     if (type === "visa") {
//       let tempVisaData = { ...visaChartData };
//       tempVisaData.boxes.push({
//         type: "Text Chart",
//         column1: "",
//         column2: "",
//         color: "",
//         id: tempVisaData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setVisaChartData(tempVisaData);
//     }
//     if (type === "employees") {
//       let tempEmployeeData = { ...employeesChartData };
//       tempEmployeeData.boxes.push({
//         type: "Text Chart",
//         column1: "",
//         column2: "",
//         color: "",
//         id: tempEmployeeData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setEmployeesChartData(tempEmployeeData);
//     }
//   };

//   const handleSelectChartTypeValue = (type) => {
//     if (type === "company") {
//       let tempCompanyData = { ...companyChartData };
//       tempCompanyData.boxes.push({
//         type: "Value Chart",
//         column: "",
//         id: tempCompanyData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setCompanyChartData(tempCompanyData);
//     }
//     if (type === "saudization") {
//       let tempSaudizationData = { ...saudizationChartData };
//       tempSaudizationData.boxes.push({
//         type: "Value Chart",
//         column: "",
//         id: tempSaudizationData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setSaudizationChartData(tempSaudizationData);
//     }
//     if (type === "visa") {
//       let tempVisaData = { ...visaChartData };
//       tempVisaData.boxes.push({
//         type: "Value Chart",
//         column: "",
//         id: tempVisaData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setVisaChartData(tempVisaData);
//     }
//     if (type === "employees") {
//       let tempEmployeeData = { ...employeesChartData };
//       tempEmployeeData.boxes.push({
//         type: "Value Chart",
//         column: "",
//         id: tempEmployeeData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 360, height: 100 },
//         showDragHandle: false,
//       });
//       setEmployeesChartData(tempEmployeeData);
//     }
//   };

//   const handleSelectChartTypeBar = (type) => {
//     if (type === "company") {
//       let tempCompanyData = { ...companyChartData };
//       tempCompanyData.boxes.push({
//         type: "Bar Chart",
//         horizontal: false,
//         selectedColumns: [],
//         selectedColor: [],
//         heading: "",
//         description: "",
//         id: tempCompanyData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 721, height: 422 },
//         showDragHandle: false,
//       });
//       setCompanyChartData(tempCompanyData);
//     }

//     if (type === "saudization") {
//       let tempSaudizationData = { ...saudizationChartData };
//       tempSaudizationData.boxes.push({
//         type: "Bar Chart",
//         horizontal: false,
//         selectedColumns: [],
//         selectedColor: [],
//         heading: "",
//         description: "",
//         id: tempSaudizationData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 721, height: 422 },
//         showDragHandle: false,
//       });
//       setSaudizationChartData(tempSaudizationData);
//     }

//     if (type === "visa") {
//       let tempVisaData = { ...visaChartData };
//       tempVisaData.boxes.push({
//         type: "Bar Chart",
//         horizontal: false,
//         selectedColumns: [],
//         selectedColor: [],
//         heading: "",
//         description: "",
//         id: tempVisaData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 721, height: 422 },
//         showDragHandle: false,
//       });
//       setVisaChartData(tempVisaData);
//     }

//     if (type === "employees") {
//       let tempEmployeeData = { ...employeesChartData };
//       tempEmployeeData.boxes.push({
//         type: "Bar Chart",
//         horizontal: false,
//         selectedColumns: [],
//         selectedColor: [],
//         heading: "",
//         description: "",
//         id: tempEmployeeData.boxes.length + 1,
//         position: { x: 0, y: -40 },
//         size: { width: 721, height: 422 },
//         showDragHandle: false,
//       });
//       setEmployeesChartData(tempEmployeeData);
//     }
//   };

//   const handleSelectChartTypePercentage = (type) => {
//     if (type === "company") {
//       let tempCompanyData = { ...companyChartData };
//       tempCompanyData.boxes.push({
//         type: "Multi Value Chart",
//         selectedColumns: [],
//         heading: "",
//         selectedColor: [],
//         id: tempCompanyData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 200, height: 800 },
//         showDragHandle: false,
//       });
//       setCompanyChartData(tempCompanyData);
//     }

//     if (type === "saudization") {
//       let tempSaudizationData = { ...saudizationChartData };
//       tempSaudizationData.boxes.push({
//         type: "Multi Value Chart",
//         selectedColumns: [],
//         heading: "",
//         selectedColor: [],
//         id: tempSaudizationData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 353, height: 422 },
//         showDragHandle: false,
//       });
//       setSaudizationChartData(tempSaudizationData);
//     }

//     if (type === "visa") {
//       let tempVisaData = { ...visaChartData };
//       tempVisaData.boxes.push({
//         type: "Multi Value Chart",
//         selectedColumns: [],
//         heading: "",
//         selectedColor: [],
//         id: tempVisaData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 200, height: 200 },
//         showDragHandle: false,
//       });
//       setVisaChartData(tempVisaData);
//     }

//     if (type === "employees") {
//       let tempEmployeeData = { ...employeesChartData };
//       tempEmployeeData.boxes.push({
//         type: "Multi Value Chart",
//         selectedColumns: [],
//         heading: "",
//         selectedColor: [],
//         id: tempEmployeeData.boxes.length + 1,
//         position: { x: 0, y: 0 },
//         size: { width: 200, height: 200 },
//         showDragHandle: false,
//       });
//       setEmployeesChartData(tempEmployeeData);
//     }
//   };

//   const barTypeChartOptions = [
//     { label: "Horizontal chart", value: true },
//     { label: "Vertical Chart", value: false },
//   ];

//   const typesOfChartCompany = [
//     {
//       key: "1",
//       label: (
//         <span onClick={() => handleSelectChartTypeText("company")}>
//           Text Chart
//         </span>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span onClick={() => handleSelectChartTypeValue("company")}>
//           Value Chart
//         </span>
//       ),
//     },

//     {
//       key: "3",
//       label: (
//         <span onClick={() => handleSelectChartTypeBar("company")}>
//           Bar Chart
//         </span>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <span onClick={() => handleSelectChartTypePercentage("company")}>
//           Multi Value Chart
//         </span>
//       ),
//     },
//   ];

//   const typesOfChartSaudization = [
//     {
//       key: "1",
//       label: (
//         <span onClick={() => handleSelectChartTypeText("saudization")}>
//           Text Chart
//         </span>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span onClick={() => handleSelectChartTypeValue("saudization")}>
//           Value Chart
//         </span>
//       ),
//     },

//     {
//       key: "3",
//       label: (
//         <span onClick={() => handleSelectChartTypeBar("saudization")}>
//           Bar Chart
//         </span>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <span onClick={() => handleSelectChartTypePercentage("saudization")}>
//           Multi Value Chart
//         </span>
//       ),
//     },
//   ];

//   const typesOfChartVisa = [
//     {
//       key: "1",
//       label: (
//         <span onClick={() => handleSelectChartTypeText("visa")}>
//           Text Chart
//         </span>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span onClick={() => handleSelectChartTypeValue("visa")}>
//           Value Chart
//         </span>
//       ),
//     },

//     {
//       key: "3",
//       label: (
//         <span onClick={() => handleSelectChartTypeBar("visa")}>Bar Chart</span>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <span onClick={() => handleSelectChartTypePercentage("visa")}>
//           Multi Value Chart
//         </span>
//       ),
//     },
//   ];

//   const typesOfChartEmployees = [
//     {
//       key: "1",
//       label: (
//         <span onClick={() => handleSelectChartTypeText("employees")}>
//           Text Chart
//         </span>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span onClick={() => handleSelectChartTypeValue("employees")}>
//           Value Chart
//         </span>
//       ),
//     },

//     {
//       key: "3",
//       label: (
//         <span onClick={() => handleSelectChartTypeBar("employees")}>
//           Bar Chart
//         </span>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <span onClick={() => handleSelectChartTypePercentage("employees")}>
//           Multi Value Chart
//         </span>
//       ),
//     },
//   ];

//   const onChange = (key) => {
//     setActiveKey(key);
//   };

//   const onChangeRecommendtionText = (e) => {
//     let tempRecommendationChartData = { ...recommendationText };
//     tempRecommendationChartData.column = e;
//     setRecommendationText(tempRecommendationChartData);
//   };

//   const handlChangeColumn1ChartHeadingCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].column1 = e;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeColumn1ChartHeadingSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].column1 = e;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeColumn1ChartHeadingEmployees = (e, index) => {
//     let tempEmployeeChartData = { ...employeesChartData };
//     tempEmployeeChartData.boxes[index].column1 = e;
//     setEmployeesChartData(tempEmployeeChartData);
//   };

//   const handlChangeColumn1ChartHeadingVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].column1 = e;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeColumn2ChartHeadingCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].column2 = e;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeColumn2ChartHeadingSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].column2 = e;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeColumn2ChartHeadingEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].column2 = e;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeColumn2ChartHeadingVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].column2 = e;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeValueChartColumnCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].column = e;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangePercentageChartColumnCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     let tempColor = tempCompanyChartData.boxes[index].selectedColor;
//     tempCompanyChartData.boxes[index].selectedColumns = e;
//     tempCompanyChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempCompanyChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempCompanyChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });

//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangePercentageChartHeadingCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].heading = e.target.value;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangePercentageChartHeadingSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].heading = e.target.value;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangePercentageChartHeadingVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].heading = e.target.value;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangePercentageChartHeadingEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].heading = e.target.value;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeBarChartColumnCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     let tempColor = tempCompanyChartData.boxes[index].selectedColor;
//     tempCompanyChartData.boxes[index].selectedColumns = e;
//     tempCompanyChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempCompanyChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempCompanyChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeValueChartColumnSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].column = e;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangePercentageChartColumnSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     let tempColor = tempSaudizationChartData.boxes[index].selectedColor;
//     tempSaudizationChartData.boxes[index].selectedColumns = e;
//     tempSaudizationChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempSaudizationChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempSaudizationChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeBarChartColumnSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     let tempColor = tempSaudizationChartData.boxes[index].selectedColor;

//     tempSaudizationChartData.boxes[index].selectedColumns = e;
//     tempSaudizationChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempSaudizationChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempSaudizationChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });

//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeBarChartColorCompany = (value, index, childIndex) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeTextChartColorCompany = (value, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].color = value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeTextChartColorSaudization = (value, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].color = value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeTextChartColorVisa = (value, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].color = value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeTextChartColorEmployees = (value, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].color = value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeBarChartColorSaudization = (value, index, childIndex) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeBarChartColorEmployees = (value, index, childIndex) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeBarChartColorVisa = (value, index, childIndex) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeMultiChartColorCompany = (value, index, childIndex) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeMultiChartColorSaudization = (value, index, childIndex) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeMultiChartColorEmployees = (value, index, childIndex) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeMultiChartColorVisa = (value, index, childIndex) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].selectedColor[childIndex].value =
//       value.toHexString();
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeValueChartColumnEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].column = e;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangePercentageChartColumnEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     let tempColor = tempEmployeesChartData.boxes[index].selectedColor;
//     tempEmployeesChartData.boxes[index].selectedColumns = e;
//     tempEmployeesChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempEmployeesChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempEmployeesChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeBarChartColumnEmployees = (e, index) => {
//     let tempEmployeeChartData = { ...employeesChartData };
//     let tempColor = tempEmployeeChartData.boxes[index].selectedColor;
//     tempEmployeeChartData.boxes[index].selectedColumns = e;
//     tempEmployeeChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempEmployeeChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempEmployeeChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });

//     setEmployeesChartData(tempEmployeeChartData);
//   };

//   const handlChangeValueChartColumnVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].column = e;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangePercentageChartColumnVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     let tempColor = tempVisaChartData.boxes[index].selectedColor;
//     tempVisaChartData.boxes[index].selectedColumns = e;
//     tempVisaChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempVisaChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempVisaChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });

//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeBarChartColumnVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     let tempColor = tempVisaChartData.boxes[index].selectedColor;
//     tempVisaChartData.boxes[index].selectedColumns = e;
//     tempVisaChartData.boxes[index].selectedColor = [];

//     e.forEach((subItem) => {
//       // Check if the item already exists in tempColor
//       const existingColor = tempColor.find((color) => color.key === subItem);

//       // If the object exists, push the existing object
//       if (existingColor) {
//         tempVisaChartData.boxes[index].selectedColor.push(existingColor);
//       } else {
//         // If it doesn't exist, create a new object with an empty value
//         tempVisaChartData.boxes[index].selectedColor.push({
//           key: subItem,
//           value: "",
//         });
//       }
//     });

//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeBarChartHeadingCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].heading = e.target.value;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeBarChartDescriptionCompany = (e, index) => {
//     let tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].description = e.target.value;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const handlChangeBarChartHeadingSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].heading = e.target.value;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeBarChartDescriptionSaudization = (e, index) => {
//     let tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].description = e.target.value;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const handlChangeBarChartHeadingVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].heading = e.target.value;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeBarChartDescriptionVisa = (e, index) => {
//     let tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].description = e.target.value;
//     setVisaChartData(tempVisaChartData);
//   };

//   const handlChangeBarChartHeadingEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].heading = e.target.value;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const handlChangeBarChartDescriptionEmployees = (e, index) => {
//     let tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].description = e.target.value;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const onChangeSwitchCompany = (e, index) => {
//     const tempCompanyChartData = { ...companyChartData };
//     tempCompanyChartData.boxes[index].horizontal = e;
//     setCompanyChartData(tempCompanyChartData);
//   };

//   const onChangeSwitchVisa = (e, index) => {
//     const tempVisaChartData = { ...visaChartData };
//     tempVisaChartData.boxes[index].horizontal = e;
//     setVisaChartData(tempVisaChartData);
//   };

//   const onChangeSwitchEmployees = (e, index) => {
//     const tempEmployeesChartData = { ...employeesChartData };
//     tempEmployeesChartData.boxes[index].horizontal = e;
//     setEmployeesChartData(tempEmployeesChartData);
//   };

//   const onChangeSwitchSaudization = (e, index) => {
//     const tempSaudizationChartData = { ...saudizationChartData };
//     tempSaudizationChartData.boxes[index].horizontal = e;
//     setSaudizationChartData(tempSaudizationChartData);
//   };

//   const filterOption = (input, option) => {
//     return (
//       option.label.toLowerCase().includes(input.toLowerCase()) ||
//       option.value.toString().toLowerCase().includes(input.toLowerCase())
//     );
//   };

//   const handleChangeDelete = (index, type) => {
//     if (type === "company") {
//       const tempCompanyChartData = { ...companyChartData };
//       tempCompanyChartData.boxes.splice(index, 1);
//       setCompanyChartData(tempCompanyChartData);
//     }
//     if (type === "employees") {
//       const tempEmployeesChartData = { ...employeesChartData };
//       tempEmployeesChartData.boxes.splice(index, 1);
//       setEmployeesChartData(tempEmployeesChartData);
//     }
//     if (type === "visa") {
//       const tempVisaChartData = { ...visaChartData };
//       tempVisaChartData.boxes.splice(index, 1);
//       setVisaChartData(tempVisaChartData);
//     }
//     if (type === "saudization") {
//       const tempSaudizationChartData = { ...saudizationChartData };
//       tempSaudizationChartData.boxes.splice(index, 1);
//       setSaudizationChartData(tempSaudizationChartData);
//     }
//   };

//   const getAddOnBeforeForColor = (key) => {
//     let text = "";
//     columnOptions.forEach((item) => {
//       if (item.value === key) {
//         text = `Color For ${item.label}`;
//       }
//     });
//     return text;
//   };

//   const getCollapseItemsTypeCompany = (item, index) => {
//     let newIndex = index + 1;
//     if (item.type === "Text Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "company")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column1"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn1ChartHeadingCompany(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column1}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column2"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn2ChartHeadingCompany(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column2}
//                 />
//               </div>
//               <div
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "left",
//                   width: "50%",
//                   display: "flex",
//                   gap: "20px",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>Color For Column 2</span>
//                 <ColorPicker
//                   value={item.color}
//                   size="large"
//                   showText
//                   onChange={(value) =>
//                     handlChangeTextChartColorCompany(value, index)
//                   }
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "company")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Column"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeValueChartColumnCompany(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column}
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Bar Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "company")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Heading"}
//                   value={item.heading}
//                   onChange={(e) => handlChangeBarChartHeadingCompany(e, index)}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Description"}
//                   value={item.description}
//                   onChange={(e) =>
//                     handlChangeBarChartDescriptionCompany(e, index)
//                   }
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div>Bar Chart Type :</div>
//                 <Select
//                   showSearch
//                   placeholder="Select Bar Chart Type"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => onChangeSwitchCompany(e, index)}
//                   options={barTypeChartOptions}
//                   filterOption={filterOption}
//                   value={item.horizontal}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Tag"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => handlChangeBarChartColumnCompany(e, index)}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, index, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeBarChartColorCompany(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Multi Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "company")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div style={{ marginBottom: "10px" }}>
//                   <Input
//                     addonBefore={"Heading"}
//                     value={item.heading}
//                     onChange={(e) =>
//                       handlChangePercentageChartHeadingCompany(e, index)
//                     }
//                   />
//                 </div>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) =>
//                     handlChangePercentageChartColumnCompany(e, index)
//                   }
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeMultiChartColorCompany(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }
//   };

//   const getCollapseItemsTypeSaudization = (item, index) => {
//     let newIndex = index + 1;
//     if (item.type === "Text Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "saudization")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column1"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn1ChartHeadingSaudization(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column1}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column2"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn2ChartHeadingSaudization(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column2}
//                 />
//               </div>
//               <div
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "left",
//                   width: "50%",
//                   display: "flex",
//                   gap: "20px",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>Color For Column 2</span>
//                 <ColorPicker
//                   value={item.color}
//                   size="large"
//                   showText
//                   onChange={(value) =>
//                     handlChangeTextChartColorSaudization(value, index)
//                   }
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "saudization")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeValueChartColumnSaudization(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column}
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Bar Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "saudization")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Heading"}
//                   value={item.heading}
//                   onChange={(e) =>
//                     handlChangeBarChartHeadingSaudization(e, index)
//                   }
//                 />
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Description"}
//                   value={item.description}
//                   onChange={(e) =>
//                     handlChangeBarChartDescriptionSaudization(e, index)
//                   }
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div>Bar Chart Type :</div>
//                 <Select
//                   showSearch
//                   placeholder="Select Bar Chart Type"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => onChangeSwitchSaudization(e, index)}
//                   options={barTypeChartOptions}
//                   filterOption={filterOption}
//                   value={item.horizontal}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Column"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) =>
//                     handlChangeBarChartColumnSaudization(e, index)
//                   }
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>

//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeBarChartColorSaudization(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Multi Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "saudization")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div style={{ marginBottom: "10px" }}>
//                   <Input
//                     addonBefore={"Heading"}
//                     value={item.heading}
//                     onChange={(e) =>
//                       handlChangePercentageChartHeadingSaudization(e, index)
//                     }
//                   />
//                 </div>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) =>
//                     handlChangePercentageChartColumnSaudization(e, index)
//                   }
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeMultiChartColorSaudization(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }
//   };

//   const getCollapseItemsTypeEmployees = (item, index) => {
//     let newIndex = index + 1;
//     if (item.type === "Text Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "employees")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column1"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn1ChartHeadingEmployees(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column1}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column2"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn2ChartHeadingEmployees(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column2}
//                 />
//               </div>
//               <div
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "left",
//                   width: "50%",
//                   display: "flex",
//                   gap: "20px",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>Color For Column 2</span>
//                 <ColorPicker
//                   value={item.color}
//                   size="large"
//                   showText
//                   onChange={(value) =>
//                     handlChangeTextChartColorEmployees(value, index)
//                   }
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "employees")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Column"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeValueChartColumnEmployees(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column}
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Bar Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "employees")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Heading"}
//                   value={item.heading}
//                   onChange={(e) =>
//                     handlChangeBarChartHeadingEmployees(e, index)
//                   }
//                 />
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Description"}
//                   value={item.description}
//                   onChange={(e) =>
//                     handlChangeBarChartDescriptionEmployees(e, index)
//                   }
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div>Bar Chart Type :</div>
//                 <Select
//                   showSearch
//                   placeholder="Select Bar Chart Type"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => onChangeSwitchEmployees(e, index)}
//                   options={barTypeChartOptions}
//                   filterOption={filterOption}
//                   value={item.horizontal}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Column"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => handlChangeBarChartColumnEmployees(e, index)}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeBarChartColorEmployees(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Multi Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "employees")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div style={{ marginBottom: "10px" }}>
//                   <Input
//                     addonBefore={"Heading"}
//                     value={item.heading}
//                     onChange={(e) =>
//                       handlChangePercentageChartHeadingEmployees(e, index)
//                     }
//                   />
//                 </div>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) =>
//                     handlChangePercentageChartColumnEmployees(e, index)
//                   }
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeMultiChartColorEmployees(
//                             value,
//                             index,
//                             childIndex
//                           )
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }
//   };

//   const getCollapseItemsTypeVisa = (item, index) => {
//     let newIndex = index + 1;
//     if (item.type === "Text Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "visa")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column1"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn1ChartHeadingVisa(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column1}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Id For Column2"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeColumn2ChartHeadingVisa(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column2}
//                 />
//               </div>
//               <div
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "left",
//                   width: "50%",
//                   display: "flex",
//                   gap: "20px",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>Color For Column 2</span>
//                 <ColorPicker
//                   value={item.color}
//                   size="large"
//                   showText
//                   onChange={(value) =>
//                     handlChangeTextChartColorVisa(value, index)
//                   }
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "visa")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   placeholder="Select Tag"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => {
//                     handlChangeValueChartColumnVisa(e, index);
//                   }}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.column}
//                 />
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Bar Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "visa")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Heading"}
//                   value={item.heading}
//                   onChange={(e) => handlChangeBarChartHeadingVisa(e, index)}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <Input
//                   addonBefore={"Description"}
//                   value={item.description}
//                   onChange={(e) => handlChangeBarChartDescriptionVisa(e, index)}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div>Bar Chart Type :</div>
//                 <Select
//                   showSearch
//                   placeholder="Select Bar Chart Type"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => onChangeSwitchVisa(e, index)}
//                   options={barTypeChartOptions}
//                   filterOption={filterOption}
//                   value={item.horizontal}
//                 />
//               </div>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) => handlChangeBarChartColumnVisa(e, index)}
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeBarChartColorVisa(value, index, childIndex)
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }

//     if (item.type === "Multi Value Chart") {
//       return [
//         {
//           key: index,
//           label: (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span>{item.type + " " + newIndex}</span>{" "}
//               <Button onClick={() => handleChangeDelete(index, "visa")}>
//                 Delete
//               </Button>
//             </div>
//           ),
//           children: (
//             <>
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <div style={{ marginBottom: "10px" }}>
//                   <Input
//                     addonBefore={"Heading"}
//                     value={item.heading}
//                     onChange={(e) =>
//                       handlChangePercentageChartHeadingVisa(e, index)
//                     }
//                   />
//                 </div>
//                 <Select
//                   showSearch
//                   mode="multiple"
//                   placeholder="Select Columns"
//                   style={{
//                     width: "50%",
//                   }}
//                   onChange={(e) =>
//                     handlChangePercentageChartColumnVisa(e, index)
//                   }
//                   options={columnOptions}
//                   filterOption={filterOption}
//                   value={item.selectedColumns}
//                 />
//               </div>
//               <div>
//                 {item.selectedColor.map((subItem, childIndex) => {
//                   return (
//                     <div
//                       style={{
//                         marginTop: "20px",
//                         textAlign: "left",
//                         width: "50%",
//                         display: "flex",
//                         gap: "20px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>
//                         {getAddOnBeforeForColor(
//                           item.selectedColumns[childIndex]
//                         )}
//                       </span>
//                       <ColorPicker
//                         value={subItem.value}
//                         size="large"
//                         showText
//                         onChange={(value) =>
//                           handlChangeMultiChartColorVisa(value, childIndex)
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ),
//         },
//       ];
//     }
//   };

//   const handleChangeCompanyTitle = (e) => {
//     setChangeTitleModal({
//       flag: true,
//       type: "company",
//       previousValue: companyChartData.title,
//       updatedValue: "",
//     });
//   };

//   const handleChangeSaudizationTitle = (e) => {
//     setChangeTitleModal({
//       flag: true,
//       type: "saudization",
//       previousValue: saudizationChartData.title,
//       updatedValue: "",
//     });
//   };

//   const handleChangeVisaTitle = (e) => {
//     setChangeTitleModal({
//       flag: true,
//       type: "visa",
//       previousValue: visaChartData.title,
//       updatedValue: "",
//     });
//   };

//   const handleChangeEmployeesTitle = (e) => {
//     setChangeTitleModal({
//       flag: true,
//       type: "employees",
//       previousValue: employeesChartData.title,
//       updatedValue: "",
//     });
//   };

//   const handleChangeRecommendationTitle = (e) => {
//     setChangeTitleModal({
//       flag: true,
//       type: "recommendation",
//       previousValue: recommendationText.title,
//       updatedValue: "",
//     });
//   };

//   const items = [
//     {
//       key: "1",
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <span>{companyChartData.title}</span>
//             <Button
//               style={{ marginLeft: "10px" }}
//               type="text"
//               icon={<EditOutlined />}
//               iconPosition="start"
//               onClick={handleChangeCompanyTitle}
//             ></Button>
//           </div>{" "}
//           {activeKey.includes("1") ? (
//             <Dropdown
//               menu={{
//                 items: typesOfChartCompany,
//               }}
//               placement="bottom"
//               arrow
//             >
//               <Button>Add New Chart</Button>
//             </Dropdown>
//           ) : (
//             <></>
//           )}
//         </div>
//       ),
//       children: (
//         <div style={{ marginTop: "10px" }}>
//           {companyChartData.boxes.map((item, index) => {
//             return (
//               <div key={index}>
//                 <div style={{ marginTop: "10px" }}>
//                   <Collapse
//                     items={getCollapseItemsTypeCompany(item, index)}
//                     collapsible="icon"
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <span>{saudizationChartData.title}</span>
//             <Button
//               style={{ marginLeft: "10px" }}
//               type="text"
//               icon={<EditOutlined />}
//               iconPosition="start"
//               onClick={handleChangeSaudizationTitle}
//             ></Button>
//           </div>{" "}
//           {activeKey.includes("2") ? (
//             <Dropdown
//               menu={{
//                 items: typesOfChartSaudization,
//               }}
//               placement="bottom"
//               arrow
//             >
//               <Button>Add New Chart</Button>
//             </Dropdown>
//           ) : (
//             <></>
//           )}
//         </div>
//       ),
//       children: (
//         <div style={{ marginTop: "10px" }}>
//           {saudizationChartData.boxes.map((item, index) => {
//             return (
//               <div>
//                 <div style={{ marginTop: "10px" }}>
//                   <Collapse
//                     items={getCollapseItemsTypeSaudization(item, index)}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <span>{visaChartData.title}</span>
//             <Button
//               style={{ marginLeft: "10px" }}
//               type="text"
//               icon={<EditOutlined />}
//               iconPosition="start"
//               onClick={handleChangeVisaTitle}
//             ></Button>
//           </div>{" "}
//           {activeKey.includes("3") ? (
//             <Dropdown
//               menu={{
//                 items: typesOfChartVisa,
//               }}
//               placement="bottom"
//               arrow
//             >
//               <Button>Add New Chart</Button>
//             </Dropdown>
//           ) : (
//             <></>
//           )}
//         </div>
//       ),
//       children: (
//         <div style={{ marginTop: "10px" }}>
//           {visaChartData.boxes.map((item, index) => {
//             return (
//               <div>
//                 <div style={{ marginTop: "10px" }}>
//                   <Collapse items={getCollapseItemsTypeVisa(item, index)} />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <span>{employeesChartData.title}</span>
//             <Button
//               style={{ marginLeft: "10px" }}
//               type="text"
//               icon={<EditOutlined />}
//               iconPosition="start"
//               onClick={handleChangeEmployeesTitle}
//             ></Button>
//           </div>{" "}
//           {activeKey.includes("4") ? (
//             <Dropdown
//               menu={{
//                 items: typesOfChartEmployees,
//               }}
//               placement="bottom"
//               arrow
//             >
//               <Button>Add New Chart</Button>
//             </Dropdown>
//           ) : (
//             <></>
//           )}
//         </div>
//       ),
//       children: (
//         <div style={{ marginTop: "10px" }}>
//           {employeesChartData.boxes.map((item, index) => {
//             return (
//               <div>
//                 <div style={{ marginTop: "10px" }}>
//                   <Collapse
//                     items={getCollapseItemsTypeEmployees(item, index)}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       key: "5",
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <span>{recommendationText.title}</span>
//             <Button
//               style={{ marginLeft: "10px" }}
//               type="text"
//               icon={<EditOutlined />}
//               iconPosition="start"
//               onClick={handleChangeRecommendationTitle}
//             ></Button>
//           </div>{" "}
//         </div>
//       ),
//       children: (
//         <div style={{ marginTop: "10px" }}>
//           <div style={{ marginTop: "20px", textAlign: "left" }}>
//             <Select
//               showSearch
//               placeholder="Select Id For Recommendation Text"
//               style={{
//                 width: "50%",
//               }}
//               onChange={onChangeRecommendtionText}
//               options={columnOptions}
//               filterOption={filterOption}
//               value={recommendationText.column}
//             />
//           </div>
//         </div>
//       ),
//     },
//   ];

//   const fetchData = async () => {
//     try {
//       const response = await getAllColumnsOfBoard(location.state.boardId);
//       const response1 = await getProfileListing();

//       if (response.success) {
//         const tempData = [];
//         response.data.response.forEach((item) => {
//           tempData.push({ label: item.title, value: item.id });
//         });
//         setColumnOptions(tempData);
//       }
//       if (response1.success) {
//         response1.data.response.forEach((item) => {
//           if (item.id.toString() === location.state.profileId.toString()) {
//             const tempData = JSON.parse(item.governify_compliance_report);
//             if (tempData === null || tempData === "") {
//             } else {
//               setCompanyChartData(tempData.companyChartData);
//               setVisaChartData(tempData.visaChartData);
//               setEmployeesChartData(tempData.employeesChartData);
//               setSaudizationChartData(tempData.saudizationChartData);
//               setRecommendationText(tempData.recommendation_text);
//             }
//           }
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getChartDataFormat = (data) => {
//     let position = { x: 0, y: 20 };
//     let count = 0;
//     const tempData = { id: data.id, height: 400, boxes: [] };

//     data.boxes.forEach((item, index) => {
//       // Create a new position object for each item to avoid reference issues
//       let newPosition = { x: position.x, y: position.y };

//       if (count < 3) {
//         newPosition.x = newPosition.x + 435 * count;
//       } else {
//         newPosition.x = 0;
//         newPosition.y = newPosition.y + 125;
//         position.y = position.y + 125;
//         count = 0; // Reset count for the next row
//       }

//       count = count + 1;

//       let obj = { ...item, id: index, position: newPosition };
//       tempData.boxes.push(obj);
//     });
//     tempData.height = position.y + 250;
//     tempData.id = data.id;
//     tempData.title = data.title;

//     return tempData;
//   };

//   const getChartDataFormatForSaudization = (data) => {
//     let position = { x: 0, y: 20 };

//     const tempData = { id: data.id, height: 700, boxes: [] };

//     data.boxes.forEach((item, index) => {
//       let newPosition = { x: position.x, y: position.y };
//      if(item.type === "Value Chart"){
//       newPosition.x = 0;
//       newPosition.y = newPosition.y + 100;
//       position.y = position.y + 100;

//      }
//      if(item.type === 'Multi Value Chart'){
//       newPosition.x = 0;
//       newPosition.y = newPosition.y + 422;
//       position.y = position.y + 422;

//      }

//      if(item.type === "Bar Chart"){
//       newPosition.x = 0;
//       newPosition.y = newPosition.y + 422;
//       position.y = position.y + 422;
//      }

//      position.y = position.y  + 20;

//       let obj = { ...item, id: index, position: newPosition };
//       tempData.boxes.push(obj);
//     });
//     tempData.height = position.y + 250;
//     tempData.id = data.id;
//     tempData.title = data.title;

//     return tempData;
//   };

//   const handleSubmit = async () => {
//     const governify_compliance_report = JSON.stringify({
//       companyChartData: getChartDataFormat(companyChartData),
//       saudizationChartData:
//         getChartDataFormatForSaudization(saudizationChartData),
//       visaChartData: getChartDataFormat(visaChartData),
//       employeesChartData: getChartDataFormat(employeesChartData),
//       recommendation_text: recommendationText,
//     });
//     const payloadData = {
//       profile_id: location.state.profileId.toString(),
//       governify_compliance_report: governify_compliance_report,
//     };

//     const payloadDataNew = {
//       governify_compliance_report_view: [],
//       profile_id: location.state.profileId.toString(),
//     };

//     try {
//       const response = await governifyComplianceReportAdminSetting(payloadData);
//       const response1 = await saveAdminComplianceView(payloadDataNew);
//       if (response.success) {
//         sessionStorage.removeItem("draggableResizableStateCompliance");
//         toast.success(response.message);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (err) {
//       console.log(err, "err");
//     }
//   };

//   const handleViewChart = () => {
//     navigate("/admin/complianceReportAdminView", { state: location.state });
//   };

//   const handleSaveTitle = () => {
//     if (changeTitleModal.type === "company") {
//       let tempCompanyChartData = { ...companyChartData };
//       tempCompanyChartData.title = changeTitleModal.updatedValue;
//       setCompanyChartData(tempCompanyChartData);
//     }
//     if (changeTitleModal.type === "employees") {
//       let tempEmployeesChartData = { ...employeesChartData };
//       tempEmployeesChartData.title = changeTitleModal.updatedValue;
//       setEmployeesChartData(tempEmployeesChartData);
//     }
//     if (changeTitleModal.type === "visa") {
//       let tempVisaChartData = { ...visaChartData };
//       tempVisaChartData.title = changeTitleModal.updatedValue;
//       setVisaChartData(tempVisaChartData);
//     }
//     if (changeTitleModal.type === "saudization") {
//       let tempSaudizationChartData = { ...saudizationChartData };
//       tempSaudizationChartData.title = changeTitleModal.updatedValue;
//       setSaudizationChartData(tempSaudizationChartData);
//     }

//     if (changeTitleModal.type === "recommendation") {
//       let tempRecommendationChartData = { ...recommendationText };
//       tempRecommendationChartData.title = changeTitleModal.updatedValue;
//       setRecommendationText(tempRecommendationChartData);
//     }

//     setChangeTitleModal({
//       flag: false,
//       type: "",
//       previousValue: "",
//       updatedValue: "",
//     });
//   };

//   const handleChangeTitle = (e) => {
//     let tempChangeTitleModal = { ...changeTitleModal };
//     tempChangeTitleModal.updatedValue = e.target.value;
//     setChangeTitleModal(tempChangeTitleModal);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div style={{ marginTop: "48px", marginBottom: "16px" }}>
//         <Hero
//           heading={"Compliance Report Setting"}
//           subheading="Stay informed and in control of the compliance reports of your requests"
//           forHome={false}
//         />
//       </div>

//       <Collapse
//         collapsible="icon"
//         items={items}
//         onChange={onChange}
//         activeKey={activeKey}
//       />
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "20px",
//         }}
//       >
//         <Button
//           style={{ background: data.button_bg, color: "white", border: "none" }}
//           onClick={handleSubmit}
//         >
//           Save
//         </Button>
//         <Button
//           style={{ background: data.button_bg, color: "white", border: "none" }}
//           onClick={handleViewChart}
//         >
//           View
//         </Button>
//       </div>
//       <ToastContainer position="bottom-right" />

//       <Modal
//         open={changeTitleModal.flag}
//         title="Change Title"
//         centered
//         footer={(_, record) => (
//           <>
//             <Button
//               style={{
//                 background: data.button_bg,
//                 color: "#fff",
//                 border: "none",
//               }}
//               onClick={handleSaveTitle}
//             >
//               Save
//             </Button>
//             <Button
//               style={{ border: "none" }}
//               onClick={() => {
//                 setChangeTitleModal({
//                   flag: false,
//                   type: "",
//                   previousValue: "",
//                   updatedValue: "",
//                 });
//               }}
//             >
//               Cancel
//             </Button>
//           </>
//         )}
//         onCancel={() => {
//           setChangeTitleModal({
//             flag: false,
//             type: "",
//             previousValue: "",
//             updatedValue: "",
//           });
//         }}
//       >
//         <Input
//           value={changeTitleModal.updatedValue}
//           onChange={handleChangeTitle}
//         />
//       </Modal>
//     </div>
//   );
// };

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
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import {
  getAllColumnsOfBoard,
  getProfileListing,
  governifyComplianceReportAdminSetting,
  saveAdminComplianceView,
} from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const ComplianceReportSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [changeTitleModal, setChangeTitleModal] = useState({
    flag: false,
    type: "",
    previousValue: "",
    updatedValue: "",
  });

  const [changeSubTitleModal, setChangeSubTitleModal] = useState({
    flag: false,
    type: "",
    previousValue: "",
    updatedValue: "",
    id: "",
    parent: "",
  });

  const [changeRecommendationTitleModal, setChangeRecommendationTitleModal] =
    useState({
      flag: false,
      type: "Recommendation",
      previousValue: "",
      updatedValue: "",
    });

  const [createSectionModal, setCreateSectionModal] = useState({
    flag: false,
    title: "",
  });

  const [recommendationText, setRecommendationText] = useState({
    type: "Recommendation",
    title: "Recommendation",
    column: "",
  });

  const [sectionData, setSectionData] = useState([
    {
      id: 0,
      title: "About Company",
      height: 500,
      boxes: [],
    },
    {
      id: 1,
      title: "Saudization",
      height: 1800,
      boxes: [],
    },
    {
      id: 2,
      title: "Visa",
      height: 500,
      boxes: [],
    },
    {
      id: 4,
      title: "Employees",
      height: 500,
      boxes: [],
    },
  ]);

  const barTypeChartOptions = [
    { label: "Horizontal chart", value: true },
    { label: "Vertical Chart", value: false },
  ];

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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    const newData = [...sectionData];
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed); // Insert dragged item to new position

    setSectionData(newData); // Update state with the new order
  };

  const handleSelectChartTypeText = (title) => {
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === title) {
        item.boxes.push({
          type: "Text Chart",
          title: "Text Chart",
          column1: "",
          column2: "",
          color: "",
          id: item.boxes.length + 1,
          size: { width: 360, height: 100 },
          showDragHandle: false,
          position: { x: 0, y: 20 },
        });
      }
    });

    setSectionData(tempData);
  };

  const handleSelectChartTypeBar = (title) => {
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === title) {
        item.boxes.push({
          type: "Bar Chart",
          title: "Bar Chart",
          horizontal: false,
          selectedColumns: [],
          selectedColor: [],
          heading: "",
          description: "",
          id: item.boxes.length + 1,
          position: { x: 0, y: 20 },
          size: { width: 721, height: 422 },
          showDragHandle: false,
        });
      }
    });

    setSectionData(tempData);
  };

  const handleSelectChartTypeValue = (title) => {
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === title) {
        item.boxes.push({
          type: "Value Chart",
          title: "Value Chart",
          id: item.boxes.length + 1,
          position: { x: 0, y: 20 },
          column: "",
          size: { width: 360, height: 100 },
          showDragHandle: false,
        });
      }
    });

    setSectionData(tempData);
  };

  const onChangeSwitchBarType = (e, item, subItem) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.horizontal = e;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handleSelectChartTypePercentage = (title) => {
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === title) {
        item.boxes.push({
          type: "Multi Value Chart",
          title: "Multi Value Chart",
          selectedColumns: [],
          heading: "",
          selectedColor: [],
          id: item.boxes.length + 1,
          position: { x: 0, y: 20 },
          size: { width: 200, height: 800 },
          showDragHandle: false,
        });
      }
    });

    setSectionData(tempData);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handlChangeChartColor = (value, item, subItem, key) => {
    let tempColorData = [...subItem.selectedColor];
    tempColorData.forEach((detail) => {
      if (detail.key === key) {
        detail.value = value.toHexString();
      }
    });

    let tempBoxesData = [...item.boxes];
    tempBoxesData.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.selectedColor = tempColorData;
      }
    });

    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxesData;
      }
    });

    setSectionData(tempData);
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

  const handleChangeTitle = (e) => {
    let tempChangeTitleModal = { ...changeTitleModal };
    tempChangeTitleModal.updatedValue = e.target.value;
    setChangeTitleModal(tempChangeTitleModal);
  };

  const handleChangeSubTitle = (e) => {
    let tempChangeTitleModal = { ...changeSubTitleModal };
    tempChangeTitleModal.updatedValue = e.target.value;
    setChangeSubTitleModal(tempChangeTitleModal);
  };

  const handleChangeRecommendationSubTitle = (e) => {
    let tempChangeTitleModal = { ...changeRecommendationTitleModal };
    tempChangeTitleModal.updatedValue = e.target.value;
    setChangeRecommendationTitleModal(tempChangeTitleModal);
  };

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
            console.log(tempData, "tempData");
            if (tempData === null) {
            } else {
              setSectionData(tempData);
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChartDataFormat = (data) => {
    // Initial position

    let tempData = [...data];
    tempData.forEach((item) => {
      let position = { x: 0, y: 20 };
      item.boxes.forEach((subItem) => {
        // Create a copy of the current position before modifying it
        let currentPos = { ...position };

        if (subItem.type === "Value Chart") {
          subItem.size = { width: 360, height: 100 };
          subItem.position = currentPos;

          // Update the position for the next item

          position.y = position.y + 120;
        } else if (subItem.type === "Bar Chart") {
          subItem.size = { width: 751, height: 480 };
          subItem.position = currentPos;

          // Update the position for the next item

          position.y = position.y + 500;
        } else if (subItem.type === "Text Chart") {
          subItem.size = { width: 360, height: 100 };
          subItem.position = currentPos;

          // Update the position for the next item

          position.y = position.y + 120;
        }
      });
    });

    tempData.push(recommendationText);

    return tempData;
  };

  const handleSubmit = async () => {
    const payloadData = {
      profile_id: location.state.profileId.toString(),
      governify_compliance_report: JSON.stringify(
        getChartDataFormat(sectionData)
      ),
    };

    const payloadDataNew = {
      governify_compliance_report_view: [],
      profile_id: location.state.profileId.toString(),
    };

    try {
      const response = await governifyComplianceReportAdminSetting(payloadData);
      const response1 = await saveAdminComplianceView(payloadDataNew);

      if (response.success) {
        sessionStorage.removeItem("draggableResizableStateCompliance");
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

  const handleSaveTitle = () => {
    if (changeTitleModal.updatedValue.length === 0) {
      toast.error("Please Enter the Title!");
      return;
    }
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === changeTitleModal.previousValue) {
        item.title = changeTitleModal.updatedValue;
      }
    });
    setSectionData(tempData);

    setChangeTitleModal({
      flag: false,
      type: "",
      previousValue: "",
      updatedValue: "",
    });
  };

  const handleSaveRecommendationTitle = () => {
    if (changeRecommendationTitleModal.updatedValue.length === 0) {
      toast.error("Please Enter the Title!");
      return;
    }
    let tempData = { ...recommendationText };
    tempData.title = changeRecommendationTitleModal.updatedValue;
    setRecommendationText(tempData);

    setChangeRecommendationTitleModal({
      flag: false,
      type: "Recommendation",
      previousValue: "",
      updatedValue: "",
    });
  };

  const handleSaveSubTitle = () => {
    if (changeSubTitleModal.updatedValue.length === 0) {
      toast.error("Please Enter the Title!");
      return;
    }
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === changeSubTitleModal.parent) {
        item.boxes.forEach((subItem) => {
          if (subItem.title === changeSubTitleModal.previousValue) {
            subItem.title = changeSubTitleModal.updatedValue;
          }
        });
      }
    });
    setSectionData(tempData);

    setChangeSubTitleModal({
      flag: false,
      type: "",
      previousValue: "",
      updatedValue: "",
      id: "",
      parent: "",
    });
  };

  const handleCreateSection = () => {
    setCreateSectionModal({ flag: true, title: "" });
  };

  const handleChangeSectionTitle = (item) => {
    setChangeTitleModal({
      flag: true,
      type: item.title,
      previousValue: item.title,
      updatedValue: "",
    });
  };

  const handleChangeSubSectionTitle = (item, subItem) => {
    setChangeSubTitleModal({
      flag: true,
      type: subItem.title,
      previousValue: subItem.title,
      updatedValue: "",
      id: subItem.id,
      parent: item.title,
    });
  };

  const handleChangeRecommendationTitle = () => {
    setChangeRecommendationTitleModal({
      flag: true,
      type: "Recommendation",
      previousValue: recommendationText.title,
      updatedValue: "",
    });
  };

  const handlChangeRecommendationColumn = (e) => {
    const tempData = { ...recommendationText };
    tempData.column = e;
    setRecommendationText(tempData);
  };

  const handleChangeDeleteChart = (item, subItem) => {
    const tempItem = { ...item };
    const filterData = tempItem.boxes.filter(
      (detail) => detail.id !== subItem.id
    );
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = filterData;
      }
    });

    setSectionData(tempData);
  };

  const handlChangeColumn1ChartHeading = (e, subItem, item) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.column1 = e;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeValueColumn = (e, item, subItem) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.column = e;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeTextChartColor = (value, item, subItem) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.color = value.toHexString();
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeColumn2ChartHeading = (e, subItem, item) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.column2 = e;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeChartHeading = (e, item, subItem) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.heading = e.target.value;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeChartDescription = (e, item, subItem) => {
    const tempBoxes = [...item.boxes];
    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.description = e.target.value;
      }
    });
    let tempData = [...sectionData];
    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });
    setSectionData(tempData);
  };

  const handlChangeChartColumn = (e, item, subItem) => {
    const tempBoxes = [...item.boxes];
    let tempColor = subItem.selectedColor;
    let tempNewColor = [];

    let tempData = [...sectionData];
    e.forEach((detail) => {
      // Check if the item already exists in tempColor
      const existingColor = tempColor.find((color) => color.key === detail);

      // If the object exists, push the existing object
      if (existingColor) {
        tempNewColor.push(existingColor);
      } else {
        // If it doesn't exist, create a new object with an empty value
        tempNewColor.push({
          key: detail,
          value: "",
        });
      }
    });

    tempBoxes.forEach((detail) => {
      if (detail.id === subItem.id) {
        detail.selectedColumns = e;
        detail.selectedColor = tempNewColor;
      }
    });

    tempData.forEach((detail) => {
      if (detail.title === item.title) {
        detail.boxes = tempBoxes;
      }
    });

    setSectionData(tempData);
  };

  const getCollapseSubItems = (item, subItem, index, subIndex) => {
    if (subItem.type === "Text Chart") {
      return [
        {
          key: subIndex,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{subItem.title}</span>{" "}
                <Button
                  style={{ marginLeft: "10px" }}
                  type="text"
                  icon={<EditOutlined />}
                  iconPosition="start"
                  onClick={() => handleChangeSubSectionTitle(item, subItem)}
                ></Button>
              </div>
              <Button onClick={() => handleChangeDeleteChart(item, subItem)}>
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
                    handlChangeColumn1ChartHeading(e, subItem, item);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={subItem.column1 || undefined}
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
                    handlChangeColumn2ChartHeading(e, subItem, item);
                  }}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={subItem.column2 || undefined}
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
                  value={subItem.color}
                  size="large"
                  showText
                  onChange={(value) =>
                    handlChangeTextChartColor(value, item, subItem)
                  }
                />
              </div>
            </>
          ),
        },
      ];
    }

    if (subItem.type === "Bar Chart") {
      return [
        {
          key: subIndex,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{subItem.title}</span>{" "}
                <Button
                  style={{ marginLeft: "10px" }}
                  type="text"
                  icon={<EditOutlined />}
                  iconPosition="start"
                  onClick={() => handleChangeSubSectionTitle(item, subItem)}
                ></Button>
              </div>
              <Button onClick={() => handleChangeDeleteChart(item, subItem)}>
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
                  onChange={(e) => handlChangeChartHeading(e, item, subItem)}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  addonBefore={"Description"}
                  value={item.description}
                  onChange={(e) =>
                    handlChangeChartDescription(e, item, subItem)
                  }
                />
              </div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div>Bar Chart Type :</div>
                <Select
                  showSearch
                  placeholder="Select Bar Chart Type"
                  style={{
                    width: "50%",
                  }}
                  onChange={(e) => onChangeSwitchBarType(e, item, subItem)}
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
                  onChange={(e) => handlChangeChartColumn(e, item, subItem)}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.selectedColumns}
                />
              </div>
              <div>
                {subItem.selectedColor.map((color, colorIndex) => {
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
                          subItem.selectedColumns[colorIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={color.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangeChartColor(
                            value,
                            item,
                            subItem,
                            subItem.selectedColumns[colorIndex]
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

    if (subItem.type === "Value Chart") {
      return [
        {
          key: subIndex,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{subItem.title}</span>{" "}
                <Button
                  style={{ marginLeft: "10px" }}
                  type="text"
                  icon={<EditOutlined />}
                  iconPosition="start"
                  onClick={() => handleChangeSubSectionTitle(item, subItem)}
                ></Button>
              </div>
              <Button onClick={() => handleChangeDeleteChart(item, subItem)}>
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
                  onChange={(e) => handlChangeValueColumn(e, item, subItem)}
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

    if (subItem.type === "Multi Value Chart") {
      return [
        {
          key: subIndex,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>{subItem.title}</span>{" "}
                <Button
                  style={{ marginLeft: "10px" }}
                  type="text"
                  icon={<EditOutlined />}
                  iconPosition="start"
                  onClick={() => handleChangeSubSectionTitle(item, subItem)}
                ></Button>
              </div>
              <Button onClick={() => handleChangeDeleteChart(item, subItem)}>
                Delete
              </Button>
            </div>
          ),
          children: (
            <>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  addonBefore={"Heading"}
                  value={item.heading}
                  onChange={(e) => handlChangeChartHeading(e, item, subItem)}
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
                  onChange={(e) => handlChangeChartColumn(e, item, subItem)}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={item.selectedColumns}
                />
              </div>

              <div>
                {subItem.selectedColor.map((color, colorIndex) => {
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
                          subItem.selectedColumns[colorIndex]
                        )}
                      </span>
                      <ColorPicker
                        value={color.value}
                        size="large"
                        showText
                        onChange={(value) =>
                          handlChangeChartColor(
                            value,
                            item,
                            subItem,
                            subItem.selectedColumns[colorIndex]
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

  const handleDeleteSection = (item) => {
    const filterData = sectionData.filter(
      (subItem) => subItem.title !== item.title
    );
    setSectionData(filterData);
  };

  const getChartItem = (item) => {
    return [
      {
        key: "1",
        label: (
          <span onClick={() => handleSelectChartTypeText(item.title)}>
            Text Chart
          </span>
        ),
      },

      {
        key: "2",
        label: (
          <span onClick={() => handleSelectChartTypeBar(item.title)}>
            Bar Chart
          </span>
        ),
      },

      {
        key: "3",
        label: (
          <span onClick={() => handleSelectChartTypeValue(item.title)}>
            Value Chart
          </span>
        ),
      },

      {
        key: "4",
        label: (
          <span onClick={() => handleSelectChartTypePercentage(item.title)}>
            Multi Value Chart
          </span>
        ),
      },
    ];
  };

  const getCollapseItems = (item, index) => {
    return [
      {
        key: index + 1,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span>{item.title}</span>
              <Button
                style={{ marginLeft: "10px" }}
                type="text"
                icon={<EditOutlined />}
                iconPosition="start"
                onClick={() => handleChangeSectionTitle(item)}
              ></Button>
              <Button
                style={{ marginLeft: "10px" }}
                type="text"
                icon={<DeleteOutlined />}
                iconPosition="start"
                onClick={() => handleDeleteSection(item)}
              ></Button>
            </div>
            <div>
              <Dropdown
                menu={{
                  items: getChartItem(item),
                }}
                placement="bottom"
                arrow
              >
                <Button>Add New Chart</Button>
              </Dropdown>
            </div>
          </div>
        ),
        children: (
          <div style={{ marginTop: "10px" }}>
            {item.boxes.map((subItem, subIndex) => {
              return (
                <div key={subIndex}>
                  <div style={{ marginTop: "10px" }}>
                    <Collapse
                      items={getCollapseSubItems(
                        item,
                        subItem,
                        index,
                        subIndex
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ),
      },
    ];
  };

  const getRecommendationItem = () => {
    return [
      {
        key: 1,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span>{recommendationText.title}</span>
              <Button
                style={{ marginLeft: "10px" }}
                type="text"
                icon={<EditOutlined />}
                iconPosition="start"
                onClick={handleChangeRecommendationTitle}
              ></Button>
            </div>
          </div>
        ),
        children: (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <Select
              showSearch
              placeholder="Select Recommendation Column"
              style={{
                width: "50%",
              }}
              onChange={handlChangeRecommendationColumn}
              options={columnOptions}
              filterOption={filterOption}
              value={recommendationText.column}
            />
          </div>
        ),
      },
    ];
  };

  const handleChangeNewCreateSectionTitle = (e) => {
    let tempData = { ...createSectionModal };
    tempData.title = e.target.value;
    setCreateSectionModal(tempData);
  };

  const handleSaveNewSection = () => {
    if (createSectionModal.title.length === 0) {
      toast.error("Please Enter The Title Name!");
      return;
    }
    let tempData = [...sectionData];
    tempData.push({
      id: 0,
      title: createSectionModal.title,
      height: 400,
      boxes: [],
    });
    setSectionData(tempData);
    setCreateSectionModal({ flag: false, title: "" });
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
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button onClick={handleCreateSection}>Create Section</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-section">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ marginTop: "20px" }}
            >
              {sectionData.map((item, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginTop: "20px",
                        border: "1px solid #ddd",
                        padding: "10px",
                        backgroundColor: "white",
                      }}
                    >
                      <Collapse
                        collapsible="icon"
                        items={getCollapseItems(item, index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{ marginTop: "10px" }}>
        <Collapse collapsible="icon" items={getRecommendationItem()} />
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
      <Modal
        open={changeSubTitleModal.flag}
        title="Change Sub Title"
        centered
        footer={(_, record) => (
          <>
            <Button
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleSaveSubTitle}
            >
              Save
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => {
                setChangeSubTitleModal({
                  flag: false,
                  type: "",
                  previousValue: "",
                  updatedValue: "",
                  id: "",
                  parent: "",
                });
              }}
            >
              Cancel
            </Button>
          </>
        )}
        onCancel={() => {
          setChangeSubTitleModal({
            flag: false,
            type: "",
            previousValue: "",
            updatedValue: "",
            id: "",
            parent: "",
          });
        }}
      >
        <Input
          value={changeSubTitleModal.updatedValue}
          onChange={handleChangeSubTitle}
        />
      </Modal>
      <Modal
        open={createSectionModal.flag}
        title="Create Section"
        centered
        footer={(_, record) => (
          <>
            <Button
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleSaveNewSection}
            >
              Save
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => {
                setCreateSectionModal({ flag: false, title: "" });
              }}
            >
              Cancel
            </Button>
          </>
        )}
        onCancel={() => {
          setCreateSectionModal({ flag: false, title: "" });
        }}
      >
        <Input
          addonBefore={"Enter Title"}
          value={createSectionModal.title}
          onChange={handleChangeNewCreateSectionTitle}
        />
      </Modal>
      <Modal
        open={changeRecommendationTitleModal.flag}
        title="Change Recommendation Title"
        centered
        footer={(_, record) => (
          <>
            <Button
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleSaveRecommendationTitle}
            >
              Save
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => {
                setChangeRecommendationTitleModal({
                  flag: false,
                  type: "Recommendation",
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
          setChangeRecommendationTitleModal({
            flag: false,
            type: "Recommendation",
            previousValue: "",
            updatedValue: "",
          });
        }}
      >
        <Input
          value={changeRecommendationTitleModal.updatedValue}
          onChange={handleChangeRecommendationSubTitle}
        />
      </Modal>
    </div>
  );
};
