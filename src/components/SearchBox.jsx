import { SearchOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

export const SearchBox = ({      tempSearchData , 
  setTempSearchData ,placeHolder , setSearchData , getDataByFilterAndSearch , order , boardId , selectedFilter , flag}) => {
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

 

  const handleChange = (e) => {
    setTempSearchData(e.target.value);
    if(e.target.value.length === 0){
      handleEraseData();
    }
  };

  const handleEnterPressed = (event) => {
    let tempData = {
      order: order,
      boardId: boardId,
      statusFilter: selectedFilter,
      searchData: tempSearchData,
    };
    if (event.keyCode === 13) {
      setSearchData(tempSearchData);
      if(flag){
      getDataByFilterAndSearch(tempData);
      }
    }
  };

  const handleEraseData = () => {
    let filterData = {
      order: order,
      boardId: boardId,
      statusFilter: selectedFilter,
      searchData: '',
    };
    const tempData = "";
    setTempSearchData(tempData);
    setSearchData(tempData);
    getDataByFilterAndSearch(filterData);
  };

  return (
    <Input
      className="governify-search-box"
      placeholder={placeHolder}
      onChange={handleChange}
      onKeyUp={handleEnterPressed}
      value={tempSearchData}
      suffix={
        tempSearchData.length > 0 ? (
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
