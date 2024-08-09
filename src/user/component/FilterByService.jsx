import { Button, Dropdown, Space } from "antd";
import { TouchIcon } from "../../utils/icons";

export const FilterByService = ({
  items,
  setSelectedService,
  setBoardId,
  getDataByFilterAndSearch,
  order,
  searchData,
  selectedFilter,
  profileData,
  setColumnIdData,
  setSearchKeys,
  setSearchData,
  tempSearchData,
  setTempSearchData,
  getTrackData,
  setLoading,
  setSelectedFilter,
}) => {
  const handleMenuClick = async (e) => {
    let tempBoardId = "";
    setSelectedService(e.key);
    items.forEach((details, index) => {
      if (e.key === index.toString()) {
        tempBoardId = details.boardId;
        setBoardId(details.boardId);
        profileData.forEach((item) => {
          if (item.board_id === tempBoardId) {
            setColumnIdData(JSON.parse(item.service_setting_data));
            setSearchKeys(
              JSON.parse(item.service_setting_data).required_columns.profession
            );
          }
        });
      }
    });

    setSearchData("");
    setTempSearchData("");
    setLoading(true);
    await getTrackData(tempBoardId);
    setLoading(false);
    setSelectedFilter(9);
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
        icon={<TouchIcon style={{ color: "#497ed8" }} />}
        iconPosition="start"
      >
        <Space>Select Service</Space>
      </Button>
    </Dropdown>
  );
};
