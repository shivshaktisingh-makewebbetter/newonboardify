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
  governifyBoardAssociation,
  governifyFilterKeyAssociation,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";

export const ReportSettings = () => {
  const location = useLocation();
  const [allBoardId, setAllBoardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnOptions, setColumnOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedFilterColumn, setSelectedFilterColumn] = useState({
    key: "",
    value: "",
    date_key: "",
  });
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedTableColumns, setSelectedTableColumns] = useState([]);
  const navigate = useNavigate();

  const handleChangeBoardId = async (e) => {
    let data = JSON.stringify({
      profile_id: location.state.toString(),
      governify_board_id: e,
    });
    try {
      const response = await governifyBoardAssociation(data);
      if (response.success) {
        setSelectedBoard(e);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      //   getListOfAllProfilesAndBoardListing();
    }
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleSelectColumn = async (e) => {
    let tempObj = {...selectedFilterColumn};
    tempObj.key = e;
    tempObj.value ='';
    setSelectedFilterColumn(tempObj);
  };

  const handleSelectTableColumn = async (e) => {
    setSelectedTableColumns(e);
  };


  const handleSelectDateColumn = async (e) => {
    setSelectedFilterColumn({ ...selectedFilterColumn, date_key: e });
  };

  const navigateToReportSetting = (type) => {
    const dataToPass = { boardId: selectedBoard, profileId: location.state , filterKey: selectedFilterColumn };
    if (type === "compliance") {
      navigate("/admin/complianceReport", { state: dataToPass });
    }

    if (type === "service") {
      navigate("/admin/serviceReport", { state: dataToPass });
    }
  };

  const navigateToReportView = (type) => {
    const dataToPass = {
      boardId: selectedBoard,
      profileId: location.state,
      filterKey: selectedFilterColumn,
    };
    if (type === "compliance") {
      navigate("/admin/complianceReportAdminView", { state: dataToPass });
    }

    if (type === "service") {
      navigate("/admin/serviceReportAdminView", { state: dataToPass });
    }
  };

  const getListOfAllBoard = async () => {
    let selectedBoardId = "";
    let tempBoardIds = [];
    setLoading(true);
    try {
      const response = await getAllBoards();
      const response1 = await getProfileListing();
      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (item.id === location.state) {
            setSelectedBoard(item.governify_board_id);
            if (item.governify_filter_key !== null) {
              setSelectedFilterColumn(JSON.parse(item.governify_filter_key));
            }
            setSelectedTableColumns(JSON.parse(item.governify_table_settings));
            selectedBoardId = item.governify_board_id;
          }
        });
      }
      if (response.success) {
        response.data.response.boards.forEach((item) => {
          tempBoardIds.push({ label: item.name, value: item.id });
        });
        setAllBoardId(tempBoardIds);
      }
      const response3 = await getAllColumnsOfBoard(selectedBoardId);
      if (response3.success) {
        const tempData = [];
        const tempDateData = [];

        response3.data.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
          if (item.type === "date") {
            tempDateData.push({ label: item.title, value: item.id });
          }
        });
        setColumnOptions(tempData);
        setDateOptions(tempDateData);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFilterValue = (e) => {
    setSelectedFilterColumn({ ...selectedFilterColumn, value: e.target.value });
  };

  const handleSubmitFilterKey = async () => {
    const payloadData = JSON.stringify({
      profile_id: location.state.toString(),
      governify_filter_key: selectedFilterColumn,
    });
    try {
      const response = await governifyFilterKeyAssociation(payloadData);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (err) {}
  };

  const handleSaveTableData = async() =>{
    const payloadData = JSON.stringify({
      profile_id: location.state.toString(),
      governify_table_settings: selectedTableColumns,
    });
    try {
      const response = await governifyAdminTableSettings(payloadData);
      if (response.success) {
        toast.success(response.message);
     
      }
    } catch (err) {}
  }

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
      <div style={{ marginTop: "20px" }}>
        <Collapse
          size="small"
          items={[
            {
              key: "1",
              label: "Assigned Board",
              children: (
                <div style={{ textAlign: "left" }}>
                  <Select
                    showSearch
                    style={{ width: "50%" }}
                    value={selectedBoard}
                    onChange={handleChangeBoardId}
                    options={allBoardId}
                    filterOption={filterOption}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Collapse
          size="small"
          items={[
            {
              key: "1",
              label: "Assigned Filter",
              children: (
                <div style={{ textAlign: "left" }}>
                  <div style={{ marginTop: "20px" }}>
                    <Select
                      showSearch
                      allowClear
                      style={{
                        width: "50%",
                      }}
                      placeholder="Please select Date Column"
                      onChange={handleSelectDateColumn}
                      options={dateOptions}
                      value={selectedFilterColumn.date_key}
                      filterOption={filterOption}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <Select
                      showSearch
                      allowClear
                      style={{
                        width: "50%",
                      }}
                      placeholder="Please select"
                      onChange={handleSelectColumn}
                      options={columnOptions}
                      value={selectedFilterColumn.key}
                      filterOption={filterOption}
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {selectedFilterColumn.key !== undefined &&
                      selectedFilterColumn.key.length > 0 && (
                        <Input
                          addonBefore="Filter Value"
                          style={{ width: "50%" }}
                          value={
                            selectedFilterColumn.value === undefined
                              ? ""
                              : selectedFilterColumn.value
                          }
                          onChange={handleChangeFilterValue}
                        />
                      )}
                  </div>
                  {selectedFilterColumn.key !== undefined &&
                    selectedFilterColumn.key.length > 0 &&
                    selectedFilterColumn.value.length > 0 && (
                      <div
                        style={{
                          marginTop: "10px",
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button onClick={handleSubmitFilterKey}> Save</Button>
                      </div>
                    )}
                </div>
              ),
            },
          ]}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Collapse
          size="small"
          items={[
            {
              key: "1",
              label: "Compliance Table Setting",
              children: (
                <div style={{ textAlign: "left" }}>
                  <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={handleSelectTableColumn}
                    options={columnOptions}
                    value={selectedTableColumns}
                    filterOption={filterOption}
                  />
                  <div style={{marginTop:"20px"}}>
                    <Button onClick={handleSaveTableData}>Save</Button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div style={{ marginTop: "40px" }}>
        {[
          { label: "Compliance Report Setting", type: "compliance" },
          { label: "Service Report Setting", type: "service" },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px", // Added margin between sections
            }}
          >
            <span>{item.label}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button onClick={() => navigateToReportSetting(item.type)}>
                Edit
              </Button>
              <Button onClick={() => navigateToReportView(item.type)}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};
