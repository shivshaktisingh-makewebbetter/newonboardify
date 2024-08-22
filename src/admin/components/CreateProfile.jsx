import { Button, Input, Modal, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {
  createProfileEndPoint,
  getAllCustomers,
  getProfileListing,
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
  const [userConfirmationModal, setUserConfirmationModal] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [tempUser, setTempUser] = useState([]);
  const [profileData, setProfileData] = useState({
    title: "",
    users: [],
  });
  const navigate = useNavigate();
  const handleChangeProfileTitle = (event) => {
    setProfileData({ ...profileData, title: event.target.value });
  };

  const getListOfAllCustomers = async () => {
    try {
      const [customerResponse, profileResponse] = await Promise.all([
        getAllCustomers(),
        getProfileListing(),
      ]);

      if (customerResponse.success && profileResponse.success) {
        const customerList = customerResponse.data.response.map((item) => ({
          label: `${item.name} (${item.email}) / ${item.company_name}`,
          value: item.email,
          desc: "",
        }));

        const profileMap = new Map();
        profileResponse.data.response.forEach((profile) => {
          profile.users.split(",").forEach((userEmail) => {
            if (!profileMap.has(userEmail)) {
              profileMap.set(userEmail, []);
            }
            profileMap.get(userEmail).push(profile.title);
          });
        });

        customerList.forEach((customer) => {
          if (profileMap.has(customer.value)) {
            customer.desc = `Assigned to: ${profileMap
              .get(customer.value)
              .join(", ")}`;
          }
        });

        setUserListing(customerList);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleUserChange = (e) => {
    let tempDesc = "";
    if (e.length > profileData.users.length) {
      const missingElement = e.find(
        (element) => !profileData.users.includes(element)
      );

      userListing.forEach((item) => {
        if (item.value === missingElement) {
          tempDesc = item.desc;
        }
      });
    }
    if (tempDesc.length > 0) {
      setTempUser(e);
      setUserConfirmationModal(true);
      return;
    }
  
    setProfileData({ ...profileData, users: e });
  };

  const handleCreateProfile = async () => {
    let tempProfileId = "";
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
        setTimeout(() => {
          navigate("/admin/editprofile", {
            state: {
              profileId: tempProfileId,
              profileTitle: profileData.title,
              users: profileData.users.join(","),
            },
          });
        }, 2000);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigate("/admin/profile");
  };

  const handleConfirm = () => {
    setProfileData({ ...profileData, users: tempUser });
    setTempUser([]);
    setUserConfirmationModal(false);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    getListOfAllCustomers();
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
                filterOption={filterOption}
                optionRender={(option) => (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span> {option.data.label}</span>
                    <span> {option.data.desc}</span>
                  </div>
                )}
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
          open={userConfirmationModal}
          title="Assign User"
          centered
          footer={(_, record) => (
            <>
              <Button
                style={{
                  background: data.button_bg,
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  setTempUser([]);
                  setUserConfirmationModal(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
          onCancel={() => {
            setTempUser([]);
            setUserConfirmationModal(false);
          }}
        >
          <Typography>
            This user is already assigned to another user profile!
          </Typography>
        </Modal>

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
};
