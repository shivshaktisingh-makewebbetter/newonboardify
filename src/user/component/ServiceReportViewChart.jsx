import {
  FallOutlined,
  InfoCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { BarChartHorizontal } from "../../common/BarChartHorizontal";
import { BarChartVertical } from "../../common/BarChartVertical";
import { PieChart } from "../../common/PieChart";
import { Tooltip } from "antd";
import { CustomTooltip } from "./CustomTooltip";

export const ServiceReportViewChart = ({
  getPieChartDataSet,
  getPieChartBg,
  getPieChartLabel,
  getPieChartBorder,
  getDataSetForVerticalBarChart,
  getStepSizeForVerticalBarChart,
  getMaxForVerticalBarChart,
  hexToRgba,
  serviceReportViewData,
  getColumnTitleForTextChart,
  getColumnValueForTextChart,
  getTooltipData,
  previousData,
  getPreviousMonthChange,
  getBgSquareColor,
  getColumnPercentage,
  getDescriptionForColumn,
  mobileView,
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {mobileView ? (
        <div>
          {serviceReportViewData.map((item) => {
            return (
              <div style={{ marginTop: "20px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#818181",
                    textAlign: "left",
                    marginBottom: "0px",
                    fontFamily: "Graphie-SemiBold",
                  }}
                >
                  {item.title}
                </p>
                <div
                  style={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {item.boxes.map((subItem) => {
                    const commonStyles = {
                      width: "100%", // Full width for responsiveness
                   
                      background: "white",
                      border: "1px solid #E3E3E3",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "20px", // Adjusted margin for spacing
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative", // Use relative for block layout
                    };

                    if (subItem.type === "Text Chart") {
                      return (
                        <div style={commonStyles}>
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
                        </div>
                      );
                    }

                    if (subItem.type === "Bar Chart") {
                      return (
                        <div style={commonStyles}>
                          {subItem.horizontal ? (
                            <BarChartHorizontal
                              dataset={getDataSetForVerticalBarChart(subItem)}
                              stepsize={getStepSizeForVerticalBarChart(subItem)}
                              max={getMaxForVerticalBarChart(subItem)}
                              title={subItem.heading}
                              description={subItem.description}
                              toolTipData={getTooltipData(subItem)}
                              previousData={previousData}
                              mobileView={mobileView}
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
                              mobileView={mobileView}
                            />
                          )}
                        </div>
                      );
                    }

                    if (subItem.type === "Pie Chart") {
                      const title = subItem.heading;
                      const dataset = getPieChartDataSet(subItem);
                      const bgSet = getPieChartBg(subItem);
                      const pieChartLabel = getPieChartLabel(subItem);
                      const borderColorSetPie = getPieChartBorder(subItem);
                      const description = subItem.description;

                      return (
                        <div style={commonStyles}>
                          <PieChart
                            title={title}
                            dataset={dataset}
                            bgSet={bgSet}
                            pieChartLabel={pieChartLabel}
                            borderColorSetPie={borderColorSetPie}
                            description={description}
                            mobileView={mobileView}
                          />
                        </div>
                      );
                    }

                    if (subItem.type === "Value Chart") {
                      const description = getDescriptionForColumn(
                        subItem.column
                      );
                      const changePreviousMonth = getPreviousMonthChange(
                        subItem.column
                      );

                      return (
                        <div style={commonStyles}>
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
                                    <span> {changePreviousMonth + " %"} </span>
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
                        </div>
                      );
                    }

                    if (subItem.type === "Multi Value Chart") {
                      return (
                        <div style={commonStyles}>
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
                        </div>
                      );
                    }

                    if (subItem.type === "Recommendation Chart") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            position: "absolute",
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              textAlign: "left",
                              fontWeight: "400",
                              fontSize: "16px",
                              fontFamily: "Graphie-Book",
                              color: "#202223",
                            }}
                          >
                            {getColumnValueForTextChart(subItem.column)}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {serviceReportViewData.map((item) => {
            return (
              <div style={{ height: item.height, marginTop: "20px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#818181",
                    textAlign: "left",
                    marginBottom: "0px",
                    fontFamily: "Graphie-SemiBold",
                  }}
                >
                  {item.title}
                </p>
                <div style={{ position: "relative" }}>
                  {item.boxes.map((subItem) => {
                    if (subItem.type === "Text Chart") {
                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                        </div>
                      );
                    }

                    if (subItem.type === "Bar Chart") {
                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {subItem.horizontal ? (
                            <BarChartHorizontal
                              dataset={getDataSetForVerticalBarChart(subItem)}
                              stepsize={getStepSizeForVerticalBarChart(subItem)}
                              max={getMaxForVerticalBarChart(subItem)}
                              title={subItem.heading}
                              description={subItem.description}
                              toolTipData={getTooltipData(subItem)}
                              previousData={previousData}
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
                            />
                          )}
                        </div>
                      );
                    }

                    if (subItem.type === "Pie Chart") {
                      const title = subItem.heading;
                      const dataset = getPieChartDataSet(subItem);
                      const bgSet = getPieChartBg(subItem);
                      const pieChartLabel = getPieChartLabel(subItem);
                      const borderColorSetPie = getPieChartBorder(subItem);
                      const description = subItem.description;

                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <PieChart
                            title={title}
                            dataset={dataset}
                            bgSet={bgSet}
                            pieChartLabel={pieChartLabel}
                            borderColorSetPie={borderColorSetPie}
                            description={description}
                          />
                        </div>
                      );
                    }

                    if (subItem.type === "Value Chart") {
                      const description = getDescriptionForColumn(
                        subItem.column
                      );
                      const changePreviousMonth = getPreviousMonthChange(
                        subItem.column
                      );
                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                                    <span> {changePreviousMonth + " %"} </span>
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
                        </div>
                      );
                    }

                    if (subItem.type === "Multi Value Chart") {
                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "44px",
                          }}
                        >
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
                        </div>
                      );
                    }

                    if (subItem.type === "Recommendation Chart") {
                      return (
                        <div
                          style={{
                            width: subItem.size.width,
                            height: subItem.size.height,
                            position: "absolute",
                            left: subItem.position.x,
                            top: subItem.position.y,
                            background: "white",
                            border: "1px solid #E3E3E3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              textAlign: "left",
                              fontWeight: "400",
                              fontSize: "16px",
                              fontFamily: "Graphie-Book",
                              color: "#202223",
                            }}
                          >
                            {getColumnValueForTextChart(subItem.column)}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
