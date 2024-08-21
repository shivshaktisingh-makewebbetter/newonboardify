import { Services } from "./axios";

// Admin Endpoints
export const getAllBoards = async () =>
  Services.GET(`newonboardify/admin/fetchAllBoards`);
export const getUserList = async () =>
  Services.GET(`newonboardify/admin/userListing`);
export const deleteUser = async (id) =>
  Services.DELETE(`newonboardify/admin/userDelete/${id}`);
export const assignBoard = async (data) =>
  Services.POST("newonboardify/admin/assignBoard", data);
export const getBoardColorMapping = () =>
  Services.GET(`newonboardify/admin/getBoardColourMapping`);
export const setAllColorMapping = (data) =>
  Services.POST("newonboardify/admin/boardColourMapping", data);
export const getBoardVisibilityData = (id) =>
  Services.GET(`newonboardify/admin/getboardVisibilityMapping?board_id=${id}`);
export const getBoardVisibilityDataWithEmail = (id, email) =>
  Services.GET(
    `newonboardify/admin/getboardVisibilityMapping?board_id=${id}&email=${email}`
  );
export const setBoardVisibilityDataEndpoint = (data) =>
  Services.POST("newonboardify/admin/boardVisibilityMapping", data);
export const getAllColumnsOfBoard = (id) =>
  Services.GET(`newonboardify/admin/get-board-columns/${id}`);
export const getGeneralSettingsData = () =>
  Services.GET(`newonboardify/admin/getGeneralSettings`);
export const setGeneralSettings = (data) =>
  Services.POST(`newonboardify/admin/generalSettings`, data);
export const setUserOrAdmin = (data) =>
  Services.POST(`newonboardify/admin/addAdminOrUser`, data);
export const updateServiceRequest = ({ id, data }) =>
  Services.PUT(`newonboardify/admin/serviceRequests/${id}`, data);
export const deleteServiceRequest = (id) =>
  Services.DELETE(`newonboardify/admin/serviceRequests/${id}`);
export const getAllUsers = () =>
  Services.GET(`newonboardify/admin/getAllUsers`);
export const getAllUsersWithBoardId = (id) =>
  Services.GET(`newonboardify/admin/getAllUsers/${id}`);
export const getAllCustomers = () =>
  Services.GET(`/newonboardify/admin/getAllCustomer`);
export const createProfileEndPoint = (data) =>
  Services.POST(`newonboardify/admin/onboardifyProfile`, data);
export const getProfileListing = () =>
  Services.GET(`/newonboardify/admin/onboardifyProfile`);
export const updateProfile = (id, data) =>
  Services.PUT(`/newonboardify/admin/onboardifyProfile/${id}`, data);
export const deleteProfile = (id) =>
  Services.DELETE(`/newonboardify/admin/onboardifyProfile/${id}`);
export const makeProfileDefault = (data) =>
  Services.POST(`/newonboardify/admin/updateProfileSetting`, data);
export const getServiceListing = () =>
  Services.GET(`/newonboardify/admin/serviceRequests`);
export const createService = (data) =>
  Services.POST(`/newonboardify/admin/createServiceRequests`, data);
export const getServicesByProfileId = (id) =>
  Services.GET(`newonboardify/admin/getProfileWithServicesById/${id}`);
export const editServices = (id, data) =>
  Services.PUT(`newonboardify/admin/serviceRequests/${id}`, data);
export const deleteServices = (id) =>
  Services.DELETE(`newonboardify/admin/serviceRequests/${id}`);
export const cloneProfile = (id) =>
  Services.GET(`/newonboardify/admin/cloneOnboardifyProfile/${id}`);
export const exportUserData = () =>
  Services.GET(`/newonboardify/admin/exportUsersData`);

// Customer Endpoints
export const requestTrackingWithOrCondition = (id, data) => {
  return Services.POST(
    `newonboardify/customer/requestTrackingByBoardIdAndSearchWithOrCondition/${id}`,
    data
  );
};
export const exportServiceData = (id) => {
  return Services.GET(`newonboardify/customer/exportDataByBoardId/${id}`);
};
export const getUserFormAndChart = () =>
  Services.GET(`newonboardify/customer/getUserFormAndChart`);
export const getRequestTrackingData = () =>
  Services.POST(`newonboardify/customer/requestTracking`);
export const getRequestTrackingDataByBoardId = (id, data = null) =>
  data
    ? Services.POST(
        `newonboardify/customer/requestTrackingByBoardId/${id}`,
        data
      )
    : Services.POST(`newonboardify/customer/requestTrackingByBoardId/${id}`);
export const getBoardSettingDataCustomerByID = (id) =>
  Services.GET(
    `newonboardify/customer/getboardVisibilityMapping?board_id=${id}`
  );
export const getBoardSettingDataCustomerByIdAndEmail = (id, email) =>
  Services.GET(
    `newonboardify/customer/getboardVisibilityMapping?board_id=${id}&email=${email}`
  );
export const getSubItemDetails = (id, boardId) =>
  Services.GET(
    `newonboardify/customer/requestTrackingActivity/?board_id=${boardId}&item_id=${id}`
  );
export const getColorMappingForUser = () =>
  Services.GET(`newonboardify/customer/getBoardColourMapping`);
export const getAllProfileDataByUser = () =>
  Services.GET(`newonboardify/customer/allProfileWithServicesByUser`);
export const getAllServicesByUser = () =>
  Services.GET(`newonboardify/customer/getAllRequestTrackingByUserServices`);
export const getServiceByBoardId = (id) =>
  Services.POST(`newonboardify/customer/requestTrackingByBoardId/${id}`);
export const getTrackingDataByBoardId = (id, data = null) =>
  data
    ? Services.POST(
        `/newonboardify/customer/requestTrackingByBoardId/${id}`,
        data
      )
    : Services.POST(`/newonboardify/customer/requestTrackingByBoardId/${id}`);
export const getBoardIdByUser = () =>
  Services.GET(`/newonboardify/customer/getBoardIdByUser`);
export const getRequestTrackingDataByBoardIdAndSearch = (id, data) =>
  Services.POST(
    `newonboardify/customer/requestTrackingByBoardIdAndSearch/${id}`,
    data
  );
export const getAllFilters = (id) =>
  Services.GET(`/newonboardify/customer/getFilterColumnByBoardId/${id}`);

export const swapService = (data) =>
  Services.POST(`newonboardify/admin/onboardifyServiceCategories/swap`, data);

export const updateServiceVisibility = (data) =>
  Services.POST(`newonboardify/admin/updateServiceVisibility`, data);

// Common Endpoints
export const loginApi = (data) => Services.POST(`commom-login`, data);
export const registerApi = (data) =>
  Services.POST(`onboardify/newSignup`, data);
export const forgotPasswordApi = (data) => Services.POST(`commom-forgot`, data);
export const getLoginUserDetails = (data) =>
  Services.GET(`loginUserDetails/${data}`);
export const updateNewPassword = (data) =>
  Services.POST(`common/updateNewPassword`, data);
export const commonVerifyUser = (data) =>
  Services.POST(`common/verifyUser`, data);
export const geAllLikesUser = () => Services.GET(`incorpify/listAllLikes`);
export const getCustomerGeneralSettings = (data) => {
  const role = data === "superAdmin" || data === "admin" ? "admin" : "customer";
  return Services.GET(`newonboardify/${role}/getGeneralSettings`);
};
