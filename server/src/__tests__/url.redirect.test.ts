import request from "supertest";
import app from "../../src/app";

describe("GET /:code", () => {
  it("redirects to original URL", async () => {
    const create = await request(app)
      .post("/shorten")
      .send({ url: "https://example.com" });

    const shortUrl = create.body.shortUrl;
    const code = shortUrl.split("/").pop();

    const res = await request(app).get(`/${code}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("https://example.com");
  });

  it("returns 404 for invalid code", async () => {
    const res = await request(app).get("/invalid123");
    expect(res.status).toBe(404);
  });
});
