import { BarChartHorizontal } from "./BarChartHorizontal";
import { BarChartVertical } from "./BarChartVertical";
import { PieChart } from "./PieChart";



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
  getTooltipData
}) => {



  return (
    <div style={{ marginTop: "20px" }}>
     

      <div  style={{paddingLeft:"20px" , paddingRight:"20px"}}>
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
                     fontFamily:"Graphie-SemiBold"
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
                                fontWeight: "600",
                                color: "#6d7175",
                                marginBottom: "6px",
                                fontFamily: "Graphie-Thin",
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
                          />
                        ) : (
                          <BarChartVertical
                            dataset={getDataSetForVerticalBarChart(subItem)}
                            stepsize={getStepSizeForVerticalBarChart(subItem)}
                            max={getMaxForVerticalBarChart(subItem)}
                            title={subItem.heading}
                            description={subItem.description}
                            toolTipData={getTooltipData(subItem)}
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
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
