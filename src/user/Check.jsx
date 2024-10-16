import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import {
  getAllCustomerData,
  getAllProfileDataByUser,
} from "../apiservice/ApiService";
import { Select } from "antd";
import { EmptyReports } from "../common/EmptyReports";
import { ServiceReportViewChart } from "./component/ServiceReportViewChart";
import { Loader } from "../common/Loader";

export const Check = () => {
  const [serviceOptions, setServiceOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [allColumnTitle, setAllColumnTitle] = useState([]);
  const [allServiceData, setAllServiceData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [serviceReportViewData, setServiceReportViewData] = useState([]);
  const [loading, setLoading] = useState(false);

  function getMonthAndYear(dateString) {
    const inputDate = new Date(dateString);

    // Get the full month name
    const options = { year: "numeric", month: "long" };
    const result = inputDate.toLocaleDateString("en-US", options);

    return result;
  }

  function reorderByDate(arr, key) {
    return arr.sort((a, b) => {
      // Parse the date strings into actual Date objects
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);

      // Compare dates in descending order (latest to oldest)
      return dateB - dateA;
    });
  }

  const fetchProfiledata = async () => {
    setLoading(true);
    const tempFilteredData = [];
    let tempAllServiceData = [];
    const tempServiceOptions = [];
    const tempDateOptions = [];
    let noDataService = false;
    try {
      const response = await getAllProfileDataByUser();
      console.log(response , 'response');

      if (response.success) {

        ///set service options here
        if(response.data.response[0].services.length > 0){
          let tempNewOptions = [];
          response.data.response[0].services.forEach((item) => {
            tempNewOptions.push({
              label: item.title,
              value: item.id,
              boardId: item.board_id,
            });
          });
        
          setServiceOptions(tempNewOptions);
        }


        if (response.data.response.length > 0) {
          tempAllServiceData = response.data.response[0].services;
          const serviceFilterKeyData = JSON.parse(
            tempAllServiceData[0].onboardify_service_filter_key
          );

          const serviceChartData = JSON.parse(
            tempAllServiceData[0].onboardify_service_report_view
          );

          if (serviceChartData === null) {
            noDataService = true;
          }

          if (
            serviceFilterKeyData.key === null ||
            serviceFilterKeyData.value === null ||
            serviceFilterKeyData.date_key === null
          ) {
            noDataService = true;
          }
          setAllServiceData(tempAllServiceData);

          if (tempAllServiceData.length > 0) {
            tempAllServiceData.forEach((item) => {
              tempServiceOptions.push({
                label: item.title,
                value: item.id,
                boardId: item.board_id,
              });
            });
          }

          const serviceResponse = await getAllCustomerData(
            tempServiceOptions[0].boardId
          );
          if (serviceResponse.success && serviceChartData !== null) {
            setServiceReportViewData(serviceChartData);
            setSelectedRequest(tempServiceOptions[0].value);
            setAllColumnTitle(
              serviceResponse.data.response.data.boards[0].columns
            );

            if (
              serviceFilterKeyData.key !== null &&
              serviceFilterKeyData.value !== null
            ) {
              if (serviceFilterKeyData.key === "name") {
                serviceResponse.data.response.data.boards[0].items_page.items.forEach(
                  (item) => {
                    if (
                      item.name.toLowerCase() ===
                      serviceFilterKeyData.value.toLowerCase()
                    ) {
                      tempFilteredData.push(item);
                    }
                  }
                );
              } else {
                serviceResponse.data.response.data.boards[0].items_page.items.forEach(
                  (item) => {
                    item.column_values.forEach((subItem) => {
                      if (
                        subItem.id === serviceFilterKeyData.key &&
                        subItem.text.toLowerCase() ===
                          serviceFilterKeyData.value.toLowerCase()
                      ) {
                        tempFilteredData.push(item);
                      }
                    });
                  }
                );
              }
            } else {
              noDataService = true;
            }

            if (tempFilteredData.length > 0) {
              tempFilteredData.forEach((item) => {
                item.column_values.forEach((subItem) => {
                  if (subItem.id === serviceFilterKeyData.date_key) {
                    tempDateOptions.push({
                      label: getMonthAndYear(subItem.text),
                      value: getMonthAndYear(subItem.text),
                      data: item.column_values,
                      name: item.name,
                    });
                  }
                });
              });
            } else {
              noDataService = true;
            }

            setFinalData(tempFilteredData);
          }
          let newDateDataOptions = reorderByDate(tempDateOptions, "value");
          setSelectedDate(newDateDataOptions[0].value);
          setDateOptions(newDateDataOptions);
          setCurrentData(tempDateOptions[0].data);
          setPreviousData(tempDateOptions[1].data);
          setServiceOptions(tempServiceOptions);
        }

   
       
      }
    } catch (err) {
    } finally {
      setNoData(noDataService);
      setLoading(false);
    }
  };

  const getColumnValueForTextChart = (id) => {
    let tempValue = "";

    if (id === "name") {
      // tempValue = nameValue.currentName;
    } else {
      currentData.forEach((item) => {
        if (item.id === id) {
          tempValue = item.text;
        }
      });
    }
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

  const getDataSetForVerticalBarChart = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push({
        label: getColumnTitleForTextChart(item),
        data: [getColumnValueForTextChart(item)],
        backgroundColor: getBgColorForBarChart(subItem, item),
        borderColor: getBorderColorForBarChart(subItem, item),
        borderRadius: {
          topLeft: 5, // Set the top-left corner radius
          topRight: 5, // Set the top-right corner radius
          bottomLeft: 0, // No radius for the bottom-left corner
          bottomRight: 0, // No radius for the bottom-right corner
        },
        borderSkipped: false,
        borderWidth: 1,
        // barThickness: 1
      });
    });

    return tempData;
  };

  const getDataSetForHorizontalBarChart = (subItem) => {
    let tempData = [];
    subItem.selectedColumns.forEach((item) => {
      tempData.push({
        label: getColumnTitleForTextChart(item),
        data: [getColumnValueForTextChart(item)],
        backgroundColor: getBgColorForBarChart(subItem, item),
        borderColor: getBorderColorForBarChart(subItem, item),
        borderRadius: {
          topLeft: 0, // Set the top-left corner radius
          topRight: 5, // Set the top-right corner radius
          bottomLeft: 0, // No radius for the bottom-left corner
          bottomRight: 5, // No radius for the bottom-right corner
        },
        borderSkipped: false,
        borderWidth: 1,
        // barThickness: 1
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

  function getRandomColor() {
    // Generate a random integer between 0 and 255
    return Math.floor(Math.random() * 256);
  }

  function hexToRgba(hex, opacity = 1) {
    // Check if hex is undefined or invalid
    if (!hex || typeof hex !== "string" || hex.length !== 7 || hex[0] !== "#") {
      // Return a random RGBA color
      return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${opacity})`;
    }

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

  const getColumnTitleForTextChart = (id) => {
    let tempValue = "";

    allColumnTitle.forEach((item) => {
      if (item.id === id) {
        tempValue = item.title;
      }
    });

    return tempValue;
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

  const handleChangeService = async (e) => {
    setLoading(true);
    setSelectedRequest(e);
    let tempSelectedServiceData = {};
    allServiceData.forEach((item) => {
      if (item.id === e) {
        tempSelectedServiceData = item;
      }
    });
    let tempFilterKey = JSON.parse(
      tempSelectedServiceData.onboardify_service_filter_key
    );
    let tempServiceViewData = JSON.parse(
      tempSelectedServiceData.onboardify_service_report_view
    );
    let tempBoardId = tempSelectedServiceData.board_id;
    let tempFilteredData = [];
    let tempDateOptions = [];

    if (
      tempFilterKey.key === null ||
      tempFilterKey.value === null ||
      tempFilterKey.date_key === null ||
      tempServiceViewData === null
    ) {
      setNoData(true);
    } else {
      try {
        const serviceResponse = await getAllCustomerData(tempBoardId);
        if (!serviceResponse.success) {
          setNoData(true);
        } else {
          setServiceReportViewData(tempServiceViewData);
          setAllColumnTitle(
            serviceResponse.data.response.data.boards[0].columns
          );
          if (tempFilterKey.key === "name") {
            serviceResponse.data.response.data.boards[0].items_page.items.forEach(
              (item) => {
                if (
                  item.name.toLowerCase() === tempFilterKey.value.toLowerCase()
                ) {
                  tempFilteredData.push(item);
                }
              }
            );
          } else {
            serviceResponse.data.response.data.boards[0].items_page.items.forEach(
              (item) => {
                item.column_values.forEach((subItem) => {
                  if (subItem.text !== null) {
                    if (
                      subItem.id === tempFilterKey.key &&
                      subItem.text.toLowerCase() ===
                        tempFilterKey.value.toLowerCase()
                    ) {
                      tempFilteredData.push(item);
                    }
                  }
                });
              }
            );
          }

          if (tempFilteredData.length > 0) {
            tempFilteredData.forEach((item) => {
              item.column_values.forEach((subItem) => {
                if (subItem.id === tempFilterKey.date_key) {
                  tempDateOptions.push({
                    label: getMonthAndYear(subItem.text),
                    value: getMonthAndYear(subItem.text),
                    data: item.column_values,
                    name: item.name,
                  });
                }
              });
            });
          }

          setFinalData(tempFilteredData);
          let newDateDataOptions = reorderByDate(tempDateOptions, "value");
          setSelectedDate(newDateDataOptions[0].value);
          setDateOptions(newDateDataOptions);
          setCurrentData(tempDateOptions[0].data);
          setPreviousData(tempDateOptions[1].data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeDate = async (e) => {
    dateOptions.forEach((item, index) => {
      if (item.value === e) {
        setCurrentData(item.data);
        if (index === dateOptions.length - 1) {
          setPreviousData([]);
        } else {
          setPreviousData(dateOptions[index + 1].data);
        }
      }
    });
    setSelectedDate(e);
  };

  useEffect(() => {
    fetchProfiledata();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Overall Status"}
          subheading="Stay informed and in control of the overall status of your onboarding requests"
          forHome={true}
        />
      </div>
      {loading && <Loader />}
      <div
        style={{
          marginTop: "12px",
          padding: "24px",
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #858b932E",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "33.6px",
            color: "#202223",
            fontFamily: "Graphie-SemiBold",
          }}
        >
          Reports
        </span>
        <div
          style={{
            display: "flex",
            gap: "20px",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <Select
            placeholder="Select Service"
            onChange={handleChangeService}
            options={serviceOptions}
            value={selectedRequest || undefined}
          />

          <Select
            placeholder="Select Date"
            onChange={handleChangeDate}
            options={dateOptions}
            value={selectedDate || undefined}
          />
        </div>
      </div>
      {noData ? (
        <EmptyReports />
      ) : (
        <ServiceReportViewChart
          getPieChartDataSet={getPieChartDataSet}
          getPieChartBg={getPieChartBg}
          getPieChartLabel={getPieChartLabel}
          getPieChartBorder={getPieChartBorder}
          getDataSetForVerticalBarChart={getDataSetForVerticalBarChart}
          getStepSizeForVerticalBarChart={getStepSizeForVerticalBarChart}
          getMaxForVerticalBarChart={getMaxForVerticalBarChart}
          hexToRgba={hexToRgba}
          serviceReportViewData={serviceReportViewData}
          getColumnTitleForTextChart={getColumnTitleForTextChart}
          getColumnValueForTextChart={getColumnValueForTextChart}
          getTooltipData={getTooltipData}
          previousData={previousData}
          getPreviousMonthChange={getPreviousMonthChange}
          getBgSquareColor={getBgSquareColor}
          getColumnPercentage={getColumnPercentage}
          getDescriptionForColumn={getDescriptionForColumn}
        />
      )}
    </div>
  );
};
