import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { BreadcrumbComponent } from "./component/BreadCrumbComponent";


export const Track = () => {
  const location = useLocation();
  const breadCrumbData = location.pathname.split("/");
 

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Request Tracking"}
          subheading="Track your onboarding progress effortlessly by using our request-tracking center"
          forHome={true}
        />
      </div>
      <BreadcrumbComponent data={breadCrumbData} />
     
    </div>
  );
};
