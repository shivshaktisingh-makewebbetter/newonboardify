import React, { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { getUserFormAndChart } from "../apiservice/ApiService";

export const Request = () => {
  const [formCode, setFormCode] = useState("");
  const fetchForm = async () => {
    const response = await getUserFormAndChart();
    if (response.success) {
      const columns = JSON.parse(response.data.response?.columns);
      if (
        columns.hasOwnProperty("extra_details") &&
        columns.extra_details.hasOwnProperty("form_embed_code") &&
        columns.extra_details.form_embed_code
      ) {
        setFormCode(columns.extra_details.form_embed_code);
        let element = document.getElementById("iframe-signup");
        element.innerHTML = columns.extra_details.form_embed_code;
      } else {
        setFormCode("");
      }
      // const formCode =
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Create Onboarding Request"}
          subheading="Provide essential details to ensure a smooth and efficient onboarding experience for your new team members. Let's get started on building your workforce seamlessly"
          forHome={true}
        />
        <div style={{ margin: "0px", height: "75vh" }} id="iframe-signup"></div>
      </div>
    </div>
  );
};
