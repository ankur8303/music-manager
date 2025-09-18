export const isLoggedIn = () => {
  return !!localStorage.getItem("mm_currentUser");
};