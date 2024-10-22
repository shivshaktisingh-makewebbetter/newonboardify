import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import {
  DragOutlined,
  FallOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  getProfileListing,
  getServiceReportDataAdmin,
  saveAdminServiceView,
} from "../apiservice/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChartHorizontal } from "../common/BarChartHorizontal";
import { BarChartVertical } from "../common/BarChartVertical";
import { Button, Tooltip } from "antd";
import { PieChart } from "../common/PieChart";
import { toast, ToastContainer } from "react-toastify";
import { CustomTooltip } from "../common/CustomToolTip";
const SESSION_STORAGE_KEY = "draggableResizableStateService"; // Key to save data in sessionStorage

export const ServiceReportAdminView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentData, setCurrentData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [allColumnTitle, setAllColumnTitle] = useState([]);
  const [nameValue, setNameValue] = useState({
    currentName: "",
    previousName: "",
  });
  const [containers, setContainers] = useState([
    {
      id: 1,
      boxes: [],
      height: 400,
    },
    {
      id: 2,
      boxes: [],
      height: 400,
    },
    {
      id: 3,
      boxes: [],
      height: 400,
    },
    {
      id: 4,
      boxes: [],
      height: 400,
    },
  ]);

  // Save the current state to sessionStorage
  const saveStateToSessionStorage = (newContainers) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newContainers));
  };

  // Handle dragging stop for a specific box in a specific container
  const handleDragStop = (e, data, containerIndex, boxIndex) => {
    const newContainers = containers.map((container, i) =>
      i === containerIndex
        ? {
            ...container,
            boxes: container.boxes.map((box, j) =>
              j === boxIndex
                ? { ...box, position: { x: data.x, y: data.y } }
                : box
            ),
          }
        : container
    );
    setContainers(newContainers);
    saveStateToSessionStorage(newContainers);
  };

  // Handle resizing for a specific box in a specific container
  const handleResize = (e, { size: newSize }, containerIndex, boxIndex) => {
    const newContainers = containers.map((container, i) =>
      i === containerIndex
        ? {
            ...container,
            boxes: container.boxes.map((box, j) =>
              j === boxIndex ? { ...box, size: newSize } : box
            ),
          }
        : container
    );
    setContainers(newContainers);
    saveStateToSessionStorage(newContainers);
  };

  // Handle resizing of the container itself
  const handleContainerResize = (e, { size }, containerIndex) => {
    const newContainers = containers.map((container, i) =>
      i === containerIndex ? { ...container, height: size.height } : container
    );
    setContainers(newContainers);
    saveStateToSessionStorage(newContainers);
  };

  // Toggle drag handle visibility on hover
  const toggleDragHandleVisibility = (containerIndex, boxIndex, visible) => {
    const newContainers = containers.map((container, i) =>
      i === containerIndex
        ? {
            ...container,
            boxes: container.boxes.map((box, j) =>
              j === boxIndex ? { ...box, showDragHandle: visible } : box
            ),
          }
        : container
    );
    setContainers(newContainers);
  };

  const fetchData = async () => {
    let tempData = [];
    let tempContainerData = [];

    try {
      const response = await getProfileListing();
      const response1 = await getServiceReportDataAdmin(
        location.state.boardId,
        location.state.filterKey.date_key
      );

      if (response1.success) {
        setAllColumnTitle(response1.data.response.data.boards[0].columns);
        response1.data.response.data.boards[0].items_page.items.forEach(
          (item) => {
            if (location.state.filterKey.key === "name") {
              if (
                item.name.toLowerCase() ===
                location.state.filterKey.value.toLowerCase()
              ) {
                setCurrentData(item.column_values);
                setNameValue({ ...nameValue, currentName: item.name });
              }
            } else {
              item.column_values.forEach((subItem) => {
                if (subItem.text !== null) {
                  if (
                    subItem.id === location.state.filterKey.key &&
                    subItem.text === location.state.filterKey.value
                  ) {
                    setCurrentData(item.column_values);
                    setNameValue({ ...nameValue, currentName: item.name });
                  }
                }
              });
            }
          }
        );
      } else {
      }

      if (response.success) {
        response.data.response.forEach((item) => {
          if (item.id.toString() === location.state.profileId.toString()) {
            tempData = JSON.parse(item.governify_service_report);
            setContainers(tempData);
          }
        });
      }
    } catch (err) {
    } finally {
      const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedState) {
        setContainers(JSON.parse(savedState));
      }
    }
  };

  const handleSubmit = async () => {
    const payloadData = {
      governify_service_report_view: JSON.stringify(containers),
      profile_id: location.state.profileId.toString(),
    };
    try {
      const response = await saveAdminServiceView(payloadData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      sessionStorage.removeItem("draggableResizableStateService");
    }
  };

  const getColumnValueForTextChart = (id) => {
    let tempValue = "";
    if (id === "name") {
      tempValue = nameValue.currentName;
    } else {
      currentData.forEach((item) => {
        if (item.id === id) {
          tempValue = item.text;
        }
      });
    }

    return tempValue;
  };

  const getDataSetForHorizontalBarChart = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push({
        label: getColumnTitleForTextChart(item),
        data: [getColumnValueForTextChart(item)],
        backgroundColor: getBgColorForBarChart(subItem, item),
        borderColor: getBorderColorForBarChart(subItem, item),
        borderWidth: 1,
        borderRadius: {
          topLeft: 0, // Set the top-left corner radius
          topRight: 5, // Set the top-right corner radius
          bottomLeft: 0, // No radius for the bottom-left corner
          bottomRight: 5, // No radius for the bottom-right corner
        },
        borderSkipped: false,
      });
    });

    return tempData;
  };

  const getColumnTitleForTextChart = (id) => {
    let tempValue = "";
    allColumnTitle.forEach((item) => {
      if (item.id === id) {
        tempValue = item.title;
      }
    });
    return tempValue;
  };

  const getBgColorForBarChart = (subItem, item) => {
    let hexColor = "#d20e0e";
    subItem.selectedColor.forEach((detail) => {
      if (detail.key === item) {
        hexColor = detail.value;
      }
    });
    hexColor = hexToRgba(hexColor, "1");
    return hexColor;
  };

  const getBorderColorForBarChart = (subItem, item) => {
    let hexColor = "#d20e0e";
    subItem.selectedColor.forEach((detail) => {
      if (detail.key === item) {
        hexColor = detail.value;
      }
    });
    hexColor = hexToRgba(hexColor, "1");
    return hexColor;
  };

  const getPieChartDataSet = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push(getColumnValueForTextChart(item));
    });
    return tempData;
  };

  const getPieChartBg = (subItem) => {
    let tempData = [];

    subItem.selectedColumns.forEach((item) => {
      tempData.push(getBgColorForBarChart(subItem, item));
    });
    return tempData;
  };

  const getKeyFromAllColumn = (key) => {
    let tempValue;
    allColumnTitle.forEach((item) => {
      if (item.id === key) {
        tempValue = item.title;
      }
    });
    return tempValue;
  };

  const getTooltipData = (tempData) => {
    let tempCurrentArr = [];
    let tempPreviousArr = [];

    currentData.forEach((item) => {
      if (tempData.selectedColumns.includes(item.id)) {
        tempCurrentArr.push({
          key: getKeyFromAllColumn(item.id),
          value: item.text,
        });
      }
    });

    previousData.forEach((item) => {
      if (tempData.selectedColumns.includes(item.id)) {
        tempPreviousArr.push({
          key: getKeyFromAllColumn(item.id),
          value: item.text,
        });
      }
    });
    return { tempCurrentArr, tempPreviousArr };
  };

  const getPieChartBorder = (subItem) => {
    let tempData = [];

    subItem.selectedColumns.forEach((item) => {
      tempData.push("#fff");
    });
    return tempData;
  };

  const getPieChartLabel = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push(getColumnTitleForTextChart(item));
    });

    return tempData;
  };

  function hexToRgba(hex, opacity) {
    // Remove the '#' if it's there
    hex = hex.replace("#", "");

    // Parse the hex color
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Return the RGBA string with opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const getDataSetForVerticalBarChart = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push({
        label: getColumnTitleForTextChart(item),
        data: [getColumnValueForTextChart(item)],
        backgroundColor: getBgColorForBarChart(subItem, item),
        borderColor: getBorderColorForBarChart(subItem, item),
        borderWidth: 1,
        borderRadius: {
          topLeft: 5, // Set the top-left corner radius
          topRight: 5, // Set the top-right corner radius
          bottomLeft: 0, // No radius for the bottom-left corner
          bottomRight: 0, // No radius for the bottom-right corner
        },
        borderSkipped: false,
        hoverBackgroundColor: getBgColorForBarChart(subItem, item), // Prevent hover color changes
        hoverBorderColor: getBorderColorForBarChart(subItem, item),
      });
    });

    return tempData;
  };

  function calculateStepSize(data) {
    // Convert string data to numbers
    const numericData = data.map(Number);

    // Find min and max values in the data
    const minValue = Math.min(...numericData);
    const maxValue = Math.max(...numericData);

    // Calculate the range
    const range = maxValue - minValue;

    // Determine a reasonable number of steps (e.g., 5 or 10 steps)
    const numberOfSteps = 2; // You can adjust this for more/less granularity

    // Calculate the raw stepSize by dividing the range by number of steps
    let stepSize = range / numberOfSteps;

    // Round stepSize up to the nearest multiple of 10
    stepSize = Math.ceil(stepSize / 10) * 10;

    return stepSize;
  }

  function calculateChartMax(data) {
    const numericData = data.map(Number);

    // Find the maximum value in the data
    const maxValue = Math.max(...numericData);

    // Calculate the stepSize
    const stepSize = calculateStepSize(data);

    // Calculate the chart max value, which is one stepSize above the max value
    const chartMax = Math.ceil(maxValue / stepSize) * stepSize + stepSize;

    return chartMax;
  }

  const getStepSizeForVerticalBarChart = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push(getColumnValueForTextChart(item));
    });

    let stepSize = calculateStepSize(tempData);

    return stepSize;
  };

  const getMaxForVerticalBarChart = (subItem) => {
    let tempData = [];

    subItem.selectedColumns.forEach((item) => {
      tempData.push(getColumnValueForTextChart(item));
    });

    let chartMax = calculateChartMax(tempData);

    return chartMax;
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const getColumnPercentage = (column, data) => {
    let tempData = 0;
    const valueOfSelected = getColumnValueForTextChart(column);

    // Calculate total from the data
    data.forEach((item) => {
      tempData += Number(getColumnValueForTextChart(item));
    });

    // Calculate the percentage
    const percentage = tempData > 0 ? (valueOfSelected / tempData) * 100 : 0; // Avoid division by zero

    return parseFloat(percentage.toFixed(2)) + " %";
  };

  const getDescriptionForColumn = (column) => {
    let description = "";
    allColumnTitle.forEach((item) => {
      if (item.id === column) {
        if (item.hasOwnProperty("description") && item.description !== null) {
          description = item.description;
        } else {
          description = "";
        }
        // description = item.desc;
      }
    });

    if (description === undefined) {
      description = "";
    }
    return description;
  };

  const getPreviousMonthChange = (id) => {
    if (id === undefined) {
      return "1 %";
    }
    if (previousData.length === 0 || currentData.length === 0) {
      return "";
    }

    const currentResult = currentData.find((item) => item.id === id);
    const previousResult = previousData.find((item) => item.id === id);
    if (currentResult === undefined || previousResult === undefined) {
      return "";
    }
    const percentageChange =
      ((Number(currentResult.text) - Number(previousResult.text)) /
        Number(previousResult.text)) *
      100;
    return percentageChange.toFixed(1);
  };

  const getBgSquareColor = (id, data) => {
    let tempColor = "#000000";
    data.forEach((item) => {
      if (item.key === id) {
        tempColor = item.value;
      }
    });
    return tempColor;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Button icon={<LeftOutlined />} onClick={handleBackNavigation}></Button>
      </div>
      
      {containers.map((container, containerIndex) => {
        return (
          <ResizableBox
            key={container.id}
            width={1200}
            height={container.height}
            minConstraints={[200, 150]}
            maxConstraints={[Infinity, Infinity]}
            resizeHandles={["s"]}
            onResizeStop={(e, data) =>
              handleContainerResize(e, data, containerIndex)
            }
            handle={
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#ccc",
                  cursor: "s-resize",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              ></div>
            }
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              padding: "10px",
              overflow: "auto",
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#818181",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                {container.title}
              </p>

              {container.boxes.map((subItem, boxIndex) => {
                if (subItem.type === "Text Chart") {
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={subItem.size.width}
                          height={subItem.size.height}
                          minConstraints={[100, 100]}
                          maxConstraints={[
                            window.innerWidth - subItem.position.x,
                            window.innerHeight - subItem.position.y,
                          ]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) =>
                            handleResize(e, data, containerIndex, boxIndex)
                          }
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                borderRight: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  fontSize: "14px",
                                  color: "#6d7175",
                                  marginBottom: "6px",
                                }}
                              >
                                {getColumnTitleForTextChart(subItem.column1)}
                              </p>

                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  fontSize: "24px",
                                  fontWeight: "600",
                                  color: "#202223",
                                  marginBottom: "6px",
                                  fontFamily: "Graphie-SemiBold",
                                }}
                              >
                                {getColumnValueForTextChart(subItem.column1)}
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "right",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  marginBottom: "6px",
                                  borderRadius: "100px",
                                  background: hexToRgba(subItem.color, "0.2"),
                                  padding: "6px 12px",
                                  color: subItem.color,
                                  fontFamily: "Graphie-Light",
                                }}
                              >
                                {getColumnValueForTextChart(subItem.column2)}
                              </p>
                            </div>
                          </div>
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
                if (subItem.type === "Bar Chart") {
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={Number(subItem.size.width) || 500}
                          height={Number(subItem.size.height) || 500}
                          minConstraints={[100, 100]}
                          maxConstraints={[
                            window.innerWidth - subItem.position.x,
                            1000,
                          ]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) => {
                            handleResize(e, data, containerIndex, boxIndex);
                          }}
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                borderRight: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}

                          {subItem.horizontal ? (
                            <BarChartHorizontal
                              dataset={getDataSetForHorizontalBarChart(subItem)}
                              stepsize={getStepSizeForVerticalBarChart(subItem)}
                              max={getMaxForVerticalBarChart(subItem)}
                              title={subItem.heading}
                              description={subItem.description}
                              toolTipData={getTooltipData(subItem)}
                              previousData={previousData}
                              mobileView={false}
                            />
                          ) : (
                            <BarChartVertical
                              dataset={getDataSetForVerticalBarChart(subItem)}
                              stepsize={getStepSizeForVerticalBarChart(subItem)}
                              max={getMaxForVerticalBarChart(subItem)}
                              title={subItem.heading}
                              description={subItem.description}
                              toolTipData={getTooltipData(subItem)}
                              previousData={previousData}
                              mobileView={false}
                            />
                          )}
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
                if (subItem.type === "Pie Chart") {
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={subItem.size.width}
                          height={subItem.size.height}
                          minConstraints={[100, 100]}
                          maxConstraints={[
                            window.innerWidth - subItem.position.x,
                            1000,
                          ]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) =>
                            handleResize(e, data, containerIndex, boxIndex)
                          }
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                borderRight: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}

                          <PieChart
                            title={subItem.heading}
                            dataset={getPieChartDataSet(subItem)}
                            bgSet={getPieChartBg(subItem)}
                            pieChartLabel={getPieChartLabel(subItem)}
                            borderColorSetPie={getPieChartBorder(subItem)}
                            description={subItem.description}
                            mobileView={false}
                          />
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
                if (subItem.type === "Value Chart") {
                  const description = getDescriptionForColumn(subItem.column);
                  const changePreviousMonth = getPreviousMonthChange(
                    subItem.column
                  );
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={Number(subItem.size.width)}
                          height={Number(subItem.size.height)}
                          minConstraints={[100, 100]}
                          maxConstraints={[500, 500]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) =>
                            handleResize(e, data, containerIndex, boxIndex)
                          }
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                borderRight: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  fontSize: "14px",
                                  color: "#6d7175",
                                  marginBottom: "6px",
                                  // fontFamily: "Graphie-SemiBold",
                                }}
                              >
                                {getColumnTitleForTextChart(subItem.column)}
                                <span>
                                  {description.length > 0 && (
                                    <Tooltip
                                      placement="top"
                                      title={description}
                                    >
                                      {" "}
                                      <InfoCircleOutlined
                                        style={{ fontSize: "14px" }}
                                      />{" "}
                                    </Tooltip>
                                  )}
                                </span>
                              </p>
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  fontSize: "24px",
                                  fontWeight: "600",
                                  color: "#202223",
                                  marginBottom: "6px",
                                  fontFamily: "Graphie-SemiBold",
                                }}
                              >
                                {getColumnValueForTextChart(subItem.column)}
                              </p>
                            </div>
                            <div>
                              {previousData.length > 0 && (
                                <p
                                  style={{
                                    width: "100%",
                                    textAlign: "right",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    marginBottom: "6px",
                                    borderRadius: "100px",
                                    padding: "6px 12px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "right",
                                      color:
                                        changePreviousMonth > 0
                                          ? "#22c55e"
                                          : "#EF4444",
                                      fontSize: "12px",
                                      fotWeight: "600",
                                      lineHeight: "16.8px",
                                    }}
                                  >
                                    <span>
                                      {changePreviousMonth > 0 ? (
                                        <RiseOutlined color={"#22c55e"} />
                                      ) : (
                                        <FallOutlined color={"#ef4444"} />
                                      )}
                                    </span>{" "}
                                    <span>
                                      {" "}
                                      {Math.abs(changePreviousMonth) +
                                        " %"}{" "}
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      color: "#6d7175",
                                      lineHeight: "16.8px",
                                      fontFamily: "Graphie-Regular",
                                    }}
                                  >
                                    vs last time
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
                if (subItem.type === "Multi Value Chart") {
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={Number(subItem.size.width)}
                          height={Number(subItem.size.height)}
                          minConstraints={[100, 100]}
                          maxConstraints={[Infinity, Infinity]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) =>
                            handleResize(e, data, containerIndex, boxIndex)
                          }
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",

                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "44px",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}

                          <div
                            style={{
                              width: "70%",
                              borderBottom:
                                "1px solid rgba(201, 204, 207, 0.7)",
                            }}
                          >
                            <p
                              style={{
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#202223",
                                position: "absolute",
                                top: "20px",
                                left: "20px",
                                width: "90%",
                                fontFamily: "Graphie-Regular",
                              }}
                            >
                              {subItem.heading}
                              <span>
                                {subItem.description.length > 0 && (
                                  <CustomTooltip
                                    description={subItem.description}
                                  />
                                )}
                              </span>
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "26px",
                              flexDirection: "column",
                              width: "70%",
                            }}
                          >
                            {subItem.selectedColumns.map((column, index) => (
                              <div key={index} style={{ marginBottom: "10px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "24px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      background: getBgSquareColor(
                                        column,
                                        subItem.selectedColor
                                      ),
                                      borderRadius: "4px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      color: "#202223",
                                      fontSize: "20px",
                                      fontWeight: "600",
                                      fontFamily: "Graphie-SemiBold",
                                    }}
                                  >
                                    {getColumnTitleForTextChart(column)}
                                  </div>
                                </div>
                                <p
                                  style={{
                                    fontSize: "45px",
                                    fontWeight: "700",
                                    color: "#202223",
                                    fontFamily: "Graphie-Bold",
                                  }}
                                >
                                  {getColumnPercentage(
                                    column,
                                    subItem.selectedColumns
                                  )}
                                </p>
                                {subItem.selectedColumns.length - 1 > index && (
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      marginBottom: "15px",
                                      borderBottom:
                                        "1px solid rgba(201, 204, 207, 0.7)",
                                    }}
                                  ></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
                if (subItem.type === "Recommendation Chart") {
                  return (
                    <Draggable
                      bounds="parent"
                      key={subItem.id}
                      handle=".drag-handle"
                      position={subItem.position}
                      grid={[25, 25]}
                      scale={1}
                      onStop={(e, data) =>
                        handleDragStop(e, data, containerIndex, boxIndex)
                      }
                    >
                      <div
                        style={{ position: "absolute" }}
                        onMouseEnter={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleDragHandleVisibility(
                            containerIndex,
                            boxIndex,
                            false
                          )
                        }
                      >
                        <ResizableBox
                          width={Number(subItem.size.width)}
                          height={Number(subItem.size.height)}
                          minConstraints={[100, 100]}
                          maxConstraints={[
                            window.innerWidth - subItem.position.x,
                            window.innerHeight - subItem.position.y,
                          ]}
                          resizeHandles={["se"]}
                          onResizeStop={(e, data) =>
                            handleResize(e, data, containerIndex, boxIndex)
                          }
                          style={{
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {subItem.showDragHandle && (
                            <div
                              className="drag-handle"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#ccc",
                                cursor: "move",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid black",
                                borderRight: "1px solid black",
                                zIndex: 1,
                              }}
                            >
                              <DragOutlined />
                            </div>
                          )}
                          <div style={{ textAlign: "left" }}>
                            {getColumnValueForTextChart(subItem.column)}
                          </div>
                        </ResizableBox>
                      </div>
                    </Draggable>
                  );
                }
              })}
            </div>
          </ResizableBox>
        );
      })}

      <div>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
