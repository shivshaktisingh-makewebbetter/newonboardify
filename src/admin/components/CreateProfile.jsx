import { Button, Input, Select, Dropdown, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { fetcher } from "../../utils/helper";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  createProfileEndPoint,
  getAllCustomers,
} from "../../apiservice/ApiService";

export const CreateProfile = ({ setLoading, loading, setModalOpen }) => {
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
  const [formDetail, setFormDetail] = useState({ formName: "" });
  const [userListing, setUserListing] = useState([]);
  const [dataSource, setDataSource] = useState([]);
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
      title: "Description",
      dataIndex: "description",
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

  const publishForm = async () => {
    let flag = false;
    let method = "POST";
    let url = "governify/admin/serviceRequestForms";
    let message = "";
    let categoryData = {
      name: formDetail.formName,
      form_data: field,
      category_services_mapping: categoryServicesMapping,
    };

    field.forEach((item) => {
      if (item.label === "") {
        flag = true;
        message = "Please Enter all the label of Form";
        return;
      }
      if (
        (item.type === "image" || item.type === "Document") &&
        item.subLabel === ""
      ) {
        flag = true;
        message = "Please Enter the SubLabel for Document";
        return;
      }
    });

    if (flag) {
      toast.error(message);
      return;
    }

    field.forEach((item) => {
      if (item.type === "CheckBox") {
        if (item.subLabel === "") {
          flag = true;
          message = "Please Enter Options for Checkbox";
          return;
        }
      }
    });

    if (flag) {
      toast.error(message);
      return;
    }

    let payload = JSON.stringify(categoryData);

    try {
      const response = await fetcher(url, method, payload);
      if (response.status) {
        setModalOpen(false);
        toast.success("Form Created Successfully.");
        setField([]);
        setCategoryServicesMapping([{ category_id: "", services_id: "" }]);
        setFormDetail({ formName: "" });
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Error");
      console.log(err, "error");
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

  const items = [
    // {
    //   label: "Text Box",
    //   key: "0",
    // },
    // {
    //   label: "CheckBox",
    //   key: "1",
    // },
    // {
    //   label: "Document",
    //   key: "2",
    // },
  ];
  const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ["9"],
    onClick: handleMenuClick,
  };

  const handleUserChange = (e) => {
    setProfileData({ ...profileData, users: e });
  };

  const handleCreateProfile = async () => {
    try {
      let tempProfileData = {
        title: profileData.title,
        users: profileData.users.join(","),
      };
      const response = await createProfileEndPoint(
        JSON.stringify(tempProfileData)
      );
      if (response.success) {
        toast.success('New profile Created.')
      }else{
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <>
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

              <Dropdown menu={menuProps}>
                <Button
                  type="text"
                  style={{ border: "none", background: "white" }}
                  icon={<PlusOutlined />}
                  iconPosition="start"
                >
                  <Space>Add Services</Space>
                </Button>
              </Dropdown>
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
      </div>
    </>
  );
};
