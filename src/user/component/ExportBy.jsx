import { Button } from "antd";
import { ExportIcon } from "../../utils/icons";

export const ExportBy = ({ setOpenDrawer }) => {
  return (
    <>
      <Button
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
        type="text"
        className="governify-sortby-button"
        onClick={() => setOpenDrawer(true)}
      >
        {" "}
        <span>
          <ExportIcon />
        </span>
        <span className="fs-16 text-color-928f8f">Export</span>{" "}
      </Button>
    </>
  );
};
