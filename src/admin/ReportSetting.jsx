import { useEffect, useState } from "react";
// import { fetcher } from "../../utils/helper";
import { Button, Dropdown, Modal, Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Hero } from "../components/Hero";
import { ComplianceTableSettings } from "./components/ComplianceTableSettings";
import { getAllBoards, getProfileListing } from "../apiservice/ApiService";


export const ReportSettings = () => {
  const [dataSource, setDataSource] = useState([]);
  const [allBoardId, setAllBoardId] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [tableSettingModal, setTableSettingModal] = useState(false);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeBoardId = async (profileId, e) => {
    // let method = "POST";
    // let url = `governify/admin/profileBoardAssociation`;
    // let data = JSON.stringify({
    //   profile_id: profileId.toString(),
    //   governify_board_id: e,
    // });
    // try {
    //   const response = await fetcher(url, method, data);
    //   if (response.status) {
    //     toast.success(response.message);
    //   } else {
    //     toast.error(response.message);
    //   }
    // } catch (err) {
    //   toast.error(err);
    // }
  };

  const navigateToComplianceReportSetting = (item) => {
    const dataToPass = {
      selectedProfileData: item,
    };
    navigate("/admin/complianceReport", { state: dataToPass });
  };

  const navigateToServiceReportSetting = (item) => {
    const dataToPass = {
      selectedProfileData: item,
    };
    navigate("/admin/serviceReport", { state: dataToPass });
  };

  const openModalToComplianceTableSetting = (item) => {
    setSelectedProfileData(item);
    if (
      item.governify_board_id === undefined ||
      item.governify_board_id === null ||
      item.governify_board_id === ""
    ) {
      toast.error("Please assign Board First.");
      return;
    }
    setTableSettingModal(true);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Assign Board",
      dataIndex: "title",
      render: (_, record) => (
        <Select
          key={record.governify_board_id}
          showSearch
          onChange={(e) => handleChangeBoardId(record.id, e)}
          options={allBoardId}
          value={record.governify_board_id}
          style={{
            width: 200,
          }}
          filterOption={filterOption}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: (
              <span onClick={() => navigateToComplianceReportSetting(record)}>
                Compliance Chart
              </span>
            ),
          },
          {
            key: "2",
            label: (
              <span onClick={() => navigateToServiceReportSetting(record)}>
                Service Chart
              </span>
            ),
          },
          {
            key: "3",
            label: (
              <span onClick={() => openModalToComplianceTableSetting(record)}>
                Compliance Table
              </span>
            ),
          },
        ];
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Button>Edit</Button>
            </Dropdown>

            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Button>View</Button>
            </Dropdown>
          </div>
        );
      },

      fixed: "right",
    },
  ];

  
  const getListOfAllProfilesAndBoardListing = async () => {
    let tempListing = [];
    let tempBoardIds = [];
    setLoading(true);
    try {
      const response = await getProfileListing();
      const response2 = await getAllBoards();
      if (response.success) {
        response.data.response.forEach((item) => {
          tempListing.push({
            id: item.id,
            title: item.title,
            users: item.users
              .split(",")
              .map((user) => user.trim())
              .join(" , "),
            default: item.make_default === 0 ? false : true,
          });
        });
        setDataSource(tempListing);
      }
      if(response2.success){
        response2.data.response.boards.forEach((item)=>{
            tempBoardIds.push({ label: item.name, value: item.id });
        })
        setAllBoardId(tempBoardIds);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListOfAllProfilesAndBoardListing();
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
      <Table
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
      />
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
    </div>
  );
};
