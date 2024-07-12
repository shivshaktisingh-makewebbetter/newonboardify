import { Hero } from "../components/Hero";

export const Check = () => {
  return (
    <div style={{padding:"1rem"}}>
      <div style={{marginTop:"3rem" , marginBottom:"1rem"}}>
      <Hero
        heading={"Overall Status"}
        subheading="Stay informed and in control of the overall status of your onboarding requests"
        forHome={true}
      />
      </div>
     
      <div style={{margin:"0px",height:"130vh",position:"relative" }} className="w-100"  id="iframe-chart">
      <iframe src="https://view.monday.com/embed/1393670128-0951f4e4e230111c651e55e9ecb28980?r=euc1" width="100%" height="100%" style={{border: "0" , boxShadow: "5px 5px 56px 0px rgba(0,0,0,0.25)"}}></iframe>
      <div class="w-100 bottom-blur" style={{height: "50px"}}></div>
      </div>
    </div>
  );
};
