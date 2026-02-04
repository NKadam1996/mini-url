import { Router } from "express";
import { redis } from "../config/redis";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.log("Redis error", err);
  });
});

export default router;
