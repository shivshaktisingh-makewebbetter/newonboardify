import { useEffect, useState } from "react";
// import { fetcher } from "../../utils/helper";
import { Button, Collapse, Dropdown, Modal, Select, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Hero } from "../components/Hero";
import { ComplianceTableSettings } from "./components/ComplianceTableSettings";
import {
  getAllBoards,
  getAllColumnsOfBoard,
  getProfileListing,
  governifyBoardAssociation,
  governifyFilterKeyAssociation,
} from "../apiservice/ApiService";
import { Loader } from "../common/Loader";
import { FilterSettingsGovernify } from "./components/FilterSettingsGovernify";

export const ReportSettings = () => {
  const location = useLocation();
  const [dataSource, setDataSource] = useState([]);
  const [allBoardId, setAllBoardId] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [tableSettingModal, setTableSettingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [columnOptions, setColumnOptions] = useState([]);
  const [selectedFilterColumn, setSelectedFilterColumn] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedTableColumns, setSelectedTableColumns] = useState([]);
  const navigate = useNavigate();

  const handleChangeBoardId = async (e) => {
    let data = JSON.stringify({
      profile_id: location.state.id.toString(),
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

  //   const navigateToComplianceReportSetting = (item) => {
  //     const dataToPass = {
  //       selectedProfileData: item,
  //     };
  //     navigate("/admin/complianceReport", { state: dataToPass });
  //   };

  //   const navigateToServiceReportSetting = (item) => {
  //     const dataToPass = {
  //       selectedProfileData: item,
  //     };
  //     navigate("/admin/serviceReport", { state: dataToPass });
  //   };

  //   const openModalToComplianceTableSetting = (item) => {
  //     setSelectedProfileData(item);
  //     if (
  //       item.governify_board_id === undefined ||
  //       item.governify_board_id === null ||
  //       item.governify_board_id === ""
  //     ) {
  //       toast.error("Please assign Board First.");
  //       return;
  //     }
  //     setTableSettingModal(true);
  //   };

  //   const openModalForFilterSelection = (item) => {
  //     setSelectedProfileData(item);
  //     setFilterSettingModal(true);
  //   };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleSelectColumn = async (e) => {
    setSelectedFilterColumn(e);
    const payloadData = JSON.stringify({
      profile_id: location.state.id.toString(),
      governify_filter_key: e,
    });
    try {
      const response = await governifyFilterKeyAssociation(payloadData);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (err) {}
  };

  //   const columns = [
  //     {
  //       title: "ID",
  //       dataIndex: "id",
  //     },
  //     {
  //       title: "Name",
  //       dataIndex: "title",
  //     },
  //     {
  //       title: "Assign Board",
  //       dataIndex: "title",
  //       render: (_, record) => (
  //         <Select
  //           key={record.governify_board_id}
  //           showSearch
  //           onChange={(e) => handleChangeBoardId(record.id, e)}
  //           options={allBoardId}
  //           value={record.governify_board_id}
  //           style={{
  //             width: 200,
  //           }}
  //           filterOption={filterOption}
  //         />
  //       ),
  //     },
  //     {
  //       title: "Action",
  //       dataIndex: "",
  //       key: "x",
  //       render: (_, record) => {
  //         const items1 = [
  //           {
  //             key: "1",
  //             label: (
  //               <span onClick={() => navigateToComplianceReportSetting(record)}>
  //                 Compliance Chart
  //               </span>
  //             ),
  //           },
  //           {
  //             key: "2",
  //             label: (
  //               <span onClick={() => navigateToServiceReportSetting(record)}>
  //                 Service Chart
  //               </span>
  //             ),
  //           },
  //           {
  //             key: "3",
  //             label: (
  //               <span onClick={() => openModalToComplianceTableSetting(record)}>
  //                 Compliance Table
  //               </span>
  //             ),
  //           },
  //           {
  //             key: "4",
  //             label: (
  //               <span onClick={() => openModalForFilterSelection(record)}>
  //                 Select Filter
  //               </span>
  //             ),
  //           },
  //         ];
  //         const items2 = [
  //           {
  //             key: "1",
  //             label: (
  //               <span onClick={() => navigateToComplianceReportSetting(record)}>
  //                 Compliance Chart
  //               </span>
  //             ),
  //           },
  //           {
  //             key: "2",
  //             label: (
  //               <span onClick={() => navigateToServiceReportSetting(record)}>
  //                 Service Chart
  //               </span>
  //             ),
  //           },
  //           {
  //             key: "3",
  //             label: (
  //               <span onClick={() => openModalToComplianceTableSetting(record)}>
  //                 Compliance Table
  //               </span>
  //             ),
  //           },
  //         ];
  //         return (
  //           <div style={{ display: "flex", gap: "10px" }}>
  //             <Dropdown
  //               menu={{
  //                 items: items1,
  //               }}
  //               placement="bottom"
  //               arrow
  //             >
  //               <Button>Edit</Button>
  //             </Dropdown>

  //             <Dropdown
  //               menu={{
  //                 items: items2,
  //               }}
  //               placement="bottom"
  //               arrow
  //             >
  //               <Button>View</Button>
  //             </Dropdown>
  //           </div>
  //         );
  //       },

  //       fixed: "right",
  //     },
  //   ];

  const navigateToReportSetting = (type) =>{
    if(type === 'compliance'){
      navigate("/admin/complianceReport");
    }

    if(type === 'service'){
      navigate("/admin/serviceReport");
    }
  }


  const navigateToReportView = (type) =>{
    if(type === 'compliance'){
      navigate("/admin/complianceReport");
    }
    
    if(type === 'service'){
      navigate("/admin/serviceReport");
    }
  }

  const getListOfAllBoard = async () => {
    let selectedBoardId = "";
    let tempBoardIds = [];
    setLoading(true);
    try {
      const response = await getAllBoards();
      const response1 = await getProfileListing();
      if (response1.success) {
        response1.data.response.forEach((item) => {
          if (item.id === location.state.id) {
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
              <Button onClick={() => navigateToReportSetting(item.type)}>Edit</Button>
              <Button onClick={() => navigateToReportView(item.type)}>View</Button>
            </div>
          </div>
        ))}
      </div>

      {/* <Table
        columns={columns}
        dataSource={dataSource}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: 768 }}
        pagination={{
          showTotal: (total) => `Total ${total} items`,
          defaultPageSize: 5,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultCurrent: 1,
        }}
      /> */}
      <ToastContainer position="bottom-right" />

      <Modal
        open={tableSettingModal}
        centered
        footer={(_) => <></>}
        onCancel={() => setTableSettingModal(false)}
      >
        <ComplianceTableSettings
          selectedProfileData={selectedProfileData}
          setTableSettingModal={setTableSettingModal}
        />
      </Modal>
      {/* 
      <Modal
        key={selectedProfileData.id}
        open={filterSettingModal}
        centered
        footer={(_) => <></>}
        onCancel={() => setFilterSettingModal(false)}
      >
        <FilterSettingsGovernify
          selectedProfileData={selectedProfileData}
          setFilterSettingModal={setFilterSettingModal}
        />
      </Modal> */}
    </div>
  );
};
