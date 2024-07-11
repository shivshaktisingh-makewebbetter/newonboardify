import { Hero } from "../components/Hero";

export const CreateAdmin = () => {
  return (
    <div className="pt-84">
      <Hero
        heading={"Overall Status"}
        subheading="Stay informed and in control of the overall status of your onboarding requests"
        forHome={true}
      />
    </div>
  );
};
