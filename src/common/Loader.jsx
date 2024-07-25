export const Loader = () => {
  return (
    <div className="loading-overlay full-loader d-flex align-items-center justify-content-center">
      <div className="  spinner">
        <img
          height="90"
          className="rotating-img"
          src="https://onboardifyapi.tasc360.com/asset/loader.png"
          alt=""
        />
      </div>
    </div>
  );
};
