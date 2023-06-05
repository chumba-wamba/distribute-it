export const setAccessToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const removeAccessToken = () => localStorage.removeItem("access_token");

export const isLoggedIn = () => !!localStorage.getItem("access_token");
