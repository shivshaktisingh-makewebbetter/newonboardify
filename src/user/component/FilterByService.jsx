import { FilterOutlined } from "@ant-design/icons";
import { Button , Dropdown, Space  } from "antd"
import { FilterIcon } from "../../utils/icons";


export const FilterByService = ({items , setSelectedService}) =>{
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

  const handleMenuClick = (e) => {
    setSelectedService(e.key);
   };
   
   const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ['9'],
    onClick: handleMenuClick,
  };

    return (
        
            <Dropdown menu={menuProps}>
            <Button type="text" style={{fontSize:"16px" , color:"#928f8f" , padding:"0px" , marginRight:"14px"}} icon={<FilterIcon style={{color:'#497ed8'}}/>} iconPosition="start">
              <Space>
                Select Service
              </Space>
            </Button>
          </Dropdown>
    )
}