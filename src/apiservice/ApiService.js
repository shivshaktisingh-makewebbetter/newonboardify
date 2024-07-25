import { Services } from "./axios";

export const getAllBoards = async () => {
  return Services.GET(`newonboardify/admin/fetchAllBoards`);
};

export const getUserList = async () => {
  return Services.GET(`newonboardify/admin/userListing`);
};

export const deleteUser = async (id) => {
  return Services.DELETE(`newonboardify/admin/userDelete/${id}`);
};

export const assignBoard = async (data) => {
  return Services.POST("newonboardify/admin/assignBoard", data);
};

export const getBoardColorMapping = () => {
  return Services.GET(`newonboardify/admin/getBoardColourMapping`);
};

export const setAllColorMapping = (data) => {
  return Services.POST("newonboardify/admin/boardColourMapping", data);
};

export const getBoardVisibilityData = (id) => {
  return Services.GET(
    `newonboardify/admin/getboardVisibilityMapping?board_id=${id}`
  );
};

export const getBoardVisibilityDataWithEmail = (id, email) => {
  return Services.GET(
    `newonboardify/admin/getboardVisibilityMapping?board_id=${id}&email=${email}`
  );
};

export const setBoardVisibilityDataEndpoint = (data) => {
  return Services.POST("newonboardify/admin/boardVisibilityMapping", data);
};

export const getCompleteDataForBoardVisibility = (id) => {
  return Services.GET(`newonboardify/admin/get-board-columns/${id}`);
};

export const getGeneralSettingsData = () => {
  return Services.GET(`newonboardify/admin/getGeneralSettings`);
};

export const setGeneralSettings = (data) => {
  return Services.POST(`newonboardify/admin/generalSettings`, data);
};

export const setUserOrAdmin = (data) => {
  return Services.POST(`newonboardify/admin/addAdminOrUser`, data);
};

export const createService = (data) => {
  return Services.POST(`newonboardify/admin/createServiceRequests`, data);
};

export const getServiceRequestListing = () => {
  return Services.GET(`newonboardify/admin/serviceRequests`);
};

export const updateServiceRequest = ({ id, data }) => {
  return Services.PUT(`newonboardify/admin/serviceRequests/${id}`, data);
};

export const deleteServiceRequest = (id) => {
  return Services.DELETE(`newonboardify/admin/serviceRequests/${id}`);
};

export const getAllUsers = () => {
  return Services.GET(`newonboardify/admin/getAllUsers`);
};

export const getAllUsersWithBoardId = (id) => {
  return Services.GET(`newonboardify/admin/getAllUsers/${id}`);
};

export const getUserFormAndChart = () => {
  return Services.GET(`newonboardify/customer/getUserFormAndChart`);
};

export const getRequestTrackingData = () => {
  return Services.POST(`newonboardify/customer/requestTracking`);
};

export const getBoardSettingDataCustomerByID = (id) => {
  return Services.GET(
    `newonboardify/customer/getboardVisibilityMapping?board_id=${id}`
  );
};

export const getBoardSettingDataCustomerByIdAndEmail = (id, email) => {
  return Services.GET(
    `newonboardify/customer/getboardVisibilityMapping?board_id=${id}&email=${email}`
  );
};

export const getSubItemDetails = (id) => {
  return Services.GET(`newonboardify/customer/requestTrackingActivity/${id}`);
};

export const loginApi = (data) => {
  return Services.POST(`commom-login`, data);
};

export const registerApi = (data) => {
  return Services.POST(`onboardify/newSignup`, data);
};

export const forgotPasswordApi = (data) => {
  return Services.POST(`commom-forgot`, data);
};

export const getLoginUserDetails = (data) => {
  return Services.GET(`loginUserDetails/${data}`);
};

export const getColorMappingForUser = () => {
  return Services.GET(`newonboardify/customer/getBoardColourMapping`);
};

export const geAllLikesUser = () => {
  return Services.GET(`incorpify/listAllLikes`);
};

export const updateNewPassword = (data) => {
  return Services.POST(`common/updateNewPassword`, data);
};

export const getCustomerGeneralSettings = (data) => {
  const role = data === "superAdmin" || data === "admin" ? "admin" : "customer";
  return Services.GET(`newonboardify/${role}/getGeneralSettings`);
};

export const commonVerifyUser = (data) => {
  return Services.POST(`common/verifyUser`, data);
};

export const getAllCustomers = () => {
  return Services.GET(`/newonboardify/admin/getAllCustomer`);
};

export const createProfileEndPoint = (data) => {
  return Services.POST(`newonboardify/admin/onboardifyProfile`, data);
};
