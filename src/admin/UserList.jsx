import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import {
  deleteUser,
  exportUserData,
  getUserList,
} from "../apiservice/ApiService";
import { Button, Table } from "antd";
import { extractDateTime, roleData } from "../utils/helper";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CopyText } from "./components/CopyText";
import { DeleteModal } from "./components/DeleteModal";
import { Loader } from "../common/Loader";
import { ToastContainer } from "react-toastify";
import { NewSearchBox } from "../common/New SearchBox";

export const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cloneDataSource, setCloneDataSource] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

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

  const handleOpenModal = (item) => {
    setUserToDelete(item);
    setOpen(true);
  };

  const handleForgotPassword = (item) => {
    navigate(`/forgot?email=${item.email}`);
  };

  const columns = [
    {
      title: "Account ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <CopyText email={record.email} />,
      width: 300,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
    },
    // {
    //   title: "Email Verification Date",
    //   dataIndex: "role",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Source",
      dataIndex: "utm_source",
      width: 150,
    },

    {
      title: "Creation Date",
      dataIndex: "createdAt",
      width: 100,
    },
    {
      title: "Last Update",
      dataIndex: "updated_at",
      width: 100,
    },

    {
      title: "Forgot Pass",
      dataIndex: "",
      render: (_, record) => (
        <Button
          className="governify-delete-icon"
          type="plain"
          icon={<i className="bi bi-send-arrow-up-fill"></i>}
          onClick={() => handleForgotPassword(record)}
        ></Button>
      ),
      width: 100,
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
          onClick={() => handleOpenModal(record)}
        ></Button>
      ),
      width: 80,
      fixed: "right",
    },
  ];

  const fetchUserListing = async () => {
    setLoading(true);
    try {
      const response = await getUserList();
      if (response.success) {
        const tempData = [];
        response.data.response.forEach((item) => {
          tempData.push({
            key: item.id,
            id: item.id,
            name: item.name,
            email: item.email,
            company: item.company_name,
            createdAt: extractDateTime(item.created_at),
            updated_at: extractDateTime(item.updated_at),
            role: roleData[item.role],
            phone: item.phone,
            boardId: item.board_id,
            utm_campaign: item.utm_campaign,
            utm_source: item.utm_source,
            utm_medium: item.utm_medium,
            status: item.status === 1 ? "Verified" : "Not Verified",
          });
        });
        setDataSource(tempData);
        setCloneDataSource(tempData);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleCancel = () => {
    setOpen(false);
    setUserToDelete({});
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteUser(userToDelete.id);
      if (response.success) {
        setOpen(false);
        setUserToDelete({});
        fetchUserListing();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleExportUser = async () => {
    setLoading(true);
    try {
      const data = [];
      const response = await exportUserData();
      const tempResult = response.data.split("\n");
      tempResult.forEach((item) => {
        data.push(item);
      });

      const csvContent = data.join("\n");

      // Create a Blob from the CSV string
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");

      // Append the link to the body (necessary for Firefox)
      document.body.appendChild(link);

      // Trigger the download by simulating a click on the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (err) {
    } finally {
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserListing();
  }, []);

  useEffect(() => {
    const cloneData = [...cloneDataSource];
    const tempSearchData = [];
    if (searchData.length > 0) {
      cloneData.forEach((item) => {
        if (
          item.name.toLowerCase().includes(searchData.toLowerCase()) ||
          item.email.toLowerCase().includes(searchData.toLowerCase())
        ) {
          tempSearchData.push(item);
        }
      });
      setDataSource(tempSearchData);
    } else {
      setDataSource(cloneData);
    }
  }, [searchData]);
  return (
    <div className="pt-84">
      {loading && <Loader />}
      <Hero
        heading={"User Listing"}
        subheading="Stay informed and control  the users of onboardify"
        forHome={true}
      />
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
          ></Button>
          <Button
            style={{
              color: settingData.button_bg,
              borderColor: settingData.button_bg,
            }}
            onClick={handleExportUser}
          >
            Export
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <NewSearchBox
            placeHolder={"Start Typing To Search By Name"}
            setSearchData={setSearchData}
            flag={false}
          />
        </div>
        <Table
          scroll={{ x: 768 }}
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          showSorterTooltip={{
            target: "sorter-icon",
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
      {open && (
        <DeleteModal
          open={open}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          message={"Are you sure you want to delete this User?"}
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
