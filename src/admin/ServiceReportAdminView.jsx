import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import { DragOutlined } from "@ant-design/icons";
import {
  getProfileListing,
  getServiceReportDataAdmin,
  saveAdminServiceView,
} from "../apiservice/ApiService";
import { useLocation } from "react-router-dom";
import { BarChartHorizontal } from "../common/BarChartHorizontal";
import { BarChartVertical } from "../common/BarChartVertical";
import { Button } from "antd";
import { PieChart } from "../common/PieChart";
import { toast, ToastContainer } from "react-toastify";
const SESSION_STORAGE_KEY = "draggableResizableStateService"; // Key to save data in sessionStorage

export const ServiceReportAdminView = () => {
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
            if (
              item.name.toLowerCase() ===
              location.state.filterKey.value.toLowerCase()
            ) {
              setCurrentData(item.column_values);
              setNameValue({ ...nameValue, currentName: item.name });
            }
          }
        );
        response1.data.response.data.boards[0].items_page.previous_month_items.forEach(
          (item) => {
            if (
              item.name.toLowerCase() ===
              location.state.filterKey.value.toLowerCase()
            ) {
              setPreviousData(item.column_values);
              setNameValue({ ...nameValue, previousName: item.name });
            }
          }
        );
      } else {
      }

      if (response.success) {
        response.data.response.forEach((item) => {
          if (item.id.toString() === location.state.profileId.toString()) {
            tempData = Object.entries(
              JSON.parse(item.governify_service_report)
            );
          }
        });
      }

      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i][0] !== "recommendation_text") {
          tempContainerData.push(tempData[i][1]);
        }
      }

      setContainers(tempContainerData);
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

    // Round stepSize up to the nearest multiple of 50
    stepSize = Math.ceil(stepSize / 50) * 50;

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "1252px" }}>
      {containers.map((container, containerIndex) => (
        <ResizableBox
          key={container.id}
          width={"100%"}
          height={container.height}
          minConstraints={[200, 150]}
          maxConstraints={[Infinity, 2000]}
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

            {container.boxes.map((box, boxIndex) => (
              <Draggable
                bounds="parent"
                key={box.id}
                handle=".drag-handle"
                position={box.position}
                grid={[25, 25]}
                scale={1}
                onStop={(e, data) =>
                  handleDragStop(e, data, containerIndex, boxIndex)
                }
              >
                <div
                  style={{ position: "absolute" }}
                  onMouseEnter={() =>
                    toggleDragHandleVisibility(containerIndex, boxIndex, true)
                  }
                  onMouseLeave={() =>
                    toggleDragHandleVisibility(containerIndex, boxIndex, false)
                  }
                >
                  {containerIndex === 0 && box.type === "Text Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
                        window.innerHeight - box.position.y,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                              fontWeight: "400",
                              color: "#6d7175",
                              marginBottom: "6px",
                            }}
                          >
                            {getColumnTitleForTextChart(box.column1)}
                          </p>
                          <p
                            style={{
                              width: "100%",
                              textAlign: "left",
                              fontSize: "24px",
                              fontWeight: "600",
                              color: "#202223",
                              marginBottom: "6px",
                            }}
                          >
                            {getColumnValueForTextChart(box.column1)}
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
                              background: hexToRgba(box.color, "0.2"),
                              padding: "6px 12px",
                              color: box.color,
                            }}
                          >
                            {getColumnValueForTextChart(box.column2)}
                          </p>
                        </div>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 0 && box.type === "Pie Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                        title={box.heading}
                        dataset={getPieChartDataSet(box)}
                        bgSet={getPieChartBg(box)}
                        pieChartLabel={getPieChartLabel(box)}
                        borderColorSetPie={getPieChartBorder(box)}
                        description={box.description}
                      />
                    </ResizableBox>
                  ) : containerIndex === 0 && box.type === "Bar Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                      {box.horizontal ? (
                        <BarChartHorizontal
                          dataset={getDataSetForVerticalBarChart(box)}
                          stepsize={getStepSizeForVerticalBarChart(box)}
                          max={getMaxForVerticalBarChart(box)}
                          title={box.heading}
                          description={box.description}
                        />
                      ) : (
                        <BarChartVertical
                          dataset={getDataSetForVerticalBarChart(box)}
                          stepsize={getStepSizeForVerticalBarChart(box)}
                          max={getMaxForVerticalBarChart(box)}
                          title={box.heading}
                          description={box.description}
                        />
                      )}
                    </ResizableBox>
                  ) : (
                    <></>
                  )}

                  {containerIndex === 1 && box.type === "Bar Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                      {box.horizontal ? (
                        <BarChartHorizontal
                          dataset={getDataSetForHorizontalBarChart(box)}
                          stepsize={getStepSizeForVerticalBarChart(box)}
                          max={getMaxForVerticalBarChart(box)}
                          title={box.heading}
                          description={box.description}
                        />
                      ) : (
                        <BarChartVertical
                          dataset={getDataSetForVerticalBarChart(box)}
                          stepsize={getStepSizeForVerticalBarChart(box)}
                          max={getMaxForVerticalBarChart(box)}
                          title={box.heading}
                          description={box.description}
                        />
                      )}
                    </ResizableBox>
                  ) : containerIndex === 1 && box.type === "Text Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
                        window.innerHeight - box.position.y,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                              fontWeight: "400",
                              color: "#6d7175",
                              marginBottom: "6px",
                            }}
                          >
                            {getColumnTitleForTextChart(box.column1)}
                          </p>
                          <p
                            style={{
                              width: "100%",
                              textAlign: "left",
                              fontSize: "24px",
                              fontWeight: "600",
                              color: "#202223",
                              marginBottom: "6px",
                            }}
                          >
                            {getColumnValueForTextChart(box.column1)}
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
                              background: hexToRgba(box.color, "0.2"),
                              padding: "6px 12px",
                              color: box.color,
                            }}
                          >
                            {getColumnValueForTextChart(box.column2)}
                          </p>
                        </div>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 1 && box.type === "Pie Chart" ? (
                    <ResizableBox
                      width={box.size.width}
                      height={box.size.height}
                      minConstraints={[100, 100]}
                      maxConstraints={[
                        window.innerWidth - box.position.x,
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
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {box.showDragHandle && (
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
                        title={box.heading}
                        dataset={getPieChartDataSet(box)}
                        bgSet={getPieChartBg(box)}
                        pieChartLabel={getPieChartLabel(box)}
                        borderColorSetPie={getPieChartBorder(box)}
                        description={box.description}
                      />
                    </ResizableBox>
                  ) : (
                    <></>
                  )}
                </div>
              </Draggable>
            ))}
          </div>
        </ResizableBox>
      ))}

      <div>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
