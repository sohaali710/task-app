export const loginHelper = (newToken: string): string => {
  localStorage.setItem("token", newToken);
  return newToken;
};

export const logoutHelper = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
