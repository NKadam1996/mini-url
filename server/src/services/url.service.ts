import { generateShortCode } from "../utils/base62";

const urlStore = new Map<string, string>();

export const createShortUrl = (originalUrl: string): string => {
  const code = generateShortCode();
  urlStore.set(code, originalUrl);
  return code;
};

export const getOriginalUrl = (code: string): string | undefined => {
  return urlStore.get(code);
};
