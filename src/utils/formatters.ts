export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(" ").substr(0, 19);
};

export const formatBSB = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}`;
};

export const formatExpiryDate = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};