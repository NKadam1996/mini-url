import request from "supertest";
import app from "../../src/app";

describe("POST /shorten", () => {
  it("creates a short URL for valid input", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ url: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBeDefined();
  });
  it("rejects invalid URL", async () => {
    const res = await request(app).post("/shorten").send({ url: "not-a-url" });
    expect(res.status).toBe(400);
  });
});
