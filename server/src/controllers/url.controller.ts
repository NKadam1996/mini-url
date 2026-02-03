import { Request, Response } from "express";
import { createShortUrl, getOriginalUrl } from "../services/url.service";
import { isValidUrl } from "../utils/validateUrl";

interface RedirectParams {
  code: string;
}

export const shortenUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  try {
    const shortCode = await createShortUrl(url);

    res.status(201).json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to shorten URL" });
  }
};

export const redirectUrl = (req: Request<RedirectParams>, res: Response) => {
  const { code } = req.params;

  // Base62 validation
  if (!/^[A-Za-z0-9]+$/.test(code)) {
    return res.status(404).json({ error: "Invalid shortcode" });
  }

  const originalUrl = getOriginalUrl(code);
  console.log(originalUrl);

  if (!originalUrl) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(originalUrl);
};
