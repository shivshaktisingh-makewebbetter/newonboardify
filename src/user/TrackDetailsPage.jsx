import { useLocation } from "react-router-dom";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";

import {
  geAllLikesUser,
  getBoardSettingDataCustomerByID,
  getRequestTrackingData,
  getSubItemDetails,
} from "../apiservice/ApiService";
import { useEffect, useState } from "react";
import { countries } from "../utils/assets";
import { formatDateNew } from "../utils/helper";
import { UpdateComponent } from "./component/UpdateComponent";
import { Loader } from "../common/Loader";

export const TrackDetails = () => {
  const [columnData, setColumnData] = useState({});
  const [allColumns, setAllColumns] = useState();
  const [itemDetails, setItemDetails] = useState({});
  const location = useLocation();
  const [likeIds, setLikeIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = location;
  const [subHeadingString, setSubHeadingString] = useState("");
  const breadCrumbData = location.pathname.split("/");

  const fetchSubItemsDetails = async () => {
    setLoading(true);

    try {
      const response2 = await getRequestTrackingData();
      const response = await getSubItemDetails(state.id);
      const response1 = await getBoardSettingDataCustomerByID(
        response2.data.response.data.boards[0].id
      );

      if (response1.success) {
        setColumnData(JSON.parse(response1.data.response[0].columns));
      }
      if (response2.success) {
        let tempText = "";
        setAllColumns(response2.data.response.data.boards[0].columns);

        state.subHeadingColumn.forEach((item, index) => {
          response.data.response.data.items[0].column_values.forEach(
            (subItem) => {
              if (subItem.id === item.id) {
                tempText = tempText + subItem.text;
                if (index < state.subHeadingColumn.length - 1) {
                  tempText = tempText + " | ";
                }
              }
            }
          );
        });
        setSubHeadingString(tempText);
      }
      if (response.success) {
        setItemDetails(response.data.response.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getAllLikes = async () => {
    let ids = [];
    let likes = await geAllLikesUser();
    if (likes.success) {
      likes.data.map((item) => {
        ids.push(item.item_type_id);
      });
    } else {
      ids = [];
    }

    setLikeIds(ids);
  };

  const getCountryCode = (item) => {
    let countryName = "";
    itemDetails.items[0].column_values.forEach((subItem) => {
      if (subItem.type === "country") {
        countryName = subItem.text;
      }
    });

    let code = "";
    countries.forEach((subItem) => {
      if (countryName === subItem.countryname) {
        code = subItem.countrycode;
      }
    });
    return code;
  };

  const getCenterText = (item) => {
    let value = "";
    itemDetails.items[0].column_values.forEach((subItem) => {
      if (subItem.id === item.id) {
        value = subItem.text;
      }
    });

    return value;
  };

  const getInitialAction = (item) => {
    let tempInitialAction = "";
    const activityLogs = itemDetails.boards[0].activity_logs;

    for (let i = 0; i < activityLogs.length; i++) {
      const subItem = activityLogs[i];
      const tempData = JSON.parse(subItem.data);

      if (item.id === tempData.column_id) {
        if (tempData.hasOwnProperty("value") && tempData.value !== null) {
          tempInitialAction = tempData.value.label.text;
        }
        break;
      }
    }

    return tempInitialAction;
  };

  const getColor = (item) => {
    let tempColor = "";
    const activityLogs = itemDetails.boards[0].activity_logs;

    for (let i = 0; i < activityLogs.length; i++) {
      const subItem = activityLogs[i];
      const tempData = JSON.parse(subItem.data);

      if (item.id === tempData.column_id) {
        if (tempData.hasOwnProperty("value") && tempData.value !== null) {
          tempColor = tempData.value.label.style.color;
        }
        break;
      }
    }
    return tempColor;
  };

  const getInitialDate = () => {
    return formatDateNew(itemDetails.items[0].created_at);
  };

  const getUpdatedDate = (item) => {
    let updatedDate = "";
    const activityLogs = itemDetails.boards[0].activity_logs;

    for (let i = 0; i < activityLogs.length; i++) {
      const subItem = activityLogs[i];
      const tempData = JSON.parse(subItem.data);

      if (item.id === tempData.column_id) {
        if (tempData.hasOwnProperty("value") && tempData.value !== null) {
          updatedDate = formatDateNew(new Date(subItem.created_at / 10000));
        }
        break;
      }
    }

    return updatedDate;
  };

  useEffect(() => {
    fetchSubItemsDetails();
  }, []);

  useEffect(() => {
    getAllLikes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {loading && <Loader />}
      <BreadcrumbComponent data={breadCrumbData} name={state.name} />
      <div
        style={{
          display: "flex",
          marginTop: "36px",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "30px", flexDirection: "column" }}>
          <div
            className="d-flex mb-2 onboardin-padding-24"
            style={{ gap: "16px" }}
          >
            <div
              className="rounded-circle p-4 onboarding-rounded-circle"
              style={{ background: state.color }}
            >
              <div
                className="icon-size text-light"
                style={{ height: "50px", width: "50px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.2"
                  baseProfile="tiny"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  style={{ maxWidth: "100%" }}
                  height="100%"
                >
                  <metadata fill="currentColor">
                    <sfw
                      xmlns="http://ns.adobe.com/SaveForWeb/1.0/"
                      fill="currentColor"
                    >
                      <slices fill="currentColor"></slices>
                      <slicesourcebounds
                        width="92.603"
                        height="88.807"
                        x="3.375"
                        y="-94.057"
                        bottomleftorigin="true"
                        fill="currentColor"
                      ></slicesourcebounds>
                    </sfw>
                  </metadata>
                  <path
                    d="M27.521,94c0.162-12,9.944-21.717,22.004-21.717C61.584,72.283,71.366,82,71.529,94h24.445c0,0,0.003,0.092,0.003,0.042  c0-25.572-20.73-46.206-46.301-46.206c-25.572,0-46.302,20.586-46.302,46.156C3.375,94.043,3.378,94,3.378,94H27.521z"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  ></path>
                  <circle
                    cx="49.677"
                    cy="24.856"
                    r="19.607"
                    fill="currentColor"
                  ></circle>
                </svg>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around">
              <h5
                className="text-start m-0 card-user-name onboarding-fs-24"
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#434343",
                }}
              >
                {state.name}
              </h5>
              <p
                className="profession m-0 text-start user-candidate-column onboarding-fs-14"
                style={{
                  fontWeight: "400",
                  fontSize: "17px",
                  color: "#928f8f",
                }}
              >
                {!loading && subHeadingString}
              </p>
              <h6
                className="fs-17 status m-0 text-start fw-bold"
                style={{ color: state.color }}
              >
                {state.status}
              </h6>
            </div>
          </div>

          <div className="card border-0 border-1 p-4">
            <p
              className="column-head text-start head-color fw-bold pb-4 border-bottom onboarding-fs-20"
              style={{ fontSize: "26px" }}
            >
              Candidate Information
            </p>
            <ul className="list-group list-group-flush">
              {Object.keys(columnData).length > 0 &&
                columnData.candidate_coulmns.map((item, index) => {
                  const countryCode = getCountryCode(item);
                  const centerText = getCenterText(item);
                  return (
                    <li
                      className="user-candidate-column list-group-item d-flex pb-0 align-items-center border-0 text-start"
                      style={{ background: "inherit", gap: "12px" }}
                      key={index}
                    >
                      <span className="mb-2">
                        <i
                          className={item.icon}
                          style={{ color: "#928f8f" }}
                        ></i>
                      </span>
                      <span style={{ color: "#928f8f", fontSize: "17px" }}>
                        {item.custom_title.length > 0 && item.custom_title}
                        {item.custom_title.length > 0 && " : "}
                        {centerText}
                      </span>
                      {(item.name === "Nationality" ||
                        item.name === "Country of Residency") && (
                        <span>
                          {countryCode.length > 0 && (
                            <img
                              height="20"
                              width="22"
                              src={`http://localhost:3000/flags/${countryCode.toLowerCase()}.svg`}
                              alt={`${countryCode.toUpperCase()} Flag`}
                            />
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="card border-0 border-1 p-4">
            <h4 className="text-start head-color fw-bold pb-4 border-bottom onboarding-fs-20">
              Onboarding Status
            </h4>
            <ul className="list-group list-group-flush">
              {Object.keys(columnData).length > 0 &&
                columnData.onboarding_columns.map((item, index) => {
                  const initialAction = getInitialAction(item);
                  const initialDate = getInitialDate();
                  const color = getColor(item);
                  const updatedDate = getUpdatedDate(item);

                  return (
                    <li
                      className="list-group-item d-flex align-items-start border-0 text-start mb-1"
                      style={{ background: "inherit", gap: "10px" }}
                      key={index}
                    >
                      <span
                        style={{ width: "20px", height: "20px" }}
                        className="text-warning mt-1"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            maxWidth: "100%",
                            color: color === "" ? "#6C757D" : color,
                          }}
                          height="100%"
                        >
                          <path
                            d="M6 0c3.3137 0 6 2.6863 6 6s-2.6863 6-6 6-6-2.6863-6-6 2.6863-6 6-6zm2.6464 3.6464L5 7.293 3.3536 5.6464l-.7072.7072L5 8.707l4.3536-4.3535-.7072-.7072z"
                            fill="currentColor"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-secondary fs-5">
                          {item.name}
                        </span>
                        <span className="text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                            ></path>
                          </svg>
                          Awaiting Action | {initialDate}
                        </span>
                        {initialAction !== "" &&
                          initialAction !== "Awaiting Action" && (
                            <span className="text-secondary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-right-short"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                                ></path>
                              </svg>
                              {initialAction} | {updatedDate}
                            </span>
                          )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {Object.keys(columnData).length > 0 && (
          <div
            className="col-6 d-flex flex-column onboarding-width"
            style={{ gap: "30px" }}
          >
            <div
              className="card border-0 border-1 p-4"
              style={{ background: "rgba(111, 116, 144, 0.06)" }}
            >
              <p className="second-heading text-start head-color fw-bold pb-4 border-bottom">
                Onboarding Updates
              </p>

              <UpdateComponent
                id={state.id}
                likeIds={likeIds}
                getAllLikes={getAllLikes}
                description={""}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
