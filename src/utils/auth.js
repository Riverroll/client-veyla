const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const { exp } = decodeToken(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
