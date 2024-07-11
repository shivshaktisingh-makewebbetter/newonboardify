import { SearchOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

export const SearchBox = ({placeHolder , setSearchData}) => {
    const settingsData = JSON.parse(sessionStorage.getItem("settings")) || {
		image:
		  "https://onboardify.tasc360.com/uploads/y22.png",
		site_bg: "#ffffff",
		button_bg: "#497ed8",
		banner_bg: "#497ed8",
		banner_content:
		  "Hire an attitude, not just experience and qualification. Greg Savage.",
		header_bg: "#f7f7f7",
		head_title_color: "#497ed8",
	  };

  const [data, setData] = useState("");

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleEnterPressed = (event) => {
    if (event.keyCode === 13) {
      setSearchData(data);
    }
  };

  const handleEraseData = () => {
    const tempData = "";
    setData(tempData);
    setSearchData(tempData);
  };

  return (
    <Input
      className="governify-search-box"
      placeholder={placeHolder}
      onChange={handleChange}
      onKeyUp={handleEnterPressed}
      value={data}
      suffix={
        data.length > 0 ? (
          <CloseOutlined
            onClick={handleEraseData}
            style={{
              cursor: "pointer",
              color: "#ffffff",
              fontSize: "14px",
              background: settingsData.button_bg,
              padding: "4px",
              borderRadius: "5px",
            }}
          />
        ) : (
          <SearchOutlined
            style={{
              cursor: "pointer",
              color: settingsData.button_bg,
              fontSize: "18px",
            }}
          />
        )
      }
    />
  );
};
