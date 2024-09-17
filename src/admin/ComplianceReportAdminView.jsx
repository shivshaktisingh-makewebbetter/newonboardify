import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import { DragOutlined } from "@ant-design/icons";
import {
  getProfileListing,
  saveAdminComplianceView,
} from "../apiservice/ApiService";
import { useLocation } from "react-router-dom";
import { BarChartHorizontal } from "../common/BarChartHorizontal";
import { BarChartVertical } from "../common/BarChartVertical";
import { Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
const LOCAL_STORAGE_KEY = "draggableResizableStateCompliance"; // Key to save data in localStorage

export const ComplianceReportAdminView = () => {
  const location = useLocation();
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

  // Save the current state to localStorage
  const saveStateToLocalStorage = (newContainers) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContainers));
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
    saveStateToLocalStorage(newContainers);
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
    saveStateToLocalStorage(newContainers);
  };

  // Handle resizing of the container itself
  const handleContainerResize = (e, { size }, containerIndex) => {
    const newContainers = containers.map((container, i) =>
      i === containerIndex ? { ...container, height: size.height } : container
    );
    setContainers(newContainers);
    saveStateToLocalStorage(newContainers);
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
      if (response.success) {
        response.data.response.forEach((item) => {
          if (item.id.toString() === location.state.profileId.toString()) {
            tempData = Object.entries(
              JSON.parse(item.governify_compliance_report)
            );
          }
        });
      }

      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i][0] !== "recommendation_text") {
          tempContainerData.push({ id: i, height: 400, boxes: tempData[i][1] });
        }
      }

      setContainers(tempContainerData);
    } catch (err) {
    } finally {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        setContainers(JSON.parse(savedState));
      }
    }
  };

  const handleSubmit = async () => {
    const payloadData = {
      governify_compliance_report_view: JSON.stringify(containers),
      profile_id: location.state.profileId.toString(),
    };
    try {
      const response = await saveAdminComplianceView(payloadData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {containers.map((container, containerIndex) => (
        <ResizableBox
          key={container.id}
          width={"100%"}
          height={container.height}
          minConstraints={[200, 200]}
          //   maxConstraints={[Infinity, 800]}
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
            {containerIndex === 0 && (
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#818181",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                About Company
              </p>
            )}
            {containerIndex === 1 && (
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#818181",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                Saudization
              </p>
            )}
            {containerIndex === 2 && (
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#818181",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                Visa
              </p>
            )}
            {containerIndex === 3 && (
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#818181",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                Employees
              </p>
            )}

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
                  style={{ position: "absolute", marginTop: "40px" }}
                  onMouseEnter={() =>
                    toggleDragHandleVisibility(containerIndex, boxIndex, true)
                  }
                  onMouseLeave={() =>
                    toggleDragHandleVisibility(containerIndex, boxIndex, false)
                  }
                >
                  {containerIndex === 0 && box.type === "Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ paddingTop: "40px", textAlign: "center" }}>
                        <span>Box {boxIndex + 1}</span>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 0 && box.type === "Pie Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ paddingTop: "40px", textAlign: "center" }}>
                        <span>Box {boxIndex + 1}</span>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 0 && box.type === "Bar Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ paddingTop: "40px", textAlign: "center" }}>
                        <span>Box {boxIndex + 1}</span>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 0 && box.type === "Text Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                          }}
                        >
                          Company Name
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          TASC Outsourcing
                        </p>
                      </div>
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
                        justifyContent: "center",
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
                        <BarChartHorizontal />
                      ) : (
                        <BarChartVertical />
                      )}
                    </ResizableBox>
                  ) : containerIndex === 1 &&
                    box.type === "Multi Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#202223",
                          }}
                        >
                          Saudization Percentage
                        </p>
                        <div
                          style={{
                            marginTop: "15px",
                            border: "1px solid #c9cccf",
                          }}
                        ></div>
                        <div style={{ marginTop: "26px" }}>
                          {box.selectedColumns.map((column, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    background: "#AC71F0",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    color: "#202223",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Saudi Employees
                                </div>
                              </div>
                              <p
                                style={{
                                  fontSize: "45px",
                                  fontWeight: "700",
                                  color: "#202223",
                                }}
                              >
                                75%
                              </p>
                              {box.selectedColumns.length - 1 > index && (
                                <div
                                  style={{
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                    border: "1px solid #c9cccf",
                                  }}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
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
                        justifyContent: "center",
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
                      <div style={{ paddingTop: "40px", textAlign: "center" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                          }}
                        >
                          Company Name
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          TASC Outsourcing
                        </p>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 1 && box.type === "Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                            marginBottom: "8px",
                          }}
                        >
                          Visa Balance
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          205
                        </p>
                      </div>
                    </ResizableBox>
                  ) : (
                    <></>
                  )}

                  {containerIndex === 2 && box.type === "Bar Chart" ? (
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
                        justifyContent: "center",
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
                        <BarChartHorizontal />
                      ) : (
                        <BarChartVertical />
                      )}
                    </ResizableBox>
                  ) : containerIndex === 2 &&
                    box.type === "Multi Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#202223",
                          }}
                        >
                          Saudization Percentage
                        </p>
                        <div
                          style={{
                            marginTop: "15px",
                            border: "1px solid #c9cccf",
                          }}
                        ></div>
                        <div style={{ marginTop: "26px" }}>
                          {box.selectedColumns.map((column, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    background: "#AC71F0",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    color: "#202223",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Saudi Employees
                                </div>
                              </div>
                              <p
                                style={{
                                  fontSize: "45px",
                                  fontWeight: "700",
                                  color: "#202223",
                                }}
                              >
                                75%
                              </p>
                              {box.selectedColumns.length - 1 > index && (
                                <div
                                  style={{
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                    border: "1px solid #c9cccf",
                                  }}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 2 && box.type === "Text Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ paddingTop: "40px", textAlign: "center" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                          }}
                        >
                          Company Name
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          TASC Outsourcing
                        </p>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 2 && box.type === "Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                            marginBottom: "6px",
                          }}
                        >
                          Visa Balance
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          205
                        </p>
                      </div>
                    </ResizableBox>
                  ) : (
                    <></>
                  )}

                  {containerIndex === 3 && box.type === "Bar Chart" ? (
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
                        justifyContent: "center",
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
                        <BarChartHorizontal />
                      ) : (
                        <BarChartVertical />
                      )}
                    </ResizableBox>
                  ) : containerIndex === 3 &&
                    box.type === "Multi Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#202223",
                          }}
                        >
                          Saudization Percentage
                        </p>
                        <div
                          style={{
                            marginTop: "15px",
                            border: "1px solid #c9cccf",
                          }}
                        ></div>
                        <div style={{ marginTop: "26px" }}>
                          {box.selectedColumns.map((column, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    background: "#AC71F0",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    color: "#202223",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Saudi Employees
                                </div>
                              </div>
                              <p
                                style={{
                                  fontSize: "45px",
                                  fontWeight: "700",
                                  color: "#202223",
                                }}
                              >
                                75%
                              </p>
                              {box.selectedColumns.length - 1 > index && (
                                <div
                                  style={{
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                    border: "1px solid #c9cccf",
                                  }}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 3 && box.type === "Text Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ width: "100%", paddingTop: "40px" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                          }}
                        >
                          Company Name
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          TASC Outsourcing
                        </p>
                      </div>
                    </ResizableBox>
                  ) : containerIndex === 3 && box.type === "Value Chart" ? (
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
                        justifyContent: "center",
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
                      <div style={{ width: "100%" }}>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6d7175",
                            marginBottom: "6px",
                          }}
                        >
                          Visa Balance
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#202223",
                          }}
                        >
                          205
                        </p>
                      </div>
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
