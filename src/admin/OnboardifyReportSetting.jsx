import { LeftOutlined } from "@ant-design/icons";
import { Button, Collapse, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ServiceReportSettings } from "./ServiceReportSettings";
import {
  getAllColumnsOfBoard,
  getServicesByProfileId,
  onboardifyFilterKeyAssociationService,
  onboardifyServiceReportAdminSetting,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";

export const OnboardifyReportSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [previousViewDataService, setPreviousViewDataService] = useState([]);
  const [columnOptionsService, setColumnOptionsService] = useState([]);
  const [dateOptionsService, setDateOptionsService] = useState([]);
  const [selectedFilterColumnService, setSelectedFilterColumnService] =
    useState({
      key: undefined,
      value: "",
      date_key: undefined,
    });
  const [serviceNewSection, setServiceNewSection] = useState([]);
  const [serviceEditedSection, setServiceEditedSection] = useState([]);
  const [serviceDeletedSection, setServiceDeletedSection] = useState([]);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleSelectDateColumnService = (e) => {
    setSelectedFilterColumnService({
      ...selectedFilterColumnService,
      date_key: e,
    });
  };

  const handleChangeFilterValueService = (e) => {
    setSelectedFilterColumnService({
      ...selectedFilterColumnService,
      value: e.target.value,
    });
  };

  const handleSelectColumnService = (e) => {
    let tempObj = { ...selectedFilterColumnService };
    tempObj.key = e;
    tempObj.value = "";
    setSelectedFilterColumnService(tempObj);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const getCollapseSubItemsService = () => {
    return [
      {
        key: "1",
        label: "Service General Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>Select Date Column : </span>
              <Select
                showSearch
                allowClear
                style={{
                  width: "50%",
                }}
                placeholder="Please select Date Column"
                onChange={handleSelectDateColumnService}
                options={dateOptionsService}
                value={selectedFilterColumnService.date_key || undefined}
                filterOption={filterOption}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>
                Select Filter Column :{" "}
              </span>
              <Select
                showSearch
                allowClear
                style={{
                  width: "50%",
                }}
                placeholder="Please select"
                onChange={handleSelectColumnService}
                options={columnOptionsService}
                value={selectedFilterColumnService.key || undefined}
                filterOption={filterOption}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedFilterColumnService.key !== undefined &&
                selectedFilterColumnService.key !== null &&
                selectedFilterColumnService.key.length > 0 && (
                  <Input
                    addonBefore="Filter Value"
                    style={{ width: "50%" }}
                    value={
                      selectedFilterColumnService.value === undefined
                        ? ""
                        : selectedFilterColumnService.value
                    }
                    onChange={handleChangeFilterValueService}
                  />
                )}
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: "Service Chart Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <ServiceReportSettings
              sectionData={sectionData}
              setSectionData={setSectionData}
              columnOptions={columnOptionsService}
              serviceNewSection={serviceNewSection}
              serviceEditedSection={serviceEditedSection}
              serviceDeletedSection={serviceDeletedSection}
              setServiceNewSection={setServiceNewSection}
              setServiceEditedSection={setServiceEditedSection}
              setServiceDeletedSection={setServiceDeletedSection}
            />
          </div>
        ),
      },
    ];
  };

  const getPreviousOnboardifyServiceChartData = async () => {
    setLoading(true);
    try {
      const response = await getServicesByProfileId(location.state.profileId);
      if (response.success) {
        response.data.response[0].services.length > 0 &&
          response.data.response[0].services.forEach((item) => {
            if (item.id === location.state.serviceId) {
              if (!(JSON.parse(item.onboardify_service_filter_key) === null)) {
                setSelectedFilterColumnService(
                  JSON.parse(item.onboardify_service_filter_key)
                );
              }

              if (item.onboardify_service_report === null) {
                setSectionData([
                  {
                    id: 0,
                    title: "About Company",
                    height: 400,
                    boxes: [],
                  },
                  {
                    id: 1,
                    title: "Insights",
                    height: 800,
                    boxes: [],
                  },
                ]);
              } else {
                setSectionData(JSON.parse(item.onboardify_service_report));
              }

              if (!(item.onboardify_service_report_view === null)) {
                setPreviousViewDataService(
                  JSON.parse(item.onboardify_service_report_view)
                );
              }
            }
          });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const copyObjectsBasedOnTitle = (arr1, arr2) => {
    return arr1.map((obj1) => {
      // Find the corresponding object from arr2 that matches the title
      const matchingObj = arr2.find((obj2) => obj2.title === obj1.title);
      // If a match is found, copy it; otherwise, keep the original object from arr1
      return matchingObj ? { ...matchingObj } : { ...obj1 };
    });
  };

  const delayFun = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const getChartDataFormatService = (data) => {
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
          position.y = position.y + 125;
        } else if (subItem.type === "Bar Chart") {
          subItem.size = { width: 751, height: 480 };
          subItem.position = currentPos;
          position.y = position.y + 500;
        } else if (subItem.type === "Pie Chart") {
          subItem.size = { width: 365, height: 425 };
          subItem.position = currentPos;
          position.y = position.y + 450;
        } else if (subItem.type === "Text Chart") {
          subItem.size = { width: 360, height: 100 };
          subItem.position = currentPos;
          position.y = position.y + 125;
        } else if (subItem.type === "Multi Value Chart") {
          subItem.size = { width: 366, height: 480 };
          subItem.position = currentPos;
          position.y = position.y + 505;
        } else if (subItem.type === "Recommendation Chart") {
          subItem.size = { width: 800, height: 300 };
          subItem.position = currentPos;
          position.y = position.y + 325;
        }
      });
      item.height = position.y + 40;
    });

    if (previousViewDataService.length === 0) {
      return tempData;
    } else {
      if (serviceNewSection.length === 0 && serviceEditedSection.length === 0) {
        let previousData = [...previousViewDataService];
        const finalArray = copyObjectsBasedOnTitle(tempData, previousData);
        return finalArray;
      } else {
        let previousData = [...previousViewDataService];
        const filteredData = previousData.filter(
          (item) => !serviceDeletedSection.includes(item.title.trim())
        );
        const newTempData = [];
        filteredData.forEach((item) => {
          if (serviceEditedSection.includes(item.title.trim())) {
            const tempFilteredArray = tempData.filter(
              (subItem) => subItem.title === item.title
            );
            newTempData.push(tempFilteredArray[0]);
          } else {
            newTempData.push(item);
          }
        });

        tempData.forEach((item) => {
          if (serviceNewSection.includes(item.title)) {
            newTempData.push(item);
          }
        });

        const finalArray = copyObjectsBasedOnTitle(tempData, newTempData);
        return finalArray;
      }
    }
  };

  const handleSaveService = async () => {
    const payload = JSON.stringify({
      service_id: location.state.serviceId.toString(),
      onboardify_service_filter_key: {
        key:
          selectedFilterColumnService.key === undefined
            ? null
            : selectedFilterColumnService.key,
        value:
          selectedFilterColumnService.value === undefined
            ? null
            : selectedFilterColumnService.value,
        date_key:
          selectedFilterColumnService.date_key === undefined
            ? null
            : selectedFilterColumnService.date_key,
      },
    });

    const payload1 = {
      service_id: location.state.serviceId.toString(),
      onboardify_service_report: JSON.stringify(
        getChartDataFormatService(sectionData)
      ),
    };
    setLoading(true);
    try {
      const response = await onboardifyFilterKeyAssociationService(payload);
      await delayFun();
      const response1 = await onboardifyServiceReportAdminSetting(payload1);
      if (response.success && response1.success) {
        toast.success("Onboardify Service Settings Updated!");
      }
      if (!response.success) {
        toast.error(response.message);
      }

      if (!response1.success) {
        toast.error(response1.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      sessionStorage.removeItem('draggableResizableStateServiceOnboardify');
      setLoading(false);
    }
  };

  const getAllColumnsOfSelectedBoard = async () => {
    let tempData = [];
    let tempDateData = [];
    try {
      const response = await getAllColumnsOfBoard(location.state.boardId);
      if (response.success) {
        response.data.response.length > 0 &&
          response.data.response.forEach((item) => {
            tempData.push({ label: item.title, value: item.id });
            if (item.type === "date") {
              tempDateData.push({ label: item.title, value: item.id });
            }
          });

        setColumnOptionsService(tempData);
        setDateOptionsService(tempDateData);
      }
    } catch (err) {
    } finally {
    }
  };

  const navigateToOnboardifyServiceReportView = () => {
    const dataToPass = {
      boardId: location.state.boardId,
      serviceId: location.state.serviceId,
      filterKey: selectedFilterColumnService,
      profileId: location.state.profileId,
    };

    navigate("/admin/onboardifyServiceReportAdminView", { state: dataToPass });
  };

  useEffect(() => {
    getAllColumnsOfSelectedBoard();
    getPreviousOnboardifyServiceChartData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
          marginTop: "20px",
        }}
      >
        <Button icon={<LeftOutlined />} onClick={handleBackNavigation}></Button>
      </div>
      {loading && <Loader />}

      <div style={{ marginTop: "20px" }}>
        <Collapse
          defaultActiveKey={["1", "2"]}
          size="small"
          items={[
            {
              key: "1",
              label: "Service Report Setting",
              children: (
                <>
                  <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                    items={getCollapseSubItemsService()}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button onClick={handleSaveService}>Save</Button>
                    <Button onClick={navigateToOnboardifyServiceReportView}>
                      View Report
                    </Button>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};
