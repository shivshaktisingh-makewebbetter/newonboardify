import { Button, Card, Input, Select, Switch, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { fetcher } from "../../utils/helper";
import { DeleteOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../apiservice/ApiService";

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
  const [categoryListing, setCategoryListing] = useState([]);
  const [userListing , setUserListing] = useState([]);
  const [categoryServicesMapping, setCategoryServicesMapping] = useState([
    {
      category_id: "",
      services_id: "",
    },
  ]);

  const handleDeleteField = (subItem) => {
    let tempField = field.filter((item) => item.key !== subItem.key);
    setField(tempField);
  };

  const handleChangeLabel = (event, index) => {
    const tempField = [...field];
    tempField[index].label = event.target.value;
    setField(tempField);
  };

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

  const handleChangeFormName = (event) => {
    setFormDetail({ ...formDetail, formName: event.target.value });
  };

  const onChangeUploadSettingsEnabled = (index) => {
    const updatedFields = field.map((item, idx) => {
      if (idx === index) {
        if (item.enabled) {
          return { ...item, type: "textArea", enabled: false };
        } else {
          return { ...item, type: "image", enabled: true };
        }
      } else {
        if (item.type === "CheckBox") {
          return item;
        } else {
          return { ...item, type: "textArea", enabled: false };
        }
      }
    });
    setField(updatedFields);
  };

  const onChangeRequiredSettingsEnabled = (index) => {
    const updatedField = [...field];
    updatedField[index].required = !updatedField[index].required;
    setField(updatedField);
  };

  const onChangeSingleSelectEnabled = (index) => {
    const updatedField = [...field];
    updatedField[index].singleSelect = !updatedField[index].singleSelect;
    setField(updatedField);
  };

  const handleChangeLabelOfDocuments = (event, index) => {
    let tempField = [...field];
    tempField[index].subLabel = event.target.value;
    setField(tempField);
  };


 
  const handleCategoryChange = (e, index) => {
    const tempData = [...categoryServicesMapping];
    let tempSelectedServices = [];
    tempData[index].category_id = e;
    tempData[index].services_id = "";
    tempData.forEach((item) => {
      tempSelectedServices.push(item.services_id);
    });
    

    setCategoryServicesMapping(tempData);
  };


  const getListOfAllCustomers = async() =>{
    const tempUser = [];
    try{
      const response = await getAllCustomers();
      if(response.success){
        response.data.response.forEach((item)=>{
           tempUser.push({label:item.name , value:item.email});
        })
        setUserListing(tempUser);
      }
    }catch(err){

    }finally{

    }
   
  }



  



  useEffect(() => {
    getListOfAllCustomers()
  
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

  return (
    <>
      <div style={{ width: "100%", marginTop: "25px" }}>
        <div>
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
          <div
            className="form_wrapper border border-success p-4 primary-shadow"
            style={{ height: "600px", overflowY: "auto" }}
          >
            <Input
              placeholder="Profile name"
              className="mt-10"
              onChange={(e) => handleChangeFormName(e)}
              addonBefore="Profile Name"
              value={formDetail.formName}
            />

            <div className="mt-10">
              {categoryServicesMapping.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="mt-10">
                      <Select
                        showSearch
                        placeholder={"Select User"}
                        style={{ width: "100%", borderRadius: "10px" }}
                        popupMatchSelectWidth={false}
                        placement="bottomLeft"
                        onChange={(e) => handleCategoryChange(e, index)}
                        options={categoryListing}
                        value={""}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              {field.map((item, index) => {
                if (item.type === "textArea") {
                  return (
                    <Card className="mt-10" key={index}>
                      <Input
                        className="mt-10"
                        placeholder="Label"
                        value={item.label}
                        onChange={(event) => handleChangeLabel(event, index)}
                        addonBefore="Label"
                      />
                      <div className="mt-10">
                        <span>Enable Documents Upload</span>
                        <Switch
                          className="ml-10"
                          onChange={() => onChangeUploadSettingsEnabled(index)}
                          value={item.enabled}
                        />
                      </div>
                      <div className="mt-10">
                        <span>Make Field Required</span>
                        <Switch
                          className="ml-10"
                          onChange={() =>
                            onChangeRequiredSettingsEnabled(index)
                          }
                          value={item.required}
                        />
                      </div>
                      <div className="mt-10">
                        {item.enabled && (
                          <textarea
                            style={{ width: "100%" }}
                            value={item.subLabel}
                            onChange={(event) =>
                              handleChangeLabelOfDocuments(event, index)
                            }
                            placeholder="Enter points (one per line)"
                            rows={5}
                            cols={50}
                          />
                        )}
                      </div>
                      <Button
                        className="mt-10"
                        onClick={() => handleDeleteField(item)}
                      >
                        Delete
                      </Button>
                    </Card>
                  );
                } else if (item.type === "CheckBox") {
                  return (
                    <Card className="mt-10" key={index}>
                      <Input
                        className="mt-10"
                        placeholder="Label"
                        value={item.label}
                        onChange={(event) => handleChangeLabel(event, index)}
                        addonBefore="Label"
                      />

                      <div className="mt-10">
                        <span>Make Field Required</span>
                        <Switch
                          className="ml-10"
                          onChange={() =>
                            onChangeRequiredSettingsEnabled(index)
                          }
                          value={item.required}
                        />
                      </div>
                      <div className="mt-10">
                        <span>Enable Single Select</span>
                        <Switch
                          className="ml-10"
                          onChange={() => onChangeSingleSelectEnabled(index)}
                          value={item.singleSelect}
                        />
                      </div>
                      <div className="mt-10">
                        <textarea
                          style={{ width: "100%" }}
                          value={item.subLabel}
                          onChange={(event) =>
                            handleChangeLabelOfDocuments(event, index)
                          }
                          placeholder="Enter options for checkbox separated by comma"
                          rows={5}
                          cols={50}
                        />
                      </div>
                      <Button
                        className="mt-10"
                        onClick={() => handleDeleteField(item)}
                      >
                        Delete
                      </Button>
                    </Card>
                  );
                } else {
                  return (
                    <Card className="mt-10" key={index}>
                      <Input
                        className="mt-10"
                        placeholder="Label"
                        value={item.label}
                        onChange={(event) => handleChangeLabel(event, index)}
                        addonBefore="Label"
                      />
                      <div className="mt-10">
                        <span>Enable Documents Upload</span>
                        <Switch
                          className="ml-10"
                          onChange={() => onChangeUploadSettingsEnabled(index)}
                          value={item.enabled}
                        />
                      </div>
                      <div className="mt-10">
                        <span>Make Field Required</span>
                        <Switch
                          className="ml-10"
                          onChange={() =>
                            onChangeRequiredSettingsEnabled(index)
                          }
                          value={item.required}
                        />
                      </div>
                      <div className="mt-10">
                        {item.enabled && (
                          <textarea
                            style={{ width: "100%" }}
                            value={item.subLabel}
                            onChange={(event) =>
                              handleChangeLabelOfDocuments(event, index)
                            }
                            placeholder="Enter points (one per line)"
                            rows={5}
                            cols={50}
                          />
                        )}
                      </div>
                      <Button
                        className="mt-10"
                        onClick={() => handleDeleteField(item)}
                      >
                        Delete
                      </Button>
                    </Card>
                  );
                }
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              {field.length > 0 && (
                <Button
                  className="mt-10"
                  style={{
                    background: data.button_bg,
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={publishForm}
                >
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
