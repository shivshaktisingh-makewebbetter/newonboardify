import { FilterOutlined } from "@ant-design/icons";
import { Button , Dropdown  } from "antd"


export const FilterByService = ({items}) =>{
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
   
    return (
            <Dropdown
                menu={{
                items,
                }}
                placement="bottomRight"
                key='order'
            >
              <Button style={{display:'flex' , alignItems:'center' , gap:'5px' , color:settingData.button_bg}} type='text' className="governify-sortby-button"> <span><FilterOutlined style={{color:'#497ed8'}}/></span><span className='fs-16 text-color-928f8f'>Filter By Service</span> </Button>
            </Dropdown>
    )
}