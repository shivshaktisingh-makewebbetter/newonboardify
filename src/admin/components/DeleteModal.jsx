import { Button, Modal, Typography } from "antd";

export const DeleteModal = ({open ,handleCancel , handleDelete}) => {
    const settingData = JSON.parse(sessionStorage.getItem("settings")) || {
		image:
		  "https://onboardify.tasc360.com/uploads/y22.png",
		site_bg: "#ffffff",
		button_bg: "#497ed8",
		banner_bg: "#497ed8",
		banner_content:
		  "Hire an attitude, not just experience and qualification. Greg Savage.",
		header_bg: "#f7f7f7",
		head_title_color: "#497ed8",
	  };	
  return (
    <Modal
      open={open}
      title="Delete User"
      centered
      footer={(_, record) => (
        <>
          <Button
            style={{
              background: settingData.button_bg,
              color: "#fff",
              border: "none",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button style={{ border: "none" }} onClick={handleCancel}>
            Cancel
          </Button>
        </>
      )}
      onCancel={handleCancel}
    >
      <Typography>Are you sure you want to delete this User?</Typography>
    </Modal>
  );
};
