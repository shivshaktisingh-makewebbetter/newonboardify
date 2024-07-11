import { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Hero } from "../components/Hero";
import { getAllBoards, getBoardColorMapping } from "../apiservice/ApiService";
import { Button, Card, Col, Row, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Board = () => {
  const [boardListing, setBoardListing] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [colorMappingData, setColorMappingData] = useState([]);
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

  const handleBoardChange = (e) => {
    setSelectedBoardId(e);
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
            <Card title="Manage Board Settings" bordered={true}>
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
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Manage Status Background" bordered={true}>
              {colorMappingData.map((item, index) => {
                return (
                  <div key={index} style={{paddingBottom:"20px"}}>
                    {Object.keys(item).map((key) => {
                      return (
                        <div key={key}>
                          <h5
                            class="p-2 "
                            style={{
                              borderRadius: "20%",
                              borderLeft: "10px solid red",
                              textAlign: "left",
                            }}
                          >
                            Color: {key}
                          </h5>

                          <textarea
                            className="form-control"
                            style={{ padding: "10px" }}
                            value={formattedData(item[key])}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
