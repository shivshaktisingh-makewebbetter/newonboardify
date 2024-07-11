import { useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Hero } from "../components/Hero";
import { getAllBoards, getBoardColorMapping } from "../apiservice/ApiService";
import { Card, Col, Row, Select } from "antd";

export const Board = () => {
  const [boardListing, setBoardListing] = useState([]);
  const [selectedBoardId , setSelectedBoardId] = useState('');

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

  const handleBoardChange = (e) =>{
    setSelectedBoardId(e);
  }

  const fetchAllColorMapping = async () => {
    try {
      const response = await getBoardColorMapping();
      console.log(response, "response2");
    } catch (err) {
    } finally {
    }
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
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Manage Board Settings" bordered={true}>
              <div>
                <p style={{textAlign:"left"}}>Select Board</p>
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
              <div>
              <h5 class="p-2 " style={{borderRadius:"20%" ,borderLeft:"10px solid red" , textAlign:"left"}}>Color:
              STUCK</h5>
              <textarea rows={5} col={15} ></textarea>
              </div>
              <div>
              <h5 class="p-2 " style={{borderRadius:"20%" ,borderLeft:"10px solid yellow" ,textAlign:"left"}}>Color:
              STUCK</h5>
              <textarea></textarea>
              </div><div>
              <h5 class="p-2 " style={{borderRadius:"20%" ,borderLeft:"10px solid green" ,textAlign:"left"}}>Color:
              STUCK</h5>
              <textarea></textarea>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
