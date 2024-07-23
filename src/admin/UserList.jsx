import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import {
  assignBoard,
  deleteUser,
  getAllBoards,
  getUserList,
} from "../apiservice/ApiService";
import { Button, Select, Table } from "antd";
import { extractDateTime, roleData } from "../utils/helper";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { SearchBox } from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
import { CopyText } from "./components/CopyText";
import { DeleteModal } from "./components/DeleteModal";
import { Loader } from "../common/Loader";
import { ToastContainer } from "react-toastify";

export const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cloneDataSource, setCloneDataSource] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [boardListing, setBoardListing] = useState([]);
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

  const handleBoardChange = async (item, e) => {
    let tempData = JSON.stringify({
      user_id: item.id,
      board_id: e,
      email_id: item.email,
    });
    try {
      setLoading(true);
      const response = await assignBoard(tempData);
      if (response.success) {
        await fetchUserListing();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (item) => {
    navigate(`/forgot?email=${item.email}`);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Company Name",
      dataIndex: "company",
      // sorter: (a, b) => a.age - b.age,
      // sortDirections: ["descend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      // sorter: (a, b) => a.age - b.age,
      // sortDirections: ["descend"],
      render: (_, record) => <CopyText email={record.email} />,
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
            onChange={(e) => handleBoardChange(record, e)}
            options={boardListing}
            value={record.boardId}
          />
        </>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      // sorter: (a, b) => a.age - b.age,
      // sortDirections: ["descend"],
    },
    {
      title: "Role",
      dataIndex: "role",
      // sorter: (a, b) => a.age - b.age,
      // sortDirections: ["descend"],
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
    },
  ];

  const fetchUserListing = async () => {
    setLoading(true);
    try {
      const response = await getUserList();
      const response1 = await getAllBoards();
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
            role: roleData[item.role],
            phone: item.phone,
            boardId: item.board_id,
          });
        });
        setDataSource(tempData);
        setCloneDataSource(tempData);
      }
      if (response1.success) {
        const tempData = [];
        response1.data.response.boards.forEach((item) => {
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
  
        setBoardListing(tempData);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const fetchBoardListing = async () => {
    const response = await getAllBoards();
    if (response.success) {
      const tempData = [];
      response.data.response.boards.forEach((item) => {
        tempData.push({
          key: item.id,
          label: item.name,
          value: item.id,
        });
      });

      setBoardListing(tempData);
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

  useEffect(() => {
    fetchUserListing();
    fetchBoardListing();
  }, []);

  useEffect(() => {
    const cloneData = [...cloneDataSource];
    const tempSearchData = [];
    if (searchData.length > 0) {
      cloneData.forEach((item) => {
        if (item.name.toLowerCase().includes(searchData.toLowerCase()) || item.email.toLowerCase().includes(searchData.toLowerCase())) {
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
        heading={"Overall Status"}
        subheading="Stay informed and in control of the overall status of your onboarding requests"
        forHome={true}
      />
      <div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "start",
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
        </div>

        <div style={{ marginBottom: "20px" }}>
          <SearchBox
            placeHolder={"Start Typing To Search By Name"}
            setSearchData={setSearchData}
          />
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
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
      {open && (
        <DeleteModal
          open={open}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}
         <ToastContainer position="bottom-right" />
    </div>
  );
};
