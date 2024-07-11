import { Hero } from "../components/Hero";

export const Request = () => {
  return (
    <div className="pt-84">
      <Hero
        heading={"Create Onboarding Request"}
        subheading="Provide essential details to ensure a smooth and efficient onboarding experience for your new team members. Let's get started on building your workforce seamlessly"
        forHome={true}
      />
    </div>
  );
};
