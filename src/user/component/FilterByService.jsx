import { Button, Dropdown, Space } from "antd";
import { FilterIcon } from "../../utils/icons";

export const FilterByService = ({ items, setSelectedService, setBoardId , boardId , getDataByFilterAndSearch}) => {

  const handleMenuClick = (e) => {
    let tempBoardId = '';
    setSelectedService(e.key);
    items.forEach((details, index) => {
      if (e.key === index.toString()) {
        tempBoardId = details.boardId; 
        setBoardId(details.boardId);

      }
    });
    getDataByFilterAndSearch()
  };

  const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ["0"],
    onClick: handleMenuClick,
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
        }}
        icon={<FilterIcon style={{ color: "#497ed8" }} />}
        iconPosition="start"
      >
        <Space>Select Service</Space>
      </Button>
    </Dropdown>
  );
};
