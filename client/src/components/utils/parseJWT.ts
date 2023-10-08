const parseJwt = (tokenData: string | null) => {
  if (tokenData === "undefined" || tokenData === null) {
    localStorage.removeItem("jwt");
    return;
  }
  const base64Url = tokenData.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export default parseJwt;
