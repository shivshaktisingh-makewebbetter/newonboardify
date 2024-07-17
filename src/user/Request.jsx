import React from "react";
import { Hero } from "../components/Hero";



export const Request = () => {
  

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Create Onboarding Request"}
          subheading="Provide essential details to ensure a smooth and efficient onboarding experience for your new team members. Let's get started on building your workforce seamlessly"
          forHome={true}
        />
      </div>
    </div>
  );
};
