export function getUser() {
  const json = localStorage.getItem("user");
  return json ? JSON.parse(json) : null;
}
