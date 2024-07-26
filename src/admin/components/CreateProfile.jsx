import { Button, Input, Select, Dropdown, Space, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { fetcher } from "../../utils/helper";
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {
  createProfileEndPoint,
  getAllCustomers,
} from "../../apiservice/ApiService";
import { Loader } from "../../common/Loader";
import { CreateServices } from "./CreateServices";

export const CreateProfile = ({ setModalOpen }) => {
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

  const [field, setField] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formDetail, setFormDetail] = useState({ formName: "" });
  const [userListing, setUserListing] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [openService, setOpenService] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState({
    flag: false,
    profileId: "",
  });
  const [categoryServicesMapping, setCategoryServicesMapping] = useState([
    {
      category_id: "",
      services_id: "",
    },
  ]);
  const [profileData, setProfileData] = useState({
    title: "",
    users: [],
  });

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
  }, []);

  const handleMenuClick = (e) => {
    let newField = {
      key: field.length,
      label: "",
      subLabel: "",
      type: "",
      defaultValue: "",
      enabled: false,
      required: false,
    };

    if (e.key === "0") {
      newField.type = "textArea";
      newField.value = "";
    }
    if (e.key === "1") {
      newField.type = "CheckBox";
      newField.singleSelect = false;
      newField.value = "";
    }
    if (e.key === "2") {
      newField.type = "textArea";
    }

    let fields = [...field];
    fields.push(newField);
    setField(fields);
  };

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
        setIsProfileCreated({ flag: true, id: "" });
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
          </div>
          <div
            className="text-white"
            style={{ backgroundColor: data.head_title_color }}
          >
            <p
              className="p-2 m-0 fs-5"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>Create Profile</strong>
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
            handleChangeCreateServiceModal={handleCreateService}
            profileId={isProfileCreated.id}
          />
        </Modal>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};
