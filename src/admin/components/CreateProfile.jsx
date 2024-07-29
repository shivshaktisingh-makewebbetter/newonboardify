import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {
  createProfileEndPoint,
  getAllCustomers,
} from "../../apiservice/ApiService";
import { Loader } from "../../common/Loader";
import { useNavigate } from "react-router-dom";

export const CreateProfile = () => {
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
  const [profileData, setProfileData] = useState({
    title: "",
    users: [],
  });
  const navigate = useNavigate();
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

  const handleUserChange = (e) => {
    setProfileData({ ...profileData, users: e });
  };

  const handleCreateProfile = async () => {
    let tempProfileId ='';
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
        tempProfileId = response.data.response[0].id;
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
      navigate("/admin/editprofile", {
        state: {
          profileId: tempProfileId,
          profileTitle: profileData.title,
          users: profileData.users,
        },
      });
    }
  };

  const handleBackNavigation = () => {
    navigate("/admin/profile");
  };

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
              onClick={handleBackNavigation}
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

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};
