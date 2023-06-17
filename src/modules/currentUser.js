
// easily check current user value
export function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getCurrentUser() {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}
