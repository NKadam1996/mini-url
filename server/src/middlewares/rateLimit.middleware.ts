// src/middleware/rateLimit.middleware.ts
import { redis } from "../config/redis";
import { Request, Response, NextFunction } from "express";

const DEFAULT_LIMIT = 10;
const TEST_LIMIT = 2;
const WINDOW_SECONDS = 60;

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const identifier =
    (req.headers["x-test-ip"] as string) ||
    req.ip ||
    "unknown";

  const key = `rate:${identifier}`;

  const limit =
    process.env.NODE_ENV === "test"
      ? TEST_LIMIT
      : DEFAULT_LIMIT;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  if (count > limit) {
    return res.status(429).json({
      error: "Too many requests",
    });
  }

  next();
};
