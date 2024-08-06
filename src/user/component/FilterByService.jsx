import { Button, Dropdown, Space } from "antd";
import { FilterIcon } from "../../utils/icons";
import { useEffect, useRef } from "react";

export const FilterByService = ({ items, setSelectedService, setBoardId , boardId , getDataByFilterAndSearch}) => {
  const isInitialRender = useRef(true);
  const handleMenuClick = (e) => {
    setSelectedService(e.key);
    items.forEach((details, index) => {
      if (e.key === index.toString()) {
        setBoardId(details.boardId);
      }
    });
  };

  const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ["0"],
    onClick: handleMenuClick,
  };

  // useEffect(() => {
  //   if (isInitialRender.current) {
  //     isInitialRender.current = false;
  //   } else {
  //     getDataByFilterAndSearch()
  //   }
  // }, [boardId]);

  return (
    <Dropdown menu={menuProps}>
      <Button
        type="text"
        style={{
          fontSize: "16px",
          color: "#928f8f",
          padding: "0px",
          marginRight: "14px",
        }}
        icon={<FilterIcon style={{ color: "#497ed8" }} />}
        iconPosition="start"
      >
        <Space>Select Service</Space>
      </Button>
    </Dropdown>
  );
};
