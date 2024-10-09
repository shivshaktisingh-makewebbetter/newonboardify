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
  saveAdminServiceView,
} from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";
import { DeleteOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Loader } from "../common/Loader";

// import { fetcher } from "../../utils/helper";

export const ServiceReportSettings = ({
  sectionData,
  setSectionData,
  columnOptions,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const [createSectionModal, setCreateSectionModal] = useState({
    flag: false,
    title: "",
  });

  const barTypeChartOptions = [
    { label: "Horizontal chart", value: true },
    { label: "Vertical Chart", value: false },
  ];

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

  const handleSelectChartTypePie = (title) => {
    let tempData = [...sectionData];
    tempData.forEach((item) => {
      if (item.title === title) {
        item.boxes.push({
          type: "Pie Chart",
          title: "Pie Chart",
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

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getAllColumnsOfBoard(location.state.boardId);
  //     const response1 = await getProfileListing();

  //     if (response.success) {
  //       const tempData = [];
  //       response.data.response.forEach((item) => {
  //         tempData.push({ label: item.title, value: item.id });
  //       });
  //       setColumnOptions(tempData);
  //     }
  //     if (response1.success) {
  //       response1.data.response.forEach((item) => {
  //         if (item.id.toString() === location.state.profileId.toString()) {
  //           const tempData = JSON.parse(item.governify_service_report);
  //           if (tempData === null) {
  //             setSectionData([
  //               {
  //                 id: 0,
  //                 title: "About Company",
  //                 height: 400,
  //                 boxes: [],
  //               },
  //               {
  //                 id: 1,
  //                 title: "Insights",
  //                 height: 800,
  //                 boxes: [],
  //               },
  //             ]);
  //           } else {
  //             setSectionData(tempData);
  //           }
  //         }
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        } else if (subItem.type === "Pie Chart") {
          subItem.size = { width: 365, height: 417 };
          subItem.position = currentPos;
          position.y = position.y + 437;
        } else if (subItem.type === "Bar Chart") {
          subItem.size = { width: 751, height: 480 };
          subItem.position = currentPos;
          position.y = position.y + 500;
        } else if (subItem.type === "Text Chart") {
          subItem.size = { width: 360, height: 100 };
          subItem.position = currentPos;
          position.y = position.y + 120;
        }
      });
      item.height = position.y + 40;
    });

    return tempData;
  };

  const delayFun = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
 
  const handleSaveTitle = () => {
    let nameAlreadyExist = false;
    if (changeTitleModal.updatedValue.length === 0) {
      toast.error("Please Enter the Title!");
      return;
    }
    let tempData = [...sectionData];

    tempData.forEach((item) => {
      if (item.title.trim() === changeTitleModal.updatedValue.trim()) {
        nameAlreadyExist = true;
      }
    });

    if(nameAlreadyExist){
      toast.error('Title already exist!');
      return;
    }


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

  const handleSaveSubTitle = () => {
    let nameAlreadyExist = false;
    let selectedItem ;
    if (changeSubTitleModal.updatedValue.length === 0) {
      toast.error("Please Enter the Title!");
      return;
    }
    let tempData = [...sectionData];

    tempData.forEach((item) => {
      if (item.title === changeSubTitleModal.parent) {
        selectedItem = item;
      }
    });

 
    selectedItem.boxes.forEach((item)=>{
      if(item.title.trim() === changeSubTitleModal.updatedValue.trim()){
        nameAlreadyExist = true;
      }
    });


    tempData.forEach((item) => {
      if (item.title === changeSubTitleModal.parent) {
        selectedItem = item;
        item.boxes.forEach((subItem) => {
          if (subItem.title === changeSubTitleModal.previousValue) {
            subItem.title = changeSubTitleModal.updatedValue;
          }
        });
      }
    });


    if(nameAlreadyExist){
      toast.error('Title already exist!');
      return;
    }

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
                  value={subItem.heading}
                  onChange={(e) => handlChangeChartHeading(e, item, subItem)}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  addonBefore={"Description"}
                  value={subItem.description}
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
                  value={subItem.horizontal}
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
                  value={subItem.selectedColumns}
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

    if (subItem.type === "Pie Chart") {
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
                  value={subItem.heading}
                  onChange={(e) => handlChangeChartHeading(e, item, subItem)}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  addonBefore={"Description"}
                  value={subItem.description}
                  onChange={(e) =>
                    handlChangeChartDescription(e, item, subItem)
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
                  onChange={(e) => handlChangeChartColumn(e, item, subItem)}
                  options={columnOptions}
                  filterOption={filterOption}
                  value={subItem.selectedColumns}
                />
              </div>
              <div>
                {subItem.selectedColor.length > 0 &&
                  subItem.selectedColor.map((color, colorIndex) => {
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
          <span onClick={() => handleSelectChartTypePie(item.title)}>
            Pie Chart
          </span>
        ),
      },
      {
        key: "3",
        label: (
          <span onClick={() => handleSelectChartTypeBar(item.title)}>
            Bar Chart
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

  const handleChangeNewCreateSectionTitle = (e) => {
    let tempData = { ...createSectionModal };
    tempData.title = e.target.value;
    setCreateSectionModal(tempData);
  };

  const handleSaveNewSection = () => {
    let nameAlreadyExist = false;
    if (createSectionModal.title.length === 0) {
      toast.error("Please Enter The Title Name!");
      return;
    }
    let tempData = [...sectionData];

    tempData.forEach((item)=>{
      if(item.title.trim() === createSectionModal.title.trim()){
        nameAlreadyExist  = true;
      }
    })

    if(nameAlreadyExist){
      toast.error("Title already exist!");
      return;
    }

    tempData.push({
      id: 0,
      title: createSectionModal.title,
      height: 400,
      boxes: [],
    });
    setSectionData(tempData);
    setCreateSectionModal({ flag: false, title: "" });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Button onClick={handleCreateSection}>Create Section</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-section">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ marginTop: "10px" }}
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
                        marginTop: "10px",
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
    </div>
  );
};
