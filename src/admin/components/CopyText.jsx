import React from "react";
import { CopyIcon } from "../../utils/icons";

export const CopyText = ({ email }) => {
  const handleTextClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        alignItems: "center",
        justifyContent: "start",
        cursor: "pointer",
      }}
      onClick={handleTextClick}
    >
      <span>
        <CopyIcon />
      </span>
      <span>{email}</span>
    </div>
  );
};

