// authUtils.js
export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (userData) => {
  sessionStorage.setItem("user", JSON.stringify(userData));
};

export const clearUser = () => {
  sessionStorage.removeItem("user");
};
