import { Button, Card, Typography } from "antd";
import { formatDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { setNameOfItem } from "../../redux/slices/trackBoardData";
import { useDispatch } from "react-redux";

export const RequestComponent = ({
  data,
  boardId,
  filterOption,
  columnIdData,
  allColumns,
  colorData,
}) => {
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

  const bgColorSet = {
    STUCK: "#f4bab6",
    COMPLETED: "#d5f9e2",
    "IN PROGRESS": "#fcefbe",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getHeadData = (item) => {
    let key = columnIdData.card_section.column1;
    let value;
    item.column_values.forEach((subItem) => {
      if (subItem.id === key) {
        value = subItem.text;
      }
    });
    return value;
  };

  const getMidData = (item) => {
    let key = columnIdData.card_section.column2;
    let value;
    item.column_values.forEach((subItem) => {
      if (subItem.id === key) {
        value = subItem.text;
      }
    });
    return value;
  };

  const getStatusText = (item) => {
    let tempId = "";
    allColumns.forEach((subItem) => {
      if (subItem.title === "Overall Status") {
        tempId = subItem.id;
      }
    });
    let value;
    item.column_values.forEach((subItem) => {
      if (subItem.id === tempId) {
        value = subItem.text;
      }
    });
    return value.toUpperCase();
  };

  const getStatusColor = (item) => {
    let tempId = "";
    let tempData = "";
    allColumns.forEach((subItem) => {
      if (subItem.title === "Overall Status") {
        tempId = subItem.id;
        tempData = JSON.parse(subItem.settings_str);
      }
    });
    let value;
    item.column_values.forEach((subItem) => {
      if (subItem.id === tempId) {
        value = subItem.text;
      }
    });

    let index = "";
    for (const key in tempData.labels) {
      if (tempData.labels[key] === value) {
        index = key;
      }
    }

    return tempData.labels_colors[index].color;
  };

  const openTrackRequest = (name, id, statusText, statusColor) => {
    const dataToPass = {
      id: id,
      name: name,
      status: statusText,
      color: statusColor,
      subHeadingColumn:columnIdData.sub_headings_column
    }; // Replace with your data
    navigate("details", { state: dataToPass });
  };

  const getBgColor = (item) => {
    let tempId = "";
    allColumns.forEach((subItem) => {
      if (subItem.id === columnIdData.required_columns.overall_status) {
        tempId = subItem.id;
      }
    });
    let value;
    item.column_values.forEach((subItem) => {
      if (subItem.id === tempId) {
        value = subItem.text;
      }
    });
    let bgColor = "";

    colorData.forEach((subItem) => {
      for (const [status, tasks] of Object.entries(subItem)) {
        // console.log(tasks , value)
        if (tasks.includes(value.toLowerCase())) {
          bgColor = bgColorSet[status];
        }
      }
    });
    if (bgColor === "") {
      bgColor = "#8080803b";
    }
    return bgColor;
  };

  return (
    <div>
      {data.map((item, index) => {
        const bgColor = getBgColor(item);
        const statusText = getStatusText(item);
        const statusColor = getStatusColor(item);
        const head = getHeadData(item);
        const mid = getMidData(item);

        return (
          <Card
            style={{ background: bgColor, marginBottom: "24px" }}
            key={index}
          >
            <Typography style={{ textAlign: "left" }}>
              <span className="fs-15" style={{ color: "#6c757d" }}>
                {head}
              </span>{" "}
              <span style={{ color: "#212529bf" }}>|</span>{" "}
              <span className="text-color-928f8f fs-15">
                {formatDate(item.created_at)}
              </span>
            </Typography>

            <h4
              className="ff-hind text-start mt-2 mb-2"
              style={{ color: "#434343", fontSize: "26px", fontWeight: "700" }}
            >
              {item.name}
            </h4>
            <h5
              style={{ color: "#434343", fontSize: "21px" }}
              className="text-start mt-4 onboarding-margin-top-16"
            >
              {mid}
            </h5>
            <h6
              className="card-status text-start mt-3 track-profession fw-bold"
              style={{ fontSize: "17px", color: statusColor }}
            >
              {statusText}
            </h6>
            <div
              className="mt-24"
              style={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <Button
                style={{
                  background: statusColor,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "none",
                }}
                className="border-radius-10"
                onClick={() =>
                  openTrackRequest(item.name, item.id, statusText, statusColor)
                }
              >
                <span className="fs-12 fw-700 font-family-montse">
                  Track Request
                </span>{" "}
                <span className="fs-16">
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </span>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
