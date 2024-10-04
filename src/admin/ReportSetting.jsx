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
  governifyFilterKeyAssociationCompliance,
  governifyFilterKeyAssociationService,
  governifyServiceBoardAssociation,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";
import { LeftOutlined } from "@ant-design/icons";

export const ReportSettings = () => {
  const location = useLocation();
  const [allBoardId, setAllBoardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnOptionsCompliance, setColumnOptionsCompliance] = useState([]);
  const [columnOptionsService, setColumnOptionsService] = useState([]);
  const [dateOptionsCompliance, setDateOptionsCompliance] = useState([]);
  const [dateOptionsService, setDateOptionsService] = useState([]);
  const [complianceChartSettingCompleted, SetComplianceChartSettingCompleted] =
    useState(false);
  const [serviceChartSettingCompleted, SetServiceChartSettingCompleted] =
    useState(false);
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
  const navigate = useNavigate();

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const navigateToReportSetting = (type) => {
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
      navigate("/admin/complianceReport", { state: dataToPass });
    }

    if (type === "service") {
      navigate("/admin/serviceReport", { state: dataToPass });
    }
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
            if (
              item.governify_compliance_report_view === undefined ||
              item.governify_compliance_report_view === null ||
              item.governify_compliance_report_view === ""
            ) {
              SetComplianceChartSettingCompleted(true);
            }
            if (
              item.governify_service_report_view === undefined ||
              item.governify_service_report_view === null ||
              item.governify_service_report_view === ""
            ) {
              SetServiceChartSettingCompleted(true);
            }
            if (item.governify_service_board_id !== null) {
              selectedBoardIdService = item.governify_service_board_id;
              setSelectedBoardIdService(item.governify_service_board_id);
            }
            if (item.governify_compliance_board_id !== null) {
              selectedBoardIdCompliance = item.governify_compliance_board_id;
              setSelectedBoardIdCompliance(item.governify_compliance_board_id);
            }

            if (item.governify_compliance_filter_key !== null) {
              setSelectedFilterColumnCompliance(
                JSON.parse(item.governify_compliance_filter_key)
              );
            }

            if (item.governify_service_filter_key !== null) {
              setSelectedFilterColumnService(
                JSON.parse(item.governify_service_filter_key)
              );
            }

            setSelectedTableColumnsCompliance(
              JSON.parse(item.governify_table_settings)
            );
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
    setLoading(true);
    try {
      const response = await getAllColumnsOfBoard(e);
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
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedBoardIdCompliance(e);
      setSelectedFilterColumnCompliance({ key: "", value: "", date_key: "" });
      setSelectedTableColumnsCompliance([]);
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
  
    if (
      selectedFilterColumnCompliance.key === null || 
      selectedFilterColumnCompliance.key === undefined || 
      selectedFilterColumnCompliance.key.trim() === '' || // Checks for empty strings
      selectedFilterColumnCompliance.value === null || 
      selectedFilterColumnCompliance.value === undefined || 
      selectedFilterColumnCompliance.value.trim() === '' || // Checks for empty strings
      selectedFilterColumnCompliance.date_key === null || 
      selectedFilterColumnCompliance.date_key === undefined || 
      selectedFilterColumnCompliance.date_key.trim() === '' // Checks for empty strings
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    

    setLoading(true);
    const payload = {
      profile_id: location.state.toString(),
      governify_compliance_board_id: selectedBoardIdCompliance,
    };
    const payload1 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_table_settings: selectedTableColumnsCompliance,
    });
    const payload2 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_compliance_filter_key: selectedFilterColumnCompliance,
    });

    try {
      const response = await governifyComplianceBoardAssociation(payload);
      await delayFun();
      const response1 = await governifyAdminTableSettings(payload1);
      await delayFun();
      const response2 = await governifyFilterKeyAssociationCompliance(payload2);
      if (response.success && response1.success && response2.success) {
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

      if (complianceChartSettingCompleted) {
        toast.error("Please Set the Compliance Chart Setting.");
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeBoardIdService = async (e) => {
    setLoading(true);

    try {
      const response = await getAllColumnsOfBoard(e);
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
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedBoardIdService(e);
      setSelectedFilterColumnService({ key: "", value: "", date_key: "" });
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

    
    if (
      selectedFilterColumnService.key === null || 
      selectedFilterColumnService.key === undefined || 
      selectedFilterColumnService.key.trim() === '' || // Checks for empty strings
      selectedFilterColumnService.value === null || 
      selectedFilterColumnService.value === undefined || 
      selectedFilterColumnService.value.trim() === '' || // Checks for empty strings
      selectedFilterColumnService.date_key === null || 
      selectedFilterColumnService.date_key === undefined || 
      selectedFilterColumnService.date_key.trim() === '' // Checks for empty strings
    ) {
      toast.error('Please fill all the fields');
      return;
    }
   
    setLoading(true);
    const payload = {
      profile_id: location.state.toString(),
      governify_service_board_id: selectedBoardIdService,
    };

    const payload1 = JSON.stringify({
      profile_id: location.state.toString(),
      governify_service_filter_key: selectedFilterColumnService,
    });

    try {
      const response = await governifyServiceBoardAssociation(payload);
      await delayFun();
      const response1 = await governifyFilterKeyAssociationService(payload1);
      if (response.success && response1.success) {
        toast.success("Governify Service Settings Updated!");
      }
      if (!response.success) {
        toast.error(response.message);
      }

      if (!response1.success) {
        toast.error(response1.message);
      }

      if (serviceChartSettingCompleted) {
        toast.error("Please Set the Service Chart Setting.");
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  useEffect(() => {
    getListOfAllBoard();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div style={{ marginTop: "48px", marginBottom: "16px" }}>
        <Hero
          heading={"Report Settings"}
          subheading="Stay informed and in control of the reports of your requests"
          forHome={false}
        />
      </div>
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
                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ marginRight: "20px" }}>
                        Assign Board :{" "}
                      </span>
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
                      <span style={{ marginRight: "20px" }}>
                        Select Date Column :{" "}
                      </span>
                      <Select
                        showSearch
                        allowClear
                        style={{
                          width: "50%",
                        }}
                        placeholder="Please select Date Column"
                        onChange={handleSelectDateColumnCompliance}
                        options={dateOptionsCompliance}
                        value={
                          selectedFilterColumnCompliance.date_key || undefined
                        }
                        filterOption={filterOption}
                      />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ marginRight: "20px" }}>
                        Select Table Column :
                      </span>
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

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <Button onClick={handleSaveCompliance}>Save</Button>

                      <Button
                        onClick={() => navigateToReportSetting("compliance")}
                      >
                        Edit Report
                      </Button>
                      <Button
                        onClick={() => navigateToReportView("compliance")}
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                </>
              ),
            },
            {
              key: "2",
              label: "Service Setting",
              children: (
                <>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ marginRight: "20px" }}>
                        Assign Board :{" "}
                      </span>
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
                      <span style={{ marginRight: "20px" }}>
                        Select Date Column :{" "}
                      </span>
                      <Select
                        showSearch
                        allowClear
                        style={{
                          width: "50%",
                        }}
                        placeholder="Please select Date Column"
                        onChange={handleSelectDateColumnService}
                        options={dateOptionsService}
                        value={
                          selectedFilterColumnService.date_key || undefined
                        }
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

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <Button onClick={handleSaveService}>Save</Button>

                      <Button
                        onClick={() => navigateToReportSetting("service")}
                      >
                        Edit Report
                      </Button>
                      <Button onClick={() => navigateToReportView("service")}>
                        View Report
                      </Button>
                    </div>
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
