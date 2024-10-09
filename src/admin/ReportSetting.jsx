import { useEffect, useState } from "react";
import { Button, Collapse, Input, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Hero } from "../components/Hero";
import {
  getAllBoards,
  getAllColumnsOfBoard,
  getProfileListing,
  governifyAdminTableSettings,
  governifyComplianceBoardAssociation,
  governifyComplianceReportAdminSetting,
  governifyFilterKeyAssociationCompliance,
  governifyFilterKeyAssociationService,
  governifyServiceBoardAssociation,
  governifyServiceReportAdminSetting,
  saveAdminComplianceView,
  saveAdminServiceView,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";
import { LeftOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ComplianceReportSettings } from "./ComplianceReportSettings";
import { ServiceReportSettings } from "./ServiceReportSettings";

export const ReportSettings = () => {
  const location = useLocation();
  const [allBoardId, setAllBoardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnOptionsCompliance, setColumnOptionsCompliance] = useState([]);
  const [columnOptionsService, setColumnOptionsService] = useState([]);
  const [dateOptionsCompliance, setDateOptionsCompliance] = useState([]);
  const [dateOptionsService, setDateOptionsService] = useState([]);
  const [selectedFilterColumnService, setSelectedFilterColumnService] =
    useState({
      key: undefined,
      value: "",
      date_key: undefined,
    });
  const [selectedFilterColumnCompliance, setSelectedFilterColumnCompliance] =
    useState({
      key: undefined,
      value: "",
      date_key: undefined,
    });
  const [selectedBoardIdService, setSelectedBoardIdService] =
    useState(undefined);
  const [selectedTableColumnsCompliance, setSelectedTableColumnsCompliance] =
    useState([]);
  const [selectedBoardIdCompliance, setSelectedBoardIdCompliance] =
    useState(undefined);
  const [sectionDataCompliance, setSectionDataCompliance] = useState([]);
  const [sectionDataServies, setSectionDataServices] = useState([]);

  const [complianceNewSection, setComplianceNewSection] = useState([]);
  const [complianceEditedSection, setComplianceEditedSection] = useState([]);
  const [complianceDeletedSection, setComplianceDeletedSection] = useState([]);
  const [previousViewDataCompliance, setPreviousViewDataCompliance] = useState(
    []
  );

  const [serviceNewSection, setServiceNewSection] = useState([]);
  const [serviceEditedSection, setServiceEditedSection] = useState([]);
  const [serviceDeletedSection, setServiceDeletedSection] = useState([]);
  const [previousViewDataService, setPreviousViewDataService] = useState([]);

  const navigate = useNavigate();

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const navigateToReportView = (type) => {
    const dataToPass = {
      boardId:
        type === "service" ? selectedBoardIdService : selectedBoardIdCompliance,
      profileId: location.state,
      filterKey:
        type === "service"
          ? selectedFilterColumnService
          : selectedFilterColumnCompliance,
    };

    if (type === "compliance") {
      navigate("/admin/complianceReportAdminView", { state: dataToPass });
    }

    if (type === "service") {
      navigate("/admin/serviceReportAdminView", { state: dataToPass });
    }
  };

  const getListOfAllBoard = async () => {
    let selectedBoardIdCompliance = "";
    let selectedBoardIdService = "";
    let tempBoardIds = [];
    setLoading(true);
    try {
      const response = await getAllBoards();

      const response1 = await getProfileListing();
      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (item.id === location.state) {
            const tempDataCompliance = JSON.parse(
              item.governify_compliance_report
            );
            const tempViewDataCompliance = JSON.parse(
              item.governify_compliance_report_view
            );
            const tempViewDataService = JSON.parse(
              item.governify_service_report_view
            );
            const tempComplianceTableData = JSON.parse(
              item.governify_table_settings
            );
            const tempDataService = JSON.parse(item.governify_service_report);
            const tempBoardIdCompliance = item.governify_compliance_board_id;
            const tempBoardIdService = item.governify_service_board_id;
            const tempComplianceFilterKey = JSON.parse(
              item.governify_compliance_filter_key
            );
            const tempServiceFilterKey = JSON.parse(
              item.governify_service_filter_key
            );

            if (!(tempViewDataCompliance === null)) {
              setPreviousViewDataCompliance(
                JSON.parse(JSON.stringify(tempViewDataCompliance))
              );
            }

            if (!(tempViewDataService === null)) {
              setPreviousViewDataService(
                JSON.parse(JSON.stringify(tempViewDataService))
              );
            }

            if (tempBoardIdService === null) {
              selectedBoardIdService = undefined;
              setSelectedBoardIdService(undefined);
            } else {
              selectedBoardIdService = tempBoardIdService;
              setSelectedBoardIdService(tempBoardIdService);
            }

            if (tempBoardIdCompliance === null) {
              selectedBoardIdCompliance = undefined;
              setSelectedBoardIdCompliance(undefined);
            } else {
              selectedBoardIdCompliance = tempBoardIdCompliance;
              setSelectedBoardIdCompliance(tempBoardIdCompliance);
            }

            if (tempComplianceFilterKey === null) {
              setSelectedFilterColumnCompliance({
                key: "",
                value: "",
                date_key: "",
              });
            } else {
              setSelectedFilterColumnCompliance(tempComplianceFilterKey);
            }

            if (tempServiceFilterKey === null) {
              setSelectedFilterColumnService({
                key: "",
                value: "",
                date_key: "",
              });
            } else {
              setSelectedFilterColumnService(tempComplianceFilterKey);
            }

            if (tempDataCompliance === null) {
              setSectionDataCompliance([
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
            } else {
              setSectionDataCompliance(tempDataCompliance);
            }

            if (tempDataService === null) {
              setSectionDataServices([
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
              setSectionDataServices(tempDataService);
            }

            if (tempComplianceTableData === null) {
              setSelectedTableColumnsCompliance([]);
            } else {
              setSelectedTableColumnsCompliance(tempComplianceTableData);
            }
          }
        });
      }
      if (response.success) {
        response.data.response.boards.forEach((item) => {
          tempBoardIds.push({ label: item.name, value: item.id });
        });

        setAllBoardId(tempBoardIds);
      }
      if (selectedBoardIdCompliance.length > 0) {
        const response3 = await getAllColumnsOfBoard(selectedBoardIdCompliance);
        if (response3.success) {
          const tempData = [];
          const tempDateData = [];

          response3.data.response.forEach((item) => {
            tempData.push({ label: item.title, value: item.id });
            if (item.type === "date") {
              tempDateData.push({ label: item.title, value: item.id });
            }
          });
          setColumnOptionsCompliance(tempData);
          setDateOptionsCompliance(tempDateData);
        }
      }
      if (selectedBoardIdService.length > 0) {
        const response4 = await getAllColumnsOfBoard(selectedBoardIdService);
        if (response4.success) {
          const tempData = [];
          const tempDateData = [];

          response4.data.response.forEach((item) => {
            tempData.push({ label: item.title, value: item.id });
            if (item.type === "date") {
              tempDateData.push({ label: item.title, value: item.id });
            }
          });
          setColumnOptionsService(tempData);
          setDateOptionsService(tempDateData);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeBoardIdCompliance = async (e) => {
    if (e === undefined) {
      setColumnOptionsCompliance([]);
      setSelectedBoardIdCompliance(e);
      setSelectedFilterColumnCompliance({ key: "", value: "", date_key: "" });
      setSectionDataCompliance([]);
      setDateOptionsCompliance([]);
      setSelectedTableColumnsCompliance([]);
      return;
    }
    setLoading(true);
    try {
      let found = false;
      let foundItem;
      const response = await getAllColumnsOfBoard(e);
      const response1 = await getProfileListing();
      if (response.success) {
        const tempData = [];
        const tempDateData = [];

        response.data.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
          if (item.type === "date") {
            tempDateData.push({ label: item.title, value: item.id });
          }
        });
        setColumnOptionsCompliance(tempData);
        setDateOptionsCompliance(tempDateData);
      }

      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (
            item.id === location.state &&
            item.governify_compliance_board_id === e
          ) {
            found = true;
            foundItem = item;
          }
        });

        if (found) {
          const tempDataCompliance = JSON.parse(
            foundItem.governify_compliance_report
          );
          const complianceBoardId = foundItem.governify_compliance_board_id;
          const complianceTableData = JSON.parse(
            foundItem.governify_table_settings
          );
          const complianceFilterData = JSON.parse(
            foundItem.governify_compliance_filter_key
          );

          if (complianceBoardId === null) {
            setSelectedBoardIdCompliance(undefined);
          } else {
            setSelectedBoardIdCompliance(complianceBoardId);
          }

          if (complianceFilterData === null) {
            setSelectedFilterColumnCompliance({
              key: "",
              value: "",
              date_key: "",
            });
          } else {
            setSelectedFilterColumnCompliance(complianceFilterData);
          }

          if (tempDataCompliance === null) {
            setSectionDataCompliance([
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
          } else {
            setSectionDataCompliance(tempDataCompliance);
          }

          if (complianceTableData === null) {
            setSelectedTableColumnsCompliance([]);
          } else {
            setSelectedTableColumnsCompliance(complianceTableData);
          }
        } else {
          setSelectedTableColumnsCompliance([]);
          setSectionDataCompliance([]);
          setSelectedBoardIdCompliance(e);
          setSelectedFilterColumnCompliance({
            key: "",
            value: "",
            date_key: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedBoardIdCompliance(e);
      setLoading(false);
    }
  };

  const handleSelectDateColumnCompliance = (e) => {
    setSelectedFilterColumnCompliance({
      ...selectedFilterColumnCompliance,
      date_key: e,
    });
  };

  const handleSelectTableColumnCompliance = (e) => {
    setSelectedTableColumnsCompliance(e);
  };

  const handleChangeFilterValueCompliance = (e) => {
    setSelectedFilterColumnCompliance({
      ...selectedFilterColumnCompliance,
      value: e.target.value,
    });
  };

  const handleSelectColumnCompliance = (e) => {
    let tempObj = { ...selectedFilterColumnCompliance };
    tempObj.key = e;
    tempObj.value = "";
    setSelectedFilterColumnCompliance(tempObj);
  };

  const delayFun = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleSaveCompliance = async () => {
    setLoading(true);
    const payload = {
      profile_id: location.state.toString(),
      governify_compliance_board_id:
        selectedBoardIdCompliance === undefined
          ? null
          : selectedBoardIdCompliance,
    };
    const payload1 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_table_settings:
        selectedTableColumnsCompliance.length === 0
          ? null
          : selectedTableColumnsCompliance,
    });
    const payload2 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_compliance_filter_key: {
        key:
          selectedFilterColumnCompliance.key === undefined
            ? null
            : selectedFilterColumnCompliance.key,
        value:
          selectedFilterColumnCompliance.value === undefined
            ? null
            : selectedFilterColumnCompliance.value,
        date_key:
          selectedFilterColumnCompliance.date_key === undefined
            ? null
            : selectedFilterColumnCompliance.date_key,
      },
    });

    const payload3 = {
      profile_id: location.state.toString(),
      governify_compliance_report:
        sectionDataCompliance.length > 0
          ? JSON.stringify(getChartDataFormatCompliance(sectionDataCompliance))
          : null,
    };
    const payload4 = {
      governify_compliance_report_view: null,
      profile_id: location.state.toString(),
    };

    try {
      const response = await governifyComplianceBoardAssociation(payload);
      await delayFun();
      const response1 = await governifyAdminTableSettings(payload1);
      await delayFun();
      const response2 = await governifyFilterKeyAssociationCompliance(payload2);
      await delayFun();
      const response3 = await governifyComplianceReportAdminSetting(payload3);

      if (
        response.success &&
        response1.success &&
        response2.success &&
        response3.success
      ) {
        toast.success("Governify Compliance Settings Updated!");
      }
      if (!response.success) {
        toast.error(response.message);
      }

      if (!response1.success) {
        toast.error(response1.message);
      }

      if (!response2.success) {
        toast.error(response2.message);
      }

      if (!response3.success) {
        toast.error(response3.message);
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
      sessionStorage.removeItem("draggableResizableStateCompliance");
    }
  };

  const handleChangeBoardIdService = async (e) => {
    if (e === undefined) {
      setColumnOptionsService([]);
      setSelectedBoardIdService(e);
      setSelectedFilterColumnService({ key: "", value: "", date_key: "" });
      setSectionDataServices([]);
      setDateOptionsService([]);
      return;
    }
    setLoading(true);
    try {
      let found = false;
      let foundItem;
      const response = await getAllColumnsOfBoard(e);
      const response1 = await getProfileListing();
      if (response.success) {
        const tempData = [];
        const tempDateData = [];

        response.data.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
          if (item.type === "date") {
            tempDateData.push({ label: item.title, value: item.id });
          }
        });
        setColumnOptionsService(tempData);
        setDateOptionsService(tempDateData);
      }

      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (
            item.id === location.state &&
            item.governify_service_board_id === e
          ) {
            found = true;
            foundItem = item;
          }
        });

        if (found) {
          const tempDataService = JSON.parse(
            foundItem.governify_service_report
          );
          const serviceBoardId = foundItem.governify_service_board_id;
          const serviceFilterData = JSON.parse(
            foundItem.governify_service_filter_key
          );

          if (serviceBoardId === null) {
            setSelectedBoardIdService(undefined);
          } else {
            setSelectedBoardIdService(serviceBoardId);
          }

          if (serviceFilterData === null) {
            setSelectedFilterColumnService({
              key: "",
              value: "",
              date_key: "",
            });
          } else {
            setSelectedFilterColumnService(serviceFilterData);
          }

          if (tempDataService === null) {
            setSectionDataServices([
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
            setSectionDataServices(tempDataService);
          }
        } else {
          setSectionDataServices([]);
          setSelectedBoardIdService(e);
          setSelectedFilterColumnService({
            key: "",
            value: "",
            date_key: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedBoardIdService(e);
      setLoading(false);
    }
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

  const handleSaveService = async () => {
    setLoading(true);
    const payload = {
      profile_id: location.state.toString(),
      governify_service_board_id:
        selectedBoardIdService === undefined ? null : selectedBoardIdService,
    };

    const payload1 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_service_filter_key: {
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

    const payload3 = {
      profile_id: location.state.toString(),
      governify_service_report: JSON.stringify(
        getChartDataFormatService(sectionDataServies)
      ),
    };

    const payload4 = {
      governify_service_report_view: "",
      profile_id: location.state.toString(),
    };

    try {
      const response = await governifyServiceBoardAssociation(payload);
      await delayFun();
      const response1 = await governifyFilterKeyAssociationService(payload1);
      await delayFun();
      const response2 = await governifyServiceReportAdminSetting(payload3);
      await delayFun();
      const response3 = await saveAdminServiceView(payload4);

      if (
        response.success &&
        response1.success &&
        response2.success &&
        response3.success
      ) {
        toast.success("Governify Service Settings Updated!");
      }
      if (!response.success) {
        toast.error(response.message);
      }

      if (!response1.success) {
        toast.error(response1.message);
      }

      if (!response2.success) {
        toast.error(response2.message);
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
      sessionStorage.removeItem("draggableResizableStateService");
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    const newData = [...selectedTableColumnsCompliance];
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed); // Insert dragged item to new position
    setSelectedTableColumnsCompliance(newData); // Update state with the new order
  };

  const getColumnLabel = (item) => {
    let labelOfItem = "";
    columnOptionsCompliance.forEach((subItem) => {
      if (subItem.value === item) {
        labelOfItem = subItem.label;
      }
    });
    return labelOfItem;
  };

  const copyObjectsBasedOnTitle = (arr1, arr2) => {
    return arr1.map((obj1) => {
      // Find the corresponding object from arr2 that matches the title
      const matchingObj = arr2.find((obj2) => obj2.title === obj1.title);
      // If a match is found, copy it; otherwise, keep the original object from arr1
      return matchingObj ? { ...matchingObj } : { ...obj1 };
    });
  };

  const getChartDataFormatCompliance = (data) => {
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
          subItem.size = { width: 365, height: 420 };
          subItem.position = currentPos;
          position.y = position.y + 445;
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

    if (previousViewDataCompliance.length === 0) {
      return tempData;
    } else {
      if (
        complianceNewSection.length === 0 &&
        complianceEditedSection.length === 0
      ) {
        let previousData = [...previousViewDataCompliance];
        const finalArray = copyObjectsBasedOnTitle(tempData, previousData);
        return finalArray;
      } else {
        let previousData = [...previousViewDataCompliance];
        const filteredData = previousData.filter(
          (item) => !complianceDeletedSection.includes(item.title)
        );
        const newTempData = [];
        filteredData.forEach((item) => {
          if (complianceEditedSection.includes(item.title)) {
            const tempFilteredArray = tempData.filter(
              (subItem) => subItem.title === item.title
            );
            newTempData.push(tempFilteredArray[0]);
          } else {
            newTempData.push(item);
          }
        });

        tempData.forEach((item) => {
          if (complianceNewSection.includes(item.title)) {
            newTempData.push(item);
          }
        });

        const finalArray = copyObjectsBasedOnTitle(tempData, newTempData);
        return finalArray;
      }
    }
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
          subItem.size = { width: 365, height: 420 };
          subItem.position = currentPos;
          position.y = position.y + 445;
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
      if (
        serviceNewSection.length === 0 &&
        serviceEditedSection.length === 0
      ) {
        let previousData = [...previousViewDataService];
        const finalArray = copyObjectsBasedOnTitle(tempData, previousData);
        return finalArray;
      } else {
        let previousData = [...previousViewDataService];
        const filteredData = previousData.filter(
          (item) => !serviceDeletedSection.includes(item.title)
        );
        const newTempData = [];
        filteredData.forEach((item) => {
          if (serviceEditedSection.includes(item.title)) {
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

  const getCollapseSubItemsCompliance = () => {
    return [
      {
        key: "1",
        label: "Compliance General Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>Assign Board : </span>
              <Select
                showSearch
                allowClear
                placeholder="Please Assign Board For Compliance"
                style={{ width: "50%" }}
                value={selectedBoardIdCompliance || undefined}
                onChange={handleChangeBoardIdCompliance}
                options={allBoardId}
                filterOption={filterOption}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>Select Date Column : </span>
              <Select
                showSearch
                allowClear
                style={{
                  width: "50%",
                }}
                placeholder="Please select Date Column"
                onChange={handleSelectDateColumnCompliance}
                options={dateOptionsCompliance}
                value={selectedFilterColumnCompliance.date_key || undefined}
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
                onChange={handleSelectColumnCompliance}
                options={columnOptionsCompliance}
                value={selectedFilterColumnCompliance.key || undefined}
                filterOption={filterOption}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedFilterColumnCompliance.key !== undefined &&
                selectedFilterColumnCompliance.key != null &&
                selectedFilterColumnCompliance.key.length > 0 && (
                  <Input
                    addonBefore="Filter Value"
                    style={{ width: "50%" }}
                    value={
                      selectedFilterColumnCompliance.value === undefined
                        ? ""
                        : selectedFilterColumnCompliance.value
                    }
                    onChange={handleChangeFilterValueCompliance}
                  />
                )}
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: "Compliance Table Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>Select Table Column :</span>
              <Select
                mode="multiple"
                showSearch
                allowClear
                style={{
                  width: "50%",
                }}
                placeholder="Please select Table Columns"
                onChange={handleSelectTableColumnCompliance}
                options={columnOptionsCompliance}
                value={selectedTableColumnsCompliance || undefined}
                filterOption={filterOption}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-section">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ marginTop: "20px" }}
                    >
                      {selectedTableColumnsCompliance.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                marginTop: "10px",
                                border: "1px solid #ddd",
                                padding: "10px",
                                backgroundColor: "white",
                              }}
                            >
                              <div>{getColumnLabel(item)}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        ),
      },
      {
        key: "3",
        label: "Compliance Chart Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <ComplianceReportSettings
              sectionData={sectionDataCompliance}
              setSectionData={setSectionDataCompliance}
              columnOptions={columnOptionsCompliance}
              selectedBoardIdCompliance={selectedBoardIdCompliance}
              complianceNewSection={complianceNewSection}
              complianceEditedSection={complianceEditedSection}
              complianceDeletedSection={complianceDeletedSection}
              setComplianceNewSection={setComplianceNewSection}
              setComplianceEditedSection={setComplianceEditedSection}
              setComplianceDeletedSection={setComplianceDeletedSection}
            />
          </div>
        ),
      },
    ];
  };

  const getCollapseSubItemsService = () => {
    return [
      {
        key: "1",
        label: "Service General Setting",
        children: (
          <div style={{ textAlign: "left" }}>
            <div style={{ marginTop: "20px" }}>
              <span style={{ marginRight: "20px" }}>Assign Board : </span>
              <Select
                showSearch
                allowClear
                placeholder="Please Assign Board For Service"
                style={{ width: "50%" }}
                value={selectedBoardIdService || undefined}
                onChange={handleChangeBoardIdService}
                options={allBoardId}
                filterOption={filterOption}
              />
            </div>
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
              sectionData={sectionDataServies}
              setSectionData={setSectionDataServices}
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

  useEffect(() => {
    getListOfAllBoard();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "48px", marginBottom: "16px" }}>
        <Hero
          heading={"Report Settings"}
          subheading="Stay informed and in control of the reports of your requests"
          forHome={false}
        />
      </div>
      {loading && <Loader />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Button icon={<LeftOutlined />} onClick={handleBackNavigation}></Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Collapse
          defaultActiveKey={["1", "2"]}
          size="small"
          items={[
            {
              key: "1",
              label: "Compliance Setting",
              children: (
                <>
                  <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                    items={getCollapseSubItemsCompliance()}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button onClick={handleSaveCompliance}>Save</Button>

                    <Button onClick={() => navigateToReportView("compliance")}>
                      View Report
                    </Button>
                  </div>
                </>
              ),
            },
            {
              key: "2",
              label: "Service Setting",
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

                    {/* <Button
                      onClick={() => navigateToReportSetting("compliance")}
                    >
                      Edit Report
                    </Button> */}
                    <Button onClick={() => navigateToReportView("service")}>
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
