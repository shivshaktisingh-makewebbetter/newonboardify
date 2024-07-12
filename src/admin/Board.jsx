import { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Hero } from "../components/Hero";
import {
  getAllBoards,
  getBoardColorMapping,
  getBoardVisibilityData,
  setAllColorMapping,
} from "../apiservice/ApiService";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const tempData = {
  board: "1522000947",
  email: "",
  onboarding_columns: [
    {
      id: "status7",
      name: "Visa / E-wakala",
      icon: "",
      custom_title: "",
    },
    {
      id: "status1",
      name: "Medical Test",
      icon: "",
      custom_title: "",
    },
    {
      id: "status6",
      name: "Police Clearance",
      icon: "",
      custom_title: "",
    },
    {
      id: "status4",
      name: "Visa Issuance",
      icon: "",
      custom_title: "",
    },
    {
      id: "status54",
      name: "Degree Attestation",
      icon: "",
      custom_title: "",
    },
    {
      id: "status__1",
      name: "Profession Accreditation",
      icon: "",
      custom_title: "",
    },
    {
      id: "status6__1",
      name: "Embassy Appointment",
      icon: "",
      custom_title: "",
    },
  ],
  candidate_coulmns: [
    {
      id: "country34",
      name: "Nationality",
      icon: "bi bi-flag-fill",
      custom_title: "",
    },
    {
      id: "country3",
      name: "Country of Residency",
      icon: "bi bi-geo-alt-fill",
      custom_title: "",
    },
    {
      id: "phone",
      name: "Candidate Contact Number (Whatsapp Number)",
      icon: "bi bi-telephone-fill",
      custom_title: "",
    },
    {
      id: "email",
      name: "Candidate Email Address",
      icon: "bi bi-envelope-fill",
      custom_title: "",
    },
    {
      id: "date",
      name: "Joining Date",
      icon: "bi bi-calendar-plus-fill",
      custom_title: "Joining Date",
    },
  ],
  sub_headings_column: [
    {
      id: "single_select",
      name: "Hiring Type",
      icon: "",
      custom_title: "",
    },
    {
      id: "short_text1",
      name: "Profession",
      icon: "",
      custom_title: "",
    },
  ],
  card_section: {
    column1: "single_select",
    column2: "short_text1",
  },
  required_columns: {
    profession: "short_text1",
    overall_status: "status8",
  },
  extra_details: {
    key: "long_text3",
    time_stamp: "",
    chart_embed_code:
      '<iframe src="https://view.monday.com/embed/1522000947-1ade433e75d418767a6f5de799269d2a?r=euc1" width=770 height=500 style="border: 0; box-shadow: 5px 5px 56px 0px rgba(0,0,0,0.25);"></iframe>',
    form_embed_code:
      '<iframe src="https://forms.monday.com/forms/embed/d9988af61b00bf456399fb8cbcc157cd?r=euc1" width="650" height="500" style="border: 0; box-shadow: 5px 5px 56px 0px rgba(0,0,0,0.25);"></iframe>',
  },
};

