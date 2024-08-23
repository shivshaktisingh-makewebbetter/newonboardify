import { Button, Dropdown, Space } from "antd";
import { TouchIcon } from "../../utils/icons";

export const FilterByService = ({
  items,
  setSelectedService,
  setBoardId,
  profileData,
  setColumnIdData,
  setSearchKeys,
  setSearchData,
  setTempSearchData,
  getTrackData,
  setLoading,
  setSelectedFilter,
  setFilterKeyData,
  updateSelectedService,
  profileId
}) => {
  const handleMenuClick = async (e) => {
    let tempBoardId = "";
    let service_id = "";
    let tempFilterKeyData = {};
    setSelectedService(e.key);
    items.forEach((details, index) => {
      if (e.key === index.toString()) {
        tempBoardId = details.boardId;
        setBoardId(details.boardId);
        profileData.forEach((item) => {
          if (item.board_id === tempBoardId) {
            setColumnIdData(JSON.parse(item.service_setting_data));
            setFilterKeyData(JSON.parse(item.service_column_value_filter));
            tempFilterKeyData = JSON.parse(item.service_column_value_filter);
            setSearchKeys(
              JSON.parse(item.service_setting_data).required_columns.profession
            );
          }
        });
      }
    });

    profileData.forEach((detail) => {
      if (detail.board_id === items[e.key].boardId) {
        service_id = detail.id;
      }
    });

    setSearchData("");
    setTempSearchData("");
    setSelectedFilter("9");
    setLoading(true);
    await updateSelectedService({profile_id:profileId , service_id:service_id});
    await getTrackData(tempBoardId, tempFilterKeyData);
    setLoading(false);
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
