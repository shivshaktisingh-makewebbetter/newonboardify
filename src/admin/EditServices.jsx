import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  createService,
  getAllBoards,
  updateServiceRequest,
} from "../apiservice/ApiService";
import { ImageUpload } from "../common/ImageUpload";

export const EditServices = ({ data, handleChangeEditServiceModal }) => {
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
    title: data?.title || "",
    description: data?.description || "",
    image: data?.file_location || "",
    image_name: data?.image || "",
    board_id: data?.board_id || "",
    form_embed_code: data?.form_embed_code || "",
  });
  const [boardIdOptions, setBoardIdOptions] = useState([]);

  function startsWithHttp(url) {
    return (
      url.toLowerCase().startsWith("http://") ||
      url.toLowerCase().startsWith("https://")
    );
  }

  const handleCreateServices = async () => {
    let payload = { ...serviceData };
    console.log(startsWithHttp(serviceData.image));
    payload.image_name = startsWithHttp(serviceData.image)
      ? ""
      : serviceData.image_name;
    payload.image = startsWithHttp(serviceData.image) ? "" : serviceData.image;
    try {
      const response = await updateServiceRequest({
        id: data.id,
        data: JSON.stringify(payload),
      });
       if(response.success){
        handleChangeEditServiceModal();
       }
    } catch (err) {
      // toast.error("Error");
      // console.log(err, "error");
    }
  };

  const getAllBoardIds = async () => {
    try {
      const response = await getAllBoards();
      console.log(response);
      if (response.success) {
        let tempData = [];
        response.data.response.boards.forEach((item) => {
          console.log(item, "item");
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

  const handleChangeEmbedCode = (e) => {
    setServiceData({ ...serviceData, form_embed_code: e.target.value });
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
              <strong>Edit Services</strong>
            </p>
          </div>
          <div
            className="form_wrapper border border-success p-4 primary-shadow"
            style={{ height: "600px", overflowY: "auto" }}
          >
            <div>
              <ImageUpload
                onFileSelect={handleFileSelect}
                imageName={serviceData?.image_name}
                imageUrl={serviceData?.image}
              />
            </div>
            <Input
              placeholder="Service Title"
              className="mt-30"
              onChange={handleTitleChange}
              addonBefore="Title"
              style={{ borderRadius: "10px" }}
              value={serviceData.title}
            />
            <Input
              placeholder="Service description"
              className="mt-10"
              onChange={handleDescriptionChange}
              addonBefore="Description"
              style={{ borderRadius: "10px" }}
              value={serviceData.description}
            />
            <Input
              placeholder="Embed Form Code"
              className="mt-10"
              onChange={handleChangeEmbedCode}
              addonBefore="Embed Form"
              style={{ borderRadius: "10px" }}
              value={serviceData.form_embed_code}
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
                value={serviceData.board_id}
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
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
