import { Services } from "./axios";

export const getAllBoards = async () => {
  return Services.GET(`governify/admin/fetchAllBoards`);
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

export const setBoardVisibilityDataEndpoint = (data) => {
  return Services.POST("newonboardify/admin/boardVisibilityMapping", data);
};

export const getCompleteDataForBoardVisibility = (id) =>{
  return Services.GET(`newonboardify/admin/get-board-columns/${id}`)
}

export const getGeneralSettingsData = () =>{
  return Services.GET(`newonboardify/admin/getGeneralSettings`);
}

export const setGeneralSettings = (data) =>{
   return Services.POST(`newonboardify/admin/generalSettings` , data);
}

export const setUserOrAdmin = (data) =>{
  return Services.POST(`newonboardify/admin/addAdminOrUser` , data);
}
