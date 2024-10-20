export const formatCurrency = (amount) => {
  // Convert string to a number
  const numericAmount = parseFloat(amount);

  // Check if conversion is successful and amount is a valid number
  if (isNaN(numericAmount)) {
    return "RP 0"; // Return a default value if the input is not a valid number
  }

  return `RP ${numericAmount.toLocaleString("id-ID")}`;
};

export const formatDateTime = (dateTime) => {
  // Memformat tanggal dan waktu dalam format lokal Indonesia
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(dateTime).toLocaleString("id-ID", options);
};
