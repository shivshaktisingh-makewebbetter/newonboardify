import { Hero } from "./Hero";
import { Welcome } from "./Welcome";

export const SubHeader = () => {
  return (
    <div className="pt-84">
      <Welcome />
      <Hero heading={"Onboardify"} subheading="" forHome={true} />
    </div>
  );
};
