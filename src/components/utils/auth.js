export const isLoggedIn = () => {
  return !!localStorage.getItem("mm_currentUser"); // returns true if a user is logged in
};