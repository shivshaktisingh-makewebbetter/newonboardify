import { Button, Input, Select } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImageUpload } from "../../common/ImageUpload";
import {
  createService,
  getAllColumnsOfBoard,
  getBoardVisibilityData,
} from "../../apiservice/ApiService";

export const CreateServices = ({
  closeModal,
  profileId,
  getAllServiceListing,
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
    title: "",
    description: "",
    image: "",
    image_name: "",
    board_id: "",
    profile_id: profileId.toString() || "",
    service_chart_link: "",
    service_form_link: "",
  });
  const [options, setOptions] = useState([]);
  const [serviceColumnValueFilter, setServiceColumnValueFilter] = useState({
    key: "",
    value: "",
  });
  const [documentFetchKey, setDocumentFetchKey] = useState([]);
  const [imageKey, setImageKey] = useState("");
  const [boardVisiblityData, setBoardVisibilityData] = useState({});

  const handleCreateServices = async () => {
    if(boardVisiblityData.required_columns.overall_status.length === 0 || boardVisiblityData.required_columns.profession.length === 0){
      toast.error('Please fill the Search And Filter fields.');
      return;
    }

    let payload = {
      ...serviceData,
      service_column_value_filter: JSON.stringify(serviceColumnValueFilter),
      service_setting_data: JSON.stringify(boardVisiblityData),
    };

    try {
      const response = await createService(payload);
      if (response.success) {
        toast.success(response.message);
        getAllServiceListing();
        closeModal();
        setServiceData({
          title: "",
          description: "",
          image: "",
          image_name: "",
          board_id: "",
          profile_id: profileId.toString() || "",
        });
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

  const handleChangeChartEmbedCode = (e) => {
    setServiceData({ ...serviceData, service_chart_link: e.target.value });
  };

  const handleChangeFormEmbedCode = (e) => {
    setServiceData({ ...serviceData, service_form_link: e.target.value });
  };

  const handleFileSelect = (data, imageName) => {
    setServiceData({ ...serviceData, image: data, image_name: imageName });
  };

  const fetchAllColumnsOfBoard = async (e) => {
    try {
      const response = await getAllColumnsOfBoard(e);
      if (response.success) {
        let tempArr = [];
        response.data.response.forEach((item) => {
          tempArr.push({ label: item.title, value: item.id });
        });

        setOptions(tempArr);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleChangeBoardId = async (e) => {
    setServiceData({ ...serviceData, board_id: e });
    if (e === undefined) {
      setBoardVisibilityData({});
    }
    setBoardVisibilityData({
      candidate_coulmns: [],
      card_section: { column1: "", column2: "" },
      document_fetch_key: [],
      email: "",
      email_key: [],
      extra_details: { chart_embed_code: "", form_embed_code: "", key: "" },
      filterByUser: { key: "", value: "" },
      image_key: "",
      onboarding_columns: [],
      required_columns: { profession: [], overall_status: "" },
      sub_headings_column: [],
    });

    try {
      await fetchAllColumnsOfBoard(e);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const handleChangeServiceColumnFilter = (e) => {
    if (e === undefined) {
      setServiceColumnValueFilter({
        ...serviceColumnValueFilter,
        key: "",
        value: "",
      });
      return;
    }
    setServiceColumnValueFilter({ ...serviceColumnValueFilter, key: e });
  };

  const handleFilterValueChange = (e) => {
    setServiceColumnValueFilter({
      ...serviceColumnValueFilter,
      value: e.target.value,
    });
  };

  const handleUserHeadingColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = e.map((value) => {
      const item = options.find((option) => option.value === value);
      return {
        id: item.value,
        name: item.label,
        icon: "",
        custom_title: "",
      };
    });
    tempData.sub_headings_column = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeOnboardingStatusColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = e.map((value) => {
      const item = options.find((option) => option.value === value);
      return {
        id: item.value,
        name: item.label,
        icon: "",
        custom_title: "",
      };
    });
    tempData.onboarding_columns = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeCandidateColumns = (e) => {
    const tempData = { ...boardVisiblityData };
    const selectedData = e.map((value) => {
      const existingItem = tempData.candidate_coulmns.find(
        (column) => column.id === value
      );

      if (existingItem !== undefined) {
        return existingItem;
      } else {
        const item = options.find((option) => option.value === value);
        return {
          id: item.value,
          name: item.label,
          icon: "",
          custom_title: "",
        };
      }
    });

    tempData.candidate_coulmns = selectedData;
    setBoardVisibilityData(tempData);
  };

  const handleChangeIcon = (e, item) => {
    const tempData = { ...boardVisiblityData };
    tempData.candidate_coulmns.forEach((subItem) => {
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

  const handleChangeCardSectionColumn1 = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.card_section.column1 = e;
    setBoardVisibilityData(tempData);
  };

  const handleChangeCardSectionColumn2 = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.card_section.column2 = e;
    setBoardVisibilityData(tempData);
  };

  const handleChangeRequiredColumnProfession = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.required_columns.profession = e;
    setBoardVisibilityData(tempData);
  };

  const handleChangeRequiredColumnStatus = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.required_columns.overall_status = e;
    setBoardVisibilityData(tempData);
  };

  const handleChangColumnDocumentFetch = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.document_fetch_key = e;
    setDocumentFetchKey(e);
    setBoardVisibilityData(tempData);
  };

  const handleChangeDocumentColumn = (e) => {
    const tempData = { ...boardVisiblityData };
    tempData.image_key = e;
    setImageKey(e);
    setBoardVisibilityData(tempData);
  };

  const filterOption = (input, option) => {
    return (
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div style={{ width: "100%", marginTop: "25px" }}>
      <div>
        <div className="text-white" style={{ backgroundColor: "#497ed8" }}>
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

          <Input
            placeholder="Form Embed Code"
            className="mt-10"
            onChange={handleChangeFormEmbedCode}
            addonBefore="Form Embed Code"
            style={{ borderRadius: "10px" }}
            value={serviceData.service_form_link}
          />
          <Input
            placeholder="Chart Embed Code"
            className="mt-10"
            onChange={handleChangeChartEmbedCode}
            addonBefore="Chart Embed Code"
            style={{ borderRadius: "10px" }}
            value={serviceData.service_chart_link}
          />
          <div
            style={{
              marginTop: "10px",
              border: "1px solid #d9d9d9",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <p style={{ textAlign: "left" }} className="border-bottom">
              Please Select BoardID
            </p>
            <div className="mt-10">
              <Select
                showSearch
                placeholder={"Please Select BoardId"}
                style={{ width: "100%" }}
                popupMatchSelectWidth={false}
                placement="bottomLeft"
                onChange={handleChangeBoardId}
                options={boardIdOptions}
                filterOption={filterOption}
                value={serviceData.board_id || undefined}
                allowClear
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
              Please Select Column Filter
            </p>
            <div className="mt-10">
              <Select
                showSearch
                placeholder={"Please Select Filter"}
                style={{ width: "100%" }}
                popupMatchSelectWidth={false}
                placement="bottomLeft"
                onChange={handleChangeServiceColumnFilter}
                options={options}
                filterOption={filterOption}
                value={serviceColumnValueFilter.key || undefined}
                disabled={options.length === 0}
                allowClear
              />
            </div>

            {serviceColumnValueFilter.key !== undefined &&
              serviceColumnValueFilter.key.length > 0 && (
                <Input
                  placeholder="Filter Value"
                  className="mt-10"
                  onChange={handleFilterValueChange}
                  addonBefore="Select Filter Value"
                  style={{ borderRadius: "10px" }}
                  value={serviceColumnValueFilter.value}
                />
              )}
          </div>

          {boardVisiblityData !== undefined &&
            Object.keys(boardVisiblityData).length > 0 && (
              <div>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p style={{ textAlign: "left" }}>Single Page Heading</p>
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
                    filterOption={filterOption}
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
                  <p style={{ textAlign: "left" }}>Basic Information</p>
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
                    value={boardVisiblityData.candidate_coulmns.map((item) => {
                      return item.id;
                    })}
                    filterOption={filterOption}
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
                  <p style={{ textAlign: "left" }}>Request Statuses</p>
                  <Select
                    showSearch
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
                    value={boardVisiblityData.onboarding_columns.map((item) => {
                      return item.id;
                    })}
                    filterOption={filterOption}
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
                    Provide candidate column details :{" "}
                    <a href="https://icons.getbootstrap.com/" target="_blank">
                      Go to icons library
                    </a>
                  </p>
                  {boardVisiblityData.candidate_coulmns.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <div style={{ marginBottom: "10px" }}>
                          <p style={{ textAlign: "left", marginBottom: "5px" }}>
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
                            onChange={(e) => handleChangeCustomTitle(e, item)}
                            style={{ marginTop: "10px" }}
                          />
                        </div>
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
                  <p style={{ textAlign: "left" }} className="border-bottom">
                    Request Card Information
                  </p>
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ textAlign: "left", marginBottom: "5px" }}>
                      Top Details Columns
                    </p>
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                      }}
                      placeholder="Please select"
                      defaultValue={boardVisiblityData.card_section.column1}
                      onChange={handleChangeCardSectionColumn1}
                      options={options}
                      value={boardVisiblityData.card_section.column1}
                      filterOption={filterOption}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ textAlign: "left", marginBottom: "5px" }}>
                      Mid Heading Columns
                    </p>
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                      }}
                      defaultValue={boardVisiblityData.card_section.column2}
                      placeholder="Please select"
                      onChange={handleChangeCardSectionColumn2}
                      options={options}
                      value={boardVisiblityData.card_section.column2}
                      filterOption={filterOption}
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
                    Search and Filter
                  </p>
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ textAlign: "left", marginBottom: "5px" }}>
                      Search column
                    </p>
                    <Select
                      showSearch
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Please select"
                      defaultValue={
                        boardVisiblityData.required_columns.profession
                      }
                      onChange={handleChangeRequiredColumnProfession}
                      options={options}
                      value={boardVisiblityData.required_columns.profession}
                      filterOption={filterOption}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ textAlign: "left", marginBottom: "5px" }}>
                      Filter column
                    </p>
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                      }}
                      defaultValue={
                        boardVisiblityData.required_columns.overall_status
                      }
                      placeholder="Please select"
                      onChange={handleChangeRequiredColumnStatus}
                      options={options}
                      value={boardVisiblityData.required_columns.overall_status}
                      filterOption={filterOption}
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
                  <p style={{ textAlign: "left" }}>Documents to User</p>
                  <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select Document Column"
                    value={documentFetchKey}
                    onChange={handleChangColumnDocumentFetch}
                    options={options}
                    filterOption={filterOption}
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
                  <p style={{ textAlign: "left" }}>Documents from User</p>
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select Document Column"
                    value={imageKey}
                    onChange={handleChangeDocumentColumn}
                    options={options}
                    filterOption={filterOption}
                  />
                </div>
              </div>
            )}

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
  );
};
