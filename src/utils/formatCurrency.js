export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
};
