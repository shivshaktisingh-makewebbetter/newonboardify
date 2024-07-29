import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { ImageUpload } from "../../common/ImageUpload";
import {
  createService,
  editServices,
  getAllBoards,
} from "../../apiservice/ApiService";

export const EditServices = ({
  closeModal,
  profileId,
  getAllServiceListing,
  editServiceData,
  boardIdOptions,
}) => {
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
    title: editServiceData.title || "",
    description: editServiceData.description || "",
    image: editServiceData.file_location || "",
    image_name: editServiceData.image || "",
    board_id: editServiceData.board_id || "",
    profile_id: profileId.toString() || "",
  });

  function startsWithHttp(url) {
    return (
      url.toLowerCase().startsWith("http://") ||
      url.toLowerCase().startsWith("https://")
    );
  }

  const handleUpdateServices = async () => {
    let payload = { ...serviceData };
    payload.image_name = startsWithHttp(serviceData.image)
      ? ""
      : serviceData.image_name;
    payload.image = startsWithHttp(serviceData.image) ? "" : serviceData.image;
    try {
      const response = await editServices(
        editServiceData.id,
        JSON.stringify(payload)
      );
      if (response.success) {
        toast.success(response.message);
        getAllServiceListing();
        closeModal();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
    } finally {
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

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

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
                imageName={serviceData.image_name}
                imageUrl={serviceData.image}
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
            <div className="mt-10">
              <Select
                showSearch
                placeholder="Select BoardId"
                style={{ width: "100%" }}
                popupMatchSelectWidth={false}
                placement="bottomLeft"
                onChange={handleChangeBoardId}
                value={serviceData.board_id}
                options={boardIdOptions}
                filterOption={filterOption}
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
                onClick={handleUpdateServices}
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
