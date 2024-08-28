import { Button, Input, Modal, Select, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  deleteServices,
  getAllBoards,
  getAllCustomers,
  getProfileListing,
  getServicesByProfileId,
  swapService,
  updateProfile,
  updateServiceVisibility,
} from "../../apiservice/ApiService";
import { Loader } from "../../common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateServices } from "./CreateServices";
import { EditServices } from "./EditServices";
import { DeleteModal } from "./DeleteModal";
import { ImageUpload } from "../../common/ImageUpload";

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

  const styles = {
    headerParent: {
      backgroundColor: data.head_title_color,
    },
    header: {
      padding: "10px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      color: "white",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
    headerFirst: {
      padding: "10px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      color: "white",
      paddingTop: "15px",
      paddingBottom: "15px",
      borderTopLeftRadius: "5px",
    },
    headerLast: {
      padding: "10px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
      color: "white",
      paddingTop: "15px",
      paddingBottom: "15px",
      borderTopRightRadius: "5px",
    },
    row: {
      backgroundColor: "#ffffff",
      transition: "background-color 0.3s ease",
    },
    cell: {
      padding: "8px",
      borderBottom: "1px solid #ddd",
      paddingTop: "15px",
      paddingBottom: "15px",
      textAlign: "left",
    },
    spanPadding: {
      paddingRight: "10px",
    },
  };
  const [draggedItem, setDraggedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userConfirmationModal, setUserConfirmationModal] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [tempUser, setTempUser] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [openService, setOpenService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [editServiceData, setEditServiceData] = useState({});
  const [profileData, setProfileData] = useState({
    title: location.state.profileTitle || "",
    users:
      location.state.users.length > 0
        ? location.state.users.split(",").map((item) => item.trim())
        : [],
    image: "",
    image_name: "",
  });
  const [deleteModalOpen, setDeleteMOdalOpen] = useState({
    flag: false,
    id: "",
  });
  const [boardIdOptions, setBoardIdOptions] = useState([]);
  const navigate = useNavigate();

  const handleEditModal = (item) => {
    const boardOptions = [...boardIdOptions];
    boardOptions.forEach((detail) => {
      if (detail.value === item.board_id) {
        detail.disabled = false;
      }
    });
    setBoardIdOptions(boardOptions);
    setEditServiceData(item);
    setEditService(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteMOdalOpen({ flag: true, id: id });
  };

  const getBoardTitle = (id) => {
    let tempBoardName = "";
    boardIdOptions.forEach((item) => {
      if (item.key === id) {
        tempBoardName = item.label;
      }
    });

    return tempBoardName;
  };

  const handleChangeProfileTitle = (event) => {
    setProfileData({ ...profileData, title: event.target.value });
  };

  const handleConfirm = () => {
    setProfileData({ ...profileData, users: tempUser });
    setTempUser([]);
    setUserConfirmationModal(false);
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


  function startsWithHttp(url) {
    return (
      url.toLowerCase().startsWith("http://") ||
      url.toLowerCase().startsWith("https://")
    );
  }

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let tempProfileData = {
        title: profileData.title,
        users: profileData.users.join(","),
        image:startsWithHttp(profileData.image)
        ? ""
        : profileData.image,
        image_name: startsWithHttp(profileData.image)
        ? ""
        : profileData.image_name,
      };

      const response = await updateProfile(
        location.state.profileId,
        JSON.stringify(tempProfileData)
      );
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleOpenService = () => {
    setOpenService(true);
  };


  const getAllServiceListing = async () => {
    const allAlreadyAssignedBoard = [];

    try {
      const response = await getServicesByProfileId(location.state.profileId);
      if (response.success) {
        setProfileData({
          ...profileData,
          image: response.data.response[0].file_location,
          image_name: response.data.response[0].image,
          users:
            response.data.response[0].users.length > 0
              ? response.data.response[0].users
                  .split(",")
                  .map((item) => item.trim())
              : [],
        });
      }
      if (response.success && response.data.response[0].services.length > 0) {
        setDataSource(response.data.response[0].services);
        response.data.response[0].services.forEach((item) => {
          allAlreadyAssignedBoard.push(item.board_id);
        });
      }
      if (response.success && response.data.response[0].services.length === 0) {
        setDataSource([]);
      }
      const response1 = await getAllBoards();
      if (response1.success) {
        let tempData = [];
        response1.data.response.boards.forEach((item) => {
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
            disabled: allAlreadyAssignedBoard.includes(item.id),
          });
        });
        setBoardIdOptions(tempData);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleDeleteService = async () => {
    setLoading(true);
    try {
      const response = await deleteServices(deleteModalOpen.id);
      if (response.success) {
        toast.success(response.message);
        setDeleteMOdalOpen({ flag: false, id: "" });
        await getAllServiceListing();
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

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetItem) => {
    e.preventDefault();
    let payloadData = [];

    const updatedData = [...dataSource];
    const fromIndex = updatedData.findIndex((i) => i.id === draggedItem.id);
    const toIndex = updatedData.findIndex((i) => i.id === targetItem.id);

    if (fromIndex !== toIndex) {
      const [removed] = updatedData.splice(fromIndex, 1);
      updatedData.splice(toIndex, 0, removed);
      dataSource.forEach((item, index) => {
        payloadData.push({ from: updatedData[index].id, to: index + 1 });
      });

      let payload = {
        service_categorie: payloadData,
      };
      setDataSource(updatedData);
      const response = await swapService(payload);
    }

    setDraggedItem(null);
  };

  const onChange = async (e, item) => {
    let payload = {
      id: item.id,
      service_visibility: e,
    };
    setLoading(true);
    try {
      const response = await updateServiceVisibility(payload);
      if (response.success) {
        await getAllServiceListing();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (data, imageName) => {
    setProfileData({ ...profileData, image: data, image_name: imageName });
  };

  useEffect(() => {
    getAllServiceListing();
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
            <div className="mt-10">
              <ImageUpload
                key={profileData.image}
                onFileSelect={handleFileSelect}
                imageName={profileData.image_name}
                imageUrl={profileData.image}
              />
            </div>
            <Button
              className="mt-10"
              style={{
                background: data.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleUpdateProfile}
            >
              Update
            </Button>
          </div>
        </div>

        {dataSource.length > 0 && (
          <div className="mt-10">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={styles.headerParent}>
                  {/* <th style={styles.headerFirst}>Index</th> */}
                  <th style={styles.headerFirst}>Title</th>
                  <th style={styles.header}>
                    <span style={styles.spanPadding}>|</span>Description
                  </th>
                  <th style={styles.header}>
                    <span style={styles.spanPadding}>|</span>Assign Board
                  </th>
                  <th style={styles.header}>
                    <span style={styles.spanPadding}>|</span>Visibility
                  </th>
                  <th style={styles.headerLast}>
                    <span style={styles.spanPadding}>|</span>Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSource.map((item) => {
                  return (
                    <tr
                      style={styles.row}
                      key={item.id}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, item)}
                      draggable
                    >
                      {/* <td style={styles.cell}>{item.id}</td> */}
                      <td style={styles.cell}>{item.title}</td>
                      <td style={styles.cell}>{item.description}</td>
                      <td style={styles.cell}>
                        {getBoardTitle(item.board_id)}
                      </td>
                      <td style={styles.cell}>
                        <Switch
                          checked={
                            item.service_visibility === undefined ||
                            item.service_visibility === null
                              ? false
                              : item.service_visibility
                          }
                          onChange={(e) => onChange(e, item)}
                        />
                      </td>
                      <td>
                        {" "}
                        <Button
                          className="governify-delete-icon"
                          type="plain"
                          icon={<EditOutlined />}
                          onClick={() => handleEditModal(item)}
                        ></Button>
                        <Button
                          className="governify-delete-icon"
                          type="plain"
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteModal(item.id)}
                        ></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          open={openService}
          centered
          footer={(_) => <></>}
          onCancel={() => {
            setOpenService(false);
          }}
          style={{ overflowY: "auto", maxHeight: "600" }}
          width={800}
        >
          <CreateServices
            closeModal={() => {
              setOpenService(false);
            }}
            profileId={location.state.profileId}
            getAllServiceListing={getAllServiceListing}
            key={uuidv4()}
            boardIdOptions={boardIdOptions}
          />
        </Modal>
        <Modal
          open={editService}
          centered
          footer={(_) => <></>}
          onCancel={() => {
            setEditService(false);
          }}
          width={800}
        >
          <EditServices
            closeModal={() => {
              setEditService(false);
            }}
            key={editServiceData.id}
            profileId={location.state.profileId}
            getAllServiceListing={getAllServiceListing}
            editServiceData={editServiceData}
            boardIdOptions={boardIdOptions}
          />
        </Modal>
        {deleteModalOpen.flag && (
          <DeleteModal
            open={deleteModalOpen.flag}
            handleCancel={() => {
              setDeleteMOdalOpen({ flag: false, id: "" });
            }}
            handleDelete={handleDeleteService}
            message={"Are you sure you want to delete this Service?"}
          />
        )}

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
