import React from "react";
import { Button, Dropdown, Space } from "antd";
import { FilterIcon } from "../../utils/icons";

export const FilterBy = ({
  setSelectedFilter,
  items,
  getDataByFilterAndSearch,
  boardId,
  order,
  searchData,
  selectedFilter
}) => {
  const handleMenuClick = (e) => {
    let tempData = {
      order: order,
      boardId: boardId,
      statusFilter: e.key,
      searchData: searchData,
    };

    setSelectedFilter(e.key);
    getDataByFilterAndSearch(tempData);
  };

  const menuProps = {

    items,
    selectable: true,
    defaultSelectedKeys: ["9"],
    onClick: handleMenuClick,
    selectedKeys:selectedFilter
  };

  return (
    <Dropdown menu={menuProps}>
      
      <Button
        type="text"
        style={{
          fontSize: "16px",
          color: "#928f8f",
          padding: "0px",
          marginRight: "14px",
          paddingLeft:"10px"
        }}
        icon={<FilterIcon style={{ color: "#497ed8"   }} />}
        iconPosition="start"
      >
        <Space>Filter</Space>
      </Button>
    </Dropdown>
  );
};
