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
