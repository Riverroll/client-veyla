const decodeToken = (token) => {
  const base64Url = token.split(".")[1]; // Mengambil bagian payload dari token
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Mengganti karakter yang tidak valid untuk base64
  const jsonPayload = decodeURIComponent(
    atob(base64) // Mengubah dari base64 ke string
      .split("") // Memecah string menjadi array karakter
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)) // Mengubah karakter menjadi format URL
      .join("") // Menggabungkan kembali karakter menjadi string
  );

  return JSON.parse(jsonPayload); // Mengubah string JSON menjadi objek JavaScript
};

export const isTokenValid = (token) => {
  if (!token) return false; // Jika token tidak ada, kembalikan false

  try {
    const { exp } = decodeToken(token); // Mendapatkan nilai exp (expiration) dari token
    if (Date.now() >= exp * 1000) {
      return false; // Jika waktu sekarang lebih besar dari waktu kadaluarsa, kembalikan false
    }
    return true;
  } catch (error) {
    return false;
  }
};
