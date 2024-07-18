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

export const getBoardVisibilityDataWithEmail = (id , email) => {
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

export const updateServiceRequest = ({id , data}) =>{
  return Services.PUT(`newonboardify/admin/serviceRequests/${id}` , data)
}

export const deleteServiceRequest = (id) =>{
  return Services.DELETE(`newonboardify/admin/serviceRequests/${id}`)
}

export const getAllUsers = () =>{
  return Services.GET(`newonboardify/admin/getAllUsers`);
}

export const getAllUsersWithBoardId = (id) =>{
  return Services.GET(`newonboardify/admin/getAllUsers/${id}`);
}

export const getUserFormAndChart = () =>{
  return Services.GET(`newonboardify/customer/getUserFormAndChart`);
}

