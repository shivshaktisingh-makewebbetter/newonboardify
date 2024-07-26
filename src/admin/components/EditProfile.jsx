import { Button, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {
  createProfileEndPoint,
  getAllBoards,
  getAllCustomers,
} from "../../apiservice/ApiService";
import { Loader } from "../../common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateServices } from "./CreateServices";

export const EditProfile = () => {
  const location = useLocation();

  const data = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const [loading, setLoading] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [profileId, setProfileId] = useState(location.state.profileId);
  const [dataSource, setDataSource] = useState([]);
  const [openService, setOpenService] = useState(false);
  const [profileData, setProfileData] = useState({
    title: location.state.profileTitle || "",
    users: location.state.users || [],
  });
  const [boardIdOptions, setBoardIdOptions] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Assign Board",
      dataIndex: "boardId",
      render: (_, record) => (
        <>
          <Select
            placeholder={"Select Board"}
            style={{ width: "100%", borderRadius: "10px" }}
            popupMatchSelectWidth={false}
            placement="bottomLeft"
            onChange={() => {}}
            options={boardIdOptions}
            value={record.boardId}
          />
        </>
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <>
          <Button
            className="governify-delete-icon"
            type="plain"
            icon={<EditOutlined />}
            onClick={() => {}}
          ></Button>
          <Button
            className="governify-delete-icon"
            type="plain"
            icon={<DeleteOutlined />}
            onClick={() => {}}
          ></Button>
        </>
      ),
    },
  ];

  const getAllBoardIds = async () => {
    try {
      const response = await getAllBoards();
      console.log(response);
      if (response.success) {
        let tempData = [];
        response.data.response.boards.forEach((item) => {
          console.log(item, "item");
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
        setBoardIdOptions(tempData);
      }
    } catch (err) {
      throw new Error("Network response was not ok ", err);
    }
  };

  const handleChangeProfileTitle = (event) => {
    setProfileData({ ...profileData, title: event.target.value });
  };

  const getListOfAllCustomers = async () => {
    const tempUser = [];
    try {
      const response = await getAllCustomers();
      if (response.success) {
        response.data.response.forEach((item) => {
          tempUser.push({ label: item.name, value: item.email });
        });
        setUserListing(tempUser);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getListOfAllCustomers();
    getAllBoardIds();
  }, []);

  const handleUserChange = (e) => {
    setProfileData({ ...profileData, users: e });
  };

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      let tempProfileData = {
        title: profileData.title,
        users: profileData.users.join(","),
      };
      const response = await createProfileEndPoint(
        JSON.stringify(tempProfileData)
      );
      if (response.success) {
        setProfileId(response.data.response[0].id);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async () => {};

  const handleOpenService = () => {
    setOpenService(true);
  };

  const getServiceListing = async () => {
    try {
      const response = await getServiceListing();
      console.log(response);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getServiceListing();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div style={{ width: "100%", marginTop: "25px" }}>
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
                    color: data.button_bg,
                    borderColor: data.button_bg,
                  }}
                />
              }
              onClick={() => {}}
              style={{ border: `1px solid ${data.button_bg}` }}
            ></Button>
            <Button
              style={{
                borderColor: data.button_bg,
                color: data.button_bg,
              }}
              onClick={handleOpenService}
            >
              + Create Services
            </Button>
          </div>
          <div
            className="text-white"
            style={{ backgroundColor: data.head_title_color }}
          >
            <p
              className="p-2 m-0 fs-5"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>Edit Profile</strong>
            </p>
          </div>
          <div className="form_wrapper border border-success p-4 primary-shadow">
            <Input
              placeholder="Profile name"
              className="mt-10"
              onChange={(e) => handleChangeProfileTitle(e)}
              addonBefore="Profile Name"
              value={profileData.title}
            />

            <div className="mt-10">
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder={"Select User"}
                style={{ width: "100%", borderRadius: "10px" }}
                popupMatchSelectWidth={false}
                placement="bottomLeft"
                onChange={handleUserChange}
                options={userListing}
                value={profileData.users}
              />
            </div>

            <Button
              className="mt-10"
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleCreateProfile}
            >
              Save
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
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

        <Modal
          open={openService}
          centered
          footer={(_) => <></>}
          onCancel={() => {
            setOpenService(false);
          }}
          className="width-80"
        >
          <CreateServices
            closeModal={() => {
              setOpenService(false);
            }}
            profileId={location.state.profileId}
          />
        </Modal>

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};
