import { useEffect, useState } from "react";
import { EmptyImage } from "../utils/icons";

export const CustomEmptyMessage = () => {
  const [mobileView, setMobileView] = useState(false);

  function checkScreenWidth() {
    if (window.innerWidth < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", checkScreenWidth);
    window.addEventListener("load", checkScreenWidth);
    checkScreenWidth();

    // Cleanup function to remove the listeners on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
      window.removeEventListener("load", checkScreenWidth);
    };
  }, []);
  return (
    <div style={{display:"flex" , justifyContent:"center"}}>
    <div style={{ textAlign: "center" , width:mobileView ?"100%":"300px" , maxWidth:"100%" }}>
      <EmptyImage style={{width:"100%" , maxWidth:"100%"}}/>
      <p>No data available</p>
    </div>
    </div>
  );
};
