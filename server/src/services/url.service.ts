import { readdirSync } from "node:fs";
import { UrlModel } from "../models/url.model";
import { findByShortCode } from "../repositories/url.repository";
import { generateShortCode } from "../utils/base62";
import { redis } from "../config/redis";

const urlStore = new Map<string, string>();

export const createShortUrl = async (originalUrl: string) => {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateShortCode();
    exists = !!(await UrlModel.exists({ shortCode }));
  }

  await UrlModel.create({ originalUrl, shortCode });

  await redis.set(`url:${shortCode}`, originalUrl);

  return shortCode;
};

export const getOriginalUrl = async (code: string) => {
  const cachedUrl = await redis.get(`url:${code}`);
  if (cachedUrl) {
    return cachedUrl;
  }
  const record = await findByShortCode(code);
  if (!record) {
    return null;
  }
  await redis.set(`url:${code}`, record.originalUrl);
  return record.originalUrl;
};