export const Board = () => {
  const [boardListing, setBoardListing] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [colorMappingData, setColorMappingData] = useState([]);
  const colorObject = {
    STUCK: "#F4221F",
    "IN PROGRESS": "#F4981F",
    COMPLETED: "#29CF10",
  };

  const navigate = useNavigate();

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

  const fetchAllBoards = async () => {
    try {
      const response = await getAllBoards();
      if (response.success) {
        const tempData = [];
        response.data.response.data.boards.forEach((item) => {
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
        // console.log(tempData)
        setBoardListing(tempData);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleBoardChange = async (e) => {
    setSelectedBoardId(e);
    const response = await getBoardVisibilityData(e);
    console.log(response, "response");
  };

  const fetchAllColorMapping = async () => {
    try {
      const response = await getBoardColorMapping();
      if (response.success) {
        setColorMappingData(response.data.response);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const formattedData = (tempData) => {
    return tempData.join(",");
  };

  const handleChangeColorMappingStatus = (e, key) => {
    let tempColorMappingData = [...colorMappingData];
    const tempData = e.target.value.split(",");

    tempColorMappingData.forEach((item) => {
      if (item.hasOwnProperty(key)) {
        item[key] = tempData;
      }
    });
    setColorMappingData(tempColorMappingData);
  };

  const handleColorSubmit = async () => {
    const result = {};
    colorMappingData.forEach((item) => {
      const [key, values] = Object.entries(item)[0];
      result[key] = values;
    });
    const response = await setAllColorMapping(JSON.stringify(result));
    console.log(response, "response");
  };

  const handleBoardSubmit = () =>{

  }

  useEffect(() => {
    fetchAllBoards();
    fetchAllColorMapping();
  }, []);

  return (
    <div className="pt-84">
      {/* {loading && <Loader />} */}
      <Hero
        heading={"Board Visibility"}
        subheading="Column restrictions can be set per board by selecting respective column boards."
        forHome={true}
      />
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
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Manage Board Settings" bordered={true} className="primary-shadow">
              <div>
                <p style={{ textAlign: "left" }}>Select Board</p>
                <Select
                  placeholder={"Select Board"}
                  style={{ width: "100%", borderRadius: "10px" }}
                  popupMatchSelectWidth={false}
                  placement="bottomLeft"
                  onChange={handleBoardChange}
                  options={boardListing}
                  value={selectedBoardId}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Input addonBefore="Form Embed Code" />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Input addonBefore="Chart Embed Code" />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>User SubHeading Columns</p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={() => {}}
                  options={[{ label: "dsa", value: "asd" }]}
                />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>Onboarding Status Columns</p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={() => {}}
                  options={[{ label: "dsa", value: "asd" }]}
                />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>
                  Candidate Information Columns
                </p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={() => {}}
                  options={[{ label: "dsa", value: "asd" }]}
                />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>
                  Provide candidate column details :{" "}
                  <a href="https://icons.getbootstrap.com/" target="_blank">
                    Go to icons library
                  </a>
                </p>
                {tempData.candidate_coulmns.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #d9d9d9",
                        padding: "10px",
                        borderRadius: "10px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <p style={{ textAlign: "left" }}>For {item.name}</p>
                      <Input addonBefore="Column Icon" />
                      <Input addonBefore="Column Title" />
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>Onboarding Updates</p>
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  onChange={() => {}}
                  options={[{ label: "dsa", value: "asd" }]}
                />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }} className="border-bottom">
                  Card Columns
                </p>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ textAlign: "left" }}>Top Details Columns</p>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={() => {}}
                    options={[{ label: "dsa", value: "asd" }]}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ textAlign: "left" }}>Mid Heading Columns</p>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={() => {}}
                    options={[{ label: "dsa", value: "asd" }]}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }} className="border-bottom">
                  Required Columns ( For Search and Filter)
                </p>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ textAlign: "left" }}>Profession column</p>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={() => {}}
                    options={[{ label: "dsa", value: "asd" }]}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ textAlign: "left" }}>Overall Status column</p>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    onChange={() => {}}
                    options={[{ label: "dsa", value: "asd" }]}
                  />
                </div>
              </div>
              <div style={{marginTop:"10px"}}>
                <Button
                  style={{
                    width: "100%",
                    background: settingData.button_bg,
                    color: "white",
                  }}
                  onClick={handleBoardSubmit}
                >
                  Submit
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Manage Status Background" bordered={true} className="primary-shadow">
              {colorMappingData.map((item, index) => {
                return (
                  <div key={index} style={{ paddingBottom: "20px" }}>
                    {Object.keys(item).map((key) => {
                      return (
                        <div key={key}>
                          <h5
                            className="p-2 "
                            style={{
                              borderRadius: "20%",
                              borderLeft: `10px solid ${colorObject[key]}`,
                              textAlign: "left",
                            }}
                          >
                            Color: {key}
                          </h5>

                          <textarea
                            className="form-control"
                            style={{ padding: "10px" }}
                            value={formattedData(item[key])}
                            onChange={(e) =>
                              handleChangeColorMappingStatus(e, key)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <Button
                style={{
                  width: "100%",
                  background: settingData.button_bg,
                  color: "white",
                }}
                onClick={handleColorSubmit}
              >
                Submit
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
