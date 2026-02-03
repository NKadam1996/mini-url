import { UrlModel } from "../models/url.model";
import { generateShortCode } from "../utils/base62";

const urlStore = new Map<string, string>();

export const createShortUrl = async (originalUrl: string) => {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateShortCode();
    exists = !!(await UrlModel.exists({ shortCode }));
  }

  const url = await UrlModel.create({originalUrl, shortCode});
  

  return shortCode;
};

export const getOriginalUrl = (code: string): string | undefined => {
  return urlStore.get(code);
};
