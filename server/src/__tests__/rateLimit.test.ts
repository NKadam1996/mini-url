import request from "supertest";
import app from "../../src/app";

describe("Rate limiting", () => {
  it("blocks after exceeding limit", async () => {
    const agent = request(app);

    await agent
      .post("/shorten")
      .set("x-test-ip", "test-ip")
      .send({ url: "https://example.com" });

    await agent
      .post("/shorten")
      .set("x-test-ip", "test-ip")
      .send({ url: "https://example.com" });

    const res = await agent
      .post("/shorten")
      .set("x-test-ip", "test-ip")
      .send({ url: "https://example.com" });

    expect(res.status).toBe(429);
  });
});
