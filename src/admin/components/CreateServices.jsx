import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { ImageUpload } from "../../common/ImageUpload";
import { createService, getAllBoards } from "../../apiservice/ApiService";

export const CreateServices = ({ handleChangeCreateServiceModal , profileId }) => {
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
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    image: "",
    image_name: "",
    board_id: "",
    profile_id: profileId || ''
  });
  const [boardIdOptions, setBoardIdOptions] = useState([]);

  const handleCreateServices = async () => {

    try{
      const response = await createService(JSON.stringify(serviceData));
      console.log(response, "response");
    }catch(err){

    }finally{
      
    }
    
  };

  const getAllBoardIds = async () => {
    try {
      const response = await getAllBoards();
      // console.log(response)
      if (response.success) {
        let tempData = [];
        response.data.response.boards.forEach((item) => {
          // console.log(item , 'item')
          tempData.push({
            key: item.id,
            label: item.name,
            value: item.id,
          });
        });
        setBoardIdOptions(tempData);
      }
    } catch (err) {
      throw new Error("Network response was not ok ", err);
    }
  };

  const handleTitleChange = (e) => {
    setServiceData({ ...serviceData, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setServiceData({ ...serviceData, description: e.target.value });
  };

  const handleFileSelect = (data, imageName) => {
    setServiceData({ ...serviceData, image: data, image_name: imageName });
  };

  const handleChangeBoardId = (e) => {
    setServiceData({ ...serviceData, board_id: e });
  };

  useEffect(() => {
    getAllBoardIds();
  }, []);

  console.log(serviceData, "sdaf");

  return (
    <>
      <div
        title="status visibility manage"
        style={{ maxWidth: "550px", width: "100%", marginTop: "25px" }}
      >
        <div>
          <div
            className="text-white"
            style={{ backgroundColor: settingsData.button_bg }}
          >
            <p className="p-2 m-0 fs-5">
              <strong>Create Services</strong>
            </p>
          </div>
          <div
            className="form_wrapper border border-success p-4 primary-shadow"
            style={{ height: "600px", overflowY: "auto" }}
          >
            <div>
              <ImageUpload
                onFileSelect={handleFileSelect}
                imageName={""}
                imageUrl={""}
              />
            </div>
            <Input
              placeholder="Service Title"
              className="mt-30"
              onChange={handleTitleChange}
              addonBefore="Title"
              style={{ borderRadius: "10px" }}
            />
            <Input
              placeholder="Service description"
              className="mt-10"
              onChange={handleDescriptionChange}
              addonBefore="Description"
              style={{ borderRadius: "10px" }}
            />

            <div className="mt-10">
              <Select
                showSearch
                placeholder="Select BoardId"
                style={{ width: "100%" }}
                popupMatchSelectWidth={false}
                placement="bottomLeft"
                onChange={handleChangeBoardId}
                options={boardIdOptions}
              />
            </div>

            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="mt-60"
            >
              <Button
                className="mt-10"
                style={{
                  background: settingsData.button_bg,
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleCreateServices}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
