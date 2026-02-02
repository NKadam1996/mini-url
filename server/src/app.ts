import express from "express";
import urlRoutes from "./routes/url.routes";
import { redirectUrl } from "./controllers/url.controller";

const app = express();

app.use(express.json());

app.use("/api", urlRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/:code", redirectUrl);

export default app;
