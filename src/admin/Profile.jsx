import { useEffect, useState } from "react";
import { Button, Switch, Table } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import { toast, ToastContainer } from "react-toastify";
import {
  cloneProfile,
  deleteProfile,
  getProfileListing,
  makeProfileDefault,
} from "../apiservice/ApiService";
import { DeleteModal } from "./components/DeleteModal";

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState({
    flag: false,
    id: "",
  });

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
    navigate("/admin/createprofile");
  };

  const onChangeSwitch = async (e, id) => {
    const tempDataSource = [...dataSource];

    let payload = {
      profile_id: id,
      value: e,
    };

    setLoading(true);
    try {
      const response = await makeProfileDefault(JSON.stringify(payload));
      if (response.success) {
        tempDataSource.forEach((item) => {
            item.default = item.id === id && e ? true : false;

        });
        toast.success(response.message);
        setDataSource(tempDataSource);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    setLoading(true);
    try {
      const response = await deleteProfile(deleteModalOpen.id);
      if (response.success) {
        toast.success(response.message);
        setDeleteMOdalOpen({ flag: false, id: "" });
        await getListOfAllProfiles();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteMOdalOpen({ flag: true, id: id });
  };

  const handleEditProfile = (item) => {
    const dataToPass = {
      profileId: item.id,
      profileTitle: item.title,
      users: item.users,
    };

    navigate("/admin/editprofile", {
      state: dataToPass,
    });
  };

  const handleCloneProfile = async (id) => {
    try {
      const response = await cloneProfile(id);
      if (response.success) {
        toast.success(response.message);
        getListOfAllProfiles();
      } else {
        toast.error("Profile Not Cloned.");
      }
    } catch (err) {
    } finally {
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "User List",
      dataIndex: "users",
    },
    {
      title: "Default Profile",
      dataIndex: "make_default",
      render: (_, record) => (
        <>
          <Switch
            checked={record.default == 1}
            onChange={(e) => onChangeSwitch(e, record.id)}
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
            onClick={() => handleEditProfile(record)}
          ></Button>

          <Button
            className="governify-delete-icon"
            type="plain"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteModal(record.id)}
          ></Button>
          <Button
            className="governify-delete-icon"
            type="plain"
            icon={<CopyOutlined />}
            onClick={() => handleCloneProfile(record.id)}
          ></Button>
        </>
      ),
    },
  ];

  const handleBackNavigation = () => {
    navigate("/admin");
  };

  const getListOfAllProfiles = async () => {
    let tempListing = [];
    setLoading(true);
    try {
      const response = await getProfileListing();

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
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListOfAllProfiles();
  }, []);

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

      {deleteModalOpen.flag && (
        <DeleteModal
          open={deleteModalOpen.flag}
          handleCancel={() => {
            setDeleteMOdalOpen({ flag: false, id: "" });
          }}
          handleDelete={handleDeleteProfile}
          message={"Are you sure you want to delete this Profile?"}
        />
      )}
    </div>
  );
};
