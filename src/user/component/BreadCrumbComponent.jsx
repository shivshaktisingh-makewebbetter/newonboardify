import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const BreadcrumbComponent = ({ data, name }) => {
  const navigate = useNavigate();

  const breadcrumbObject = {
    track: "Request Tracking",
    details: name,
  };

  const navigateToHome = () => {
    navigate("/user");
  };

  const navigateFun = (key) => {
    navigate("/user/track");
  };

  return (
    <div className="breadcrumb-major-component">
      <span
        className="text-decoration-underline governify-breadcumb-home governify-cursor-pointer"
        onClick={navigateToHome}
      >
        Home
      </span>
      <ol className="breadcrumb">
        {data.map((item, index) => {
          const isLastIndex = index === data.length - 1;
          const spanClassName =
            "fs-16 text-color-0d6efd governify-cursor-pointer";
          const lastElementClass =
            "text-decoration-underline governify-breadcumb-home governify-cursor-pointer";

          return (
            item.length > 0 &&
            item !== "user" && (
              <span key={index}>
                <li className="breadcrumb-item">
                  <RightOutlined className="fs-12 text-color-928f8f pl-8" />
                  <span
                    className={isLastIndex ? spanClassName : lastElementClass}
                    style={{ paddingLeft: "3px" }}
                    onClick={isLastIndex ? () => {} : () => navigateFun(item)}
                  >
                    {breadcrumbObject[item]}
                  </span>
                </li>
              </span>
            )
          );
        })}
      </ol>
    </div>
  );
};
