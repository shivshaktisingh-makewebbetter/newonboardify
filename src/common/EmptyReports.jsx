import { ServiceReportIconEmpty } from "../utils/icons";

export const EmptyReports = () => {
  return (
    <>
      <div
        style={{
          background: "white",
          margin: "auto",
          marginTop:"32px" ,
          marginLeft: "20px",
          marginRight: "20px",
          padding: "40px 0 56px 0",
          display: "flex",
          flexDirection: "column",
          borderRadius:"8px" ,
          gap: "24px",
        }}
      >
        <div>
          <ServiceReportIconEmpty />
        </div>
        <div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "33.6px",
              textAlign: "center",
              color: "#202223",
              fontFamily: "Graphie-Book",
            }}
          >
            You do not have any reports yet!
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22.4px",
              textAlign: "center",
              color: "#6d7175",
              fontFamily: "Graphie-Light",
            }}
          >
            All of Reports will appear here.
          </p>
        </div>
      </div>
    </>
  );
};
