import { UrlModel } from "../models/url.model";

export const findByShortCode = async (shortCode: string) => {
  return UrlModel.findOne({ shortCode }).lean();
};
