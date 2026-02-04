import Redis from "ioredis-mock";

const redis = new Redis();

jest.mock("@/config/redis", () => ({
  redis,
}));

afterEach(async () => {
  await redis.flushall();
});
