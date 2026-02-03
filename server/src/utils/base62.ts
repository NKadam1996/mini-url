const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateShortCode = (length = 6): string => {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * 62)];
  }
  return result;
};
