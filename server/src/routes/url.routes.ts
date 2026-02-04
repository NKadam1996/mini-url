import { Router } from "express";
import { rateLimiter } from "../middlewares/rateLimit.middleware";
import { shortenUrl, redirectUrl } from "../controllers/url.controller";

const router = Router();

router.post("/shorten", rateLimiter, shortenUrl);
router.get("/:code", redirectUrl);

export default router;
