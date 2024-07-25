import { useState } from "react";
import { Button,  Table } from "antd";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import { ToastContainer } from "react-toastify";


export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  

  const settingData = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const handleNavigateToCreateProfile = () => {
    navigate('/admin/createprofile');
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "User List",
      dataIndex: "users",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Button
          className="governify-delete-icon"
          type="plain"
          icon={<DeleteOutlined />}
          onClick={() => {}}
        ></Button>
      ),
    },
  ];

  const handleBackNavigation = () =>{
    navigate('/admin')
  }

  return (
    <div className="pt-84">
      {loading && <Loader />}

      <div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            icon={
              <LeftOutlined
                style={{
                  color: settingData.button_bg,
                  borderColor: settingData.button_bg,
                }}
              />
            }
            onClick={handleBackNavigation}
            style={{ border: `1px solid ${settingData.button_bg}` }}
          ></Button>
          <Button
            icon={
              <PlusOutlined
                style={{
                  color: settingData.button_bg,
                  borderColor: settingData.button_bg,
                }}
              />
            }
            onClick={handleNavigateToCreateProfile}
            style={{
              border: `1px solid ${settingData.button_bg}`,
              color: settingData.button_bg,
            }}
          >
            Create Profile
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            maxWidth: "1320px",
            overflowX: "auto",
          }}
          pagination={{
            showTotal: (total) => `Total ${total} items`,
            defaultPageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            defaultCurrent: 1,
          }}
        />
      </div>

    
      <ToastContainer position="bottom-right" />
    </div>
  );
};
