import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  console.warn("⚠️ REDIS_URL is not defined — Make sure to set it in your Render environment variables");
}

console.log("REDIS_URL:", process.env.REDIS_URL);

const redis = new Redis(process.env.REDIS_URL!);

redis.on("connect", () => {
  console.log("✅ Redis connected");
});
redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;