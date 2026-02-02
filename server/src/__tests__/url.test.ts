import request from "supertest";
import app from "../app";

describe("URL Shortener", () => {
  it("shortens a URL", async () => {
    const res = await request(app)
      .post("/api/shorten")
      .send({ url: "https://example.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortUrl).toBeDefined();
  });

  it("redirects to original URL", async () => {
    const shortenRes = await request(app)
      .post("/api/shorten")
      .send({ url: "https://example.com" });

    const shortUrl = shortenRes.body.shortUrl;
    const code = shortUrl.split("/").pop();

    const redirectRes = await request(app).get(`/${code}`);
    expect(redirectRes.status).toBe(302);
    expect(redirectRes.headers.location).toBe("https://example.com");
  });
});
