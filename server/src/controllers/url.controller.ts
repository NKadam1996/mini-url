import { Request, Response } from "express";
import { createShortUrl, getOriginalUrl } from "../services/url.service";

interface RedirectParams {
  code: string;
}

export const shortenUrl = (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortCode = createShortUrl(url);

  res.status(201).json({
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
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
