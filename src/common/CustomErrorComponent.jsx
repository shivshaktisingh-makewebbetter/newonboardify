import { EmptyImage } from "../utils/icons";

export const CustomEmptyMessage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <EmptyImage />
      <p>No data available</p>
    </div>
  );
};
