import { Button, Select } from "antd";
import { fetcher } from "../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ComplianceTableSettings = ({
  selectedProfileData,
  setTableSettingModal,
}) => {
  const settingData = JSON.parse(sessionStorage.getItem("settings"));
  const [columnOptions, setColumnOptions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(
    selectedProfileData.governify_table_settings !== null
      ? JSON.parse(selectedProfileData.governify_table_settings)
      : []
  );

  const fetchData = async () => {
    try {
      const url = `newonboardify/admin/get-board-columns/${selectedProfileData.governify_board_id}`;
      const method = "GET";
      const response = await fetcher(url, method);
      if (response.status) {
        const tempData = [];
        response.response.forEach((item) => {
          tempData.push({ label: item.title, value: item.id });
        });
        setColumnOptions(tempData);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleSelectColumn = (e) => {
    setSelectedColumn(e);
  };

  const handleSubmit = async () => {
    const endpoint = `governify/admin/tableSettings`;
    const method = "POST";
    const payloadData = JSON.stringify({
      profile_id: selectedProfileData.id.toString(),
      governify_table_settings: selectedColumn,
    });
    try {
      const response = await fetcher(endpoint, method, payloadData);
      if (response.status) {
        toast.success(response.message);
        setTableSettingModal(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div style={{ maxWidth: "550px", width: "100%", marginTop: "25px" }}>
      <div
        className="text-white"
        style={{ backgroundColor: settingData.head_title_color }}
      >
        <p
          className="p-2 m-0 fs-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>Compliance Table Settings</strong>
          <span style={{ display: "flex", alignItems: "center" }}></span>
        </p>
      </div>
      <div
        className="form_wrapper border border-success p-4 primary-shadow"
        style={{ overflowY: "auto" }}
      >
        <p>Select Columns</p>
        <Select
          showSearch
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          onChange={handleSelectColumn}
          options={columnOptions}
          value={selectedColumn}
          filterOption={filterOption}
        />
        <div
          className="mt-16"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            style={{
              background: settingData.button_bg,
              color: "#fff",
              border: "none",
            }}
            className="fw-700"
            onClick={handleSubmit}
            loading={false}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
