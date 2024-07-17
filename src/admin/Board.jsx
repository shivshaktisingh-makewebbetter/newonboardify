import { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Hero } from "../components/Hero";
import {
  getAllBoards,
  getBoardColorMapping,
  getBoardVisibilityData,
  getCompleteDataForBoardVisibility,
  setAllColorMapping,
  setBoardVisibilityDataEndpoint,
} from "../apiservice/ApiService";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Board = () => {
  const [boardListing, setBoardListing] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [colorMappingData, setColorMappingData] = useState([]);
  const [boardVisiblityData, setBoardVisibilityData] = useState();
  const colorObject = {
    STUCK: "#F4221F",
    "IN PROGRESS": "#F4981F",
    COMPLETED: "#29CF10",
  };
  const [options, setOptions] = useState([]);

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
        let tempData = [];
        response.data.response.boards.forEach((item) => {
          console.log(item , 'item')
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
        setBoardListing(tempData);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleBoardChange = async (e) => {
    setSelectedBoardId(e);
    const response = await getBoardVisibilityData(e);

    const response1 = await getCompleteDataForBoardVisibility(e);

    if (response.success && response.data.response.length > 0) {
      setBoardVisibilityData(JSON.parse(response.data.response[0].columns));
    }
    if (response1.success && response1.data.response.length > 0) {
      let optionData = [];
      response1.data.response.forEach((item) => {
        optionData.push({ label: item.title, value: item.id });
      });
      setOptions(optionData);
    }
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
  };

  const handleBoardSubmit = async() => {
    const tempData = {...boardVisiblityData};
    tempData.email = '';
     const response = await setBoardVisibilityDataEndpoint(JSON.stringify(tempData));
     console.log(response);
  };

  const handleChangeFormEmbedCode = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.extra_details.form_embed_code = e.target.value;
    setBoardVisibilityData(tempData);
  };

  const handleChangeChartEmbedCode = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.extra_details.chart_embed_code = e.target.value;
    setBoardVisibilityData(tempData);
  };

  const handleUserHeadingColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = [];
    options.forEach((item) => {
      if (e.includes(item.value)) {
        selectedData.push({
          id: item.value,
          name: item.label,
          icon: "",
          custom_title: "",
        });
      }
    });
    tempData.sub_headings_column = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeOnboardingStatusColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = [];
    options.forEach((item) => {
      if (e.includes(item.value)) {
        selectedData.push({
          id: item.value,
          name: item.label,
          icon: "",
          custom_title: "",
        });
      }
    });
    tempData.onboarding_columns = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeCandidateColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = [];
    options.forEach((item) => {
      if (e.includes(item.value)) {
        selectedData.push({
          id: item.value,
          name: item.label,
          icon: "",
          custom_title: "",
        });
      }
    });
    tempData.candidate_columns = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeIcon = (e, item) => {
    const tempData = { ...boardVisiblityData };
    tempData.candidate_columns.forEach((subItem) => {
      if (subItem.id === item.id) {
        subItem.icon = e.target.value;
      }
    });
    setBoardVisibilityData(tempData);
  };

  const handleChangeCustomTitle = (e, item) => {
    const tempData = { ...boardVisiblityData };
    tempData.candidate_coulmns.forEach((subItem) => {
      if (subItem.id === item.id) {
        subItem.custom_title = e.target.value;
      }
    });
    setBoardVisibilityData(tempData);
  };

  const handleChangeOnboardingUpdates = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.extra_details.key = e;
    setBoardVisibilityData(tempData);
  };

  const handleChangeCardSectionColumn1 = (e) =>{
    const tempData = { ...boardVisiblityData };
    tempData.card_section.column1 = e;
    setBoardVisibilityData(tempData);

  }

  const handleChangeCardSectionColumn2 = (e) =>{
    const tempData = { ...boardVisiblityData };
    tempData.card_section.column2 = e;
    setBoardVisibilityData(tempData);
  }

  const handleChangeRequiredColumnProfession = (e) =>{
    const tempData = { ...boardVisiblityData };
    tempData.required_columns.profession = e;
    setBoardVisibilityData(tempData);
  }

  const handleChangeRequiredColumnStatus = (e) =>{
    const tempData = { ...boardVisiblityData };
    tempData.required_columns.overall_status = e;
    setBoardVisibilityData(tempData);
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
            <Card
              title="Manage Board Settings"
              bordered={true}
              className="primary-shadow"
            >
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
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
              {boardVisiblityData !== undefined &&
                Object.keys(boardVisiblityData).length > 0 && (
                  <div>
                    <div style={{ marginTop: "10px" }}>
                      <Input
                        addonBefore="Form Embed Code"
                        value={boardVisiblityData.extra_details.form_embed_code}
                        onChange={handleChangeFormEmbedCode}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Input
                        addonBefore="Chart Embed Code"
                        value={
                          boardVisiblityData.extra_details.chart_embed_code
                        }
                        onChange={handleChangeChartEmbedCode}
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
                        User SubHeading Columns
                      </p>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={boardVisiblityData.sub_headings_column.map(
                          (item) => {
                            return item.id;
                          }
                        )}
                        onChange={handleUserHeadingColumns}
                        options={options}
                        value={boardVisiblityData.sub_headings_column.map(
                          (item) => {
                            return item.id;
                          }
                        )}
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
                        Onboarding Status Columns
                      </p>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={boardVisiblityData.onboarding_columns.map(
                          (item) => {
                            return item.id;
                          }
                        )}
                        onChange={handleChangeOnboardingStatusColumns}
                        options={options}
                        value={boardVisiblityData.onboarding_columns.map(
                          (item) => {
                            return item.id;
                          }
                        )}
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
                        defaultValue={boardVisiblityData.candidate_coulmns.map(
                          (item) => {
                            return item.id;
                          }
                        )}
                        options={options}
                        onChange={handleChangeCandidateColumns}
                        value={boardVisiblityData.candidate_coulmns.map(
                          (item) => {
                            return item.id;
                          }
                        )}
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
                        <a
                          href="https://icons.getbootstrap.com/"
                          target="_blank"
                        >
                          Go to icons library
                        </a>
                      </p>
                      {boardVisiblityData.candidate_coulmns.map(
                        (item, index) => {
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
                              <p style={{ textAlign: "left" }}>
                                For {item.name}
                              </p>
                              <Input
                                addonBefore="Column Icon"
                                value={item.icon}
                                onChange={(e) => handleChangeIcon(e, item)}
                              />
                              <Input
                                addonBefore="Column Title"
                                value={item.custom_title}
                                onChange={(e) =>
                                  handleChangeCustomTitle(e, item)
                                }
                              />
                            </div>
                          );
                        }
                      )}
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
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={boardVisiblityData.extra_details.key}
                        onChange={handleChangeOnboardingUpdates}
                        options={options}
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
                      <p
                        style={{ textAlign: "left" }}
                        className="border-bottom"
                      >
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
                          defaultValue={boardVisiblityData.card_section.column1}
                          onChange={handleChangeCardSectionColumn1}
                          options={options}
                          value={boardVisiblityData.card_section.column1}
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
                          defaultValue={boardVisiblityData.card_section.column2}
                          placeholder="Please select"
                          onChange={handleChangeCardSectionColumn2}
                          options={options}
                          value={boardVisiblityData.card_section.column2}
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
                      <p
                        style={{ textAlign: "left" }}
                        className="border-bottom"
                      >
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
                          defaultValue={
                            boardVisiblityData.required_columns.profession
                          }
                          onChange={handleChangeRequiredColumnProfession}
                          options={options}
                          value={
                            boardVisiblityData.required_columns.profession
                          }
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
                          Overall Status column
                        </p>
                        <Select
                          style={{
                            width: "100%",
                          }}
                          defaultValue={
                            boardVisiblityData.required_columns.overall_status
                          }
                          placeholder="Please select"
                          onChange={handleChangeRequiredColumnStatus}
                          options={options}
                          value={
                            boardVisiblityData.required_columns.profession
                          }
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
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
                  </div>
                )}
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Manage Status Background"
              bordered={true}
              className="primary-shadow"
            >
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
