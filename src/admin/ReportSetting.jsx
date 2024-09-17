import { useEffect, useState } from "react";
// import { fetcher } from "../../utils/helper";
import { Button, Collapse, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Hero } from "../components/Hero";
import {
  getAllBoards,
  getAllColumnsOfBoard,
  getProfileListing,
  governifyBoardAssociation,
  governifyFilterKeyAssociation,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";

export const ReportSettings = () => {
  const location = useLocation();
  const [allBoardId, setAllBoardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnOptions, setColumnOptions] = useState([]);
  const [selectedFilterColumn, setSelectedFilterColumn] = useState("");
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
    setSelectedFilterColumn(e);
    const payloadData = JSON.stringify({
      profile_id: location.state.toString(),
      governify_filter_key: e,
    });
    try {
      const response = await governifyFilterKeyAssociation(payloadData);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (err) {}
  };

  const navigateToReportSetting = (type) => {
    const dataToPass = { boardId: selectedBoard, profileId: location.state };
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
      navigate("/admin/serviceReportAdminView" ,  { state: dataToPass });
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
            setSelectedFilterColumn(item.governify_filter_key);
            setSelectedTableColumns(JSON.parse(item.governify_table_settings));
            selectedBoardId = item.governify_board_id;
          }
        });
        // setDataSource(tempListing);
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
        response3.data.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
        });
        setColumnOptions(tempData);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
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
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={handleSelectColumn}
                    options={columnOptions}
                    value={selectedFilterColumn}
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
                    onChange={handleSelectColumn}
                    options={columnOptions}
                    value={selectedTableColumns}
                    filterOption={filterOption}
                  />
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
