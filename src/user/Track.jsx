import { Hero } from "../components/Hero";

export const Track = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Request Tracking"}
          subheading="Track your onboarding progress effortlessly by using our request-tracking center"
          forHome={true}
        />
      </div>
    </div>
  );
};
