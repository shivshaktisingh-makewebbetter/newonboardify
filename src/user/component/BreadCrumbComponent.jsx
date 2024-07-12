import { RightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

export const BreadcrumbComponent = ({data}) =>{
  const navigate = useNavigate()

  const breadcrumbObject = {
    'track-request':'Track Request'
  }

  const navigateToHome = () =>{
    navigate('/user');
  }

    return (
        <div className='breadcrumb-major-component'>
        <span className='text-decoration-underline governify-breadcumb-home governify-cursor-pointer' onClick={navigateToHome}>Home</span>
        <ol className="breadcrumb">
    

        {data.map((item, index) => (
                  item.length > 0 && item !== 'user' &&(
                    <span key={index}>
                      <li className="breadcrumb-item">
                        <RightOutlined className="fs-12 text-color-928f8f pl-8" />
                        <span className='fs-16 text-color-0d6efd governify-cursor-pointer' style={{paddingLeft:"3px"}}>
                          Request Tracking
                        </span>
                      </li>
                    </span>
                  )
                ))}
          </ol>
        </div>
    )
}