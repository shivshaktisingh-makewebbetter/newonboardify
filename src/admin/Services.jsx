import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { CreateServices } from "./CreateServices";
// import { fetcher } from "../../utils/helper";
// import { EditServices } from "./EditServices";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { SwitchServices } from "./SwitchServices";
import { ToastContainer } from "react-toastify";
import { CreateServices } from "./CreateServices";
import {
  deleteServiceRequest,
  getServiceRequestListing,
} from "../apiservice/ApiService";
import { EditServices } from "./EditServices";

export const Services = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editData, setEditData] = useState({});
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [editServiceModal, setEditServiceModal] = useState(false);
  const [deleteServiceModal, setDeleteServiceModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const settingsData = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const navigate = useNavigate();

  const handleEditService = (item) => {
    setEditData(item);
    setEditServiceModal(true);
  };

  const handleDeleteService = (item) => {
    setDeleteData(item);
    setDeleteServiceModal(true);
  };

  const handleDeleteServiceApi = async () => {
    try {
      const response = await deleteServiceRequest(deleteData.id);
      if (response.success) {
        setDeleteServiceModal(false);
      }
    } catch (err) {
    } finally {
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Linked Form",
      dataIndex: "form_embed_code",
      key: "form",
      width: "25%",
    },
    {
      title: "Linked Board",
      dataIndex: "board_id",
      key: "board",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "center" }}>Action</div>
      ),
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button
            className="governify-edit-icon"
            type="plain"
            icon={<EditOutlined />}
            onClick={() => handleEditService(record)}
          ></Button>
          <Button
            className="governify-delete-icon"
            type="plain"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteService(record)}
          ></Button>
        </div>
      ),
      width: "10%",
    },
  ];

  //   const handleCreateCategory = () => {
  //     setModalOpen(true);
  //     setShowSkeleton(true);
  //   };

  //   const handleDeleteCategory = async (item) => {
  //     setDeleteFormData(item);
  //     setDeleteModalOpen(true);
  //   };

  //   const handleCancelDelete = () => {
  //     setDeleteFormData({});
  //     setDeleteModalOpen(false);
  //   };

  //   const deleteCategory = async () => {
  //     setLoading(true);
  //     let method = "DELETE";
  //     let url = `governify/admin/serviceRequests/${deleteFormData.id}`;

  //     try {
  //       const response = await fetcher(url, method);

  //       if (response.status) {
  //         setShowSkeleton(true);
  //         setDeleteModalOpen(false);
  //         setDeleteFormData({});
  //       }
  //     } catch (err) {
  //       console.log(err, "error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const getForms = async () => {
  //     let url = "governify/admin/serviceRequests";
  //     let method = "GET";
  //     const response = await fetcher(url, method);
  //     try {
  //       if (response.status) {
  //         setDataSource(response.response);
  //         setShowSkeleton(false);
  //       }
  //     } catch (err) {
  //       throw new Error("Network response was not ok ", err);
  //     } finally {
  //     }
  //   };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleChangeCreateServiceModal = () => {
    setCreateServiceModal(!createServiceModal);
  };

  const handleChangeEditServiceModal = () => {
    setEditServiceModal(!editServiceModal);
  };

  const handleChangeDeleteServiceModal = () => {
    setDeleteServiceModal(!deleteServiceModal);
  };

  const getAllServices = async () => {
    try {
      const response = await getServiceRequestListing();
      if (response.success) {
        setDataSource(response.data.response);
      }
    } catch (err) {
    } finally {
    }
  };

  //   const handleSwitchCategory = () => {
  //     setSwapModal(!swapModal);
  //   };

  //   const updateDataSource = (tempData) => {
  //     setDataSource(tempData);
  //   };

  //   useEffect(() => {
  //     if (showSkeleton) {
  //       getForms();
  //     }
  //   }, [showSkeleton]);

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="mt-100">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <Button
            icon={
              <LeftOutlined
                style={{
                  color: settingsData.button_bg,
                  borderColor: settingsData.button_bg,
                }}
              />
            }
            onClick={handleBackNavigation}
          ></Button>
        </div>
        <div>
          <Button
            style={{
              borderColor: settingsData.button_bg,
              color: settingsData.button_bg,
            }}
            onClick={handleChangeCreateServiceModal}
          >
            + Create Services
          </Button>
        </div>
      </div>
      <Table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          maxWidth: "1320px",
          overflowX: "auto",
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showTotal: (total) => `Total ${total} items`,
          defaultPageSize: 5,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultCurrent: 1,
        }}
      />
      <Modal
        open={createServiceModal}
        centered
        footer={(_) => <></>}
        onCancel={handleChangeCreateServiceModal}
        className="width-80"
      >
        <CreateServices
          handleChangeCreateServiceModal={handleChangeCreateServiceModal}
        />
      </Modal>
      <Modal
        open={editServiceModal}
        centered
        footer={(_) => <></>}
        onCancel={handleChangeEditServiceModal}
      >
        <EditServices
          data={editData}
          key={editData.id}
          handleChangeEditServiceModal={handleChangeEditServiceModal}
        />
      </Modal>

      {/*     <Modal
        open={swapModal}
        centered
        footer={(_) => <></>}
        onCancel={() => setSwapModal(false)}
      >
        <SwitchServices
          data={dataSource}
          setShowSkeleton={setShowSkeleton}
          setLoading={setLoading}
          loading={loading}
          setSwapModal={setSwapModal}
          updateDataSource={updateDataSource}
        />
      </Modal> */}

      <Modal
        open={deleteServiceModal}
        title="Delete Service"
        centered
        footer={(_, record) => (
          <>
            <Button
              style={{
                background: settingsData.button_bg,
                color: "#fff",
                border: "none",
              }}
              onClick={handleDeleteServiceApi}
            >
              Delete
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={handleChangeDeleteServiceModal}
            >
              Cancel
            </Button>
          </>
        )}
        onCancel={handleChangeDeleteServiceModal}
      >
        <Typography>Are you sure you want to delete this Service?</Typography>
      </Modal>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
