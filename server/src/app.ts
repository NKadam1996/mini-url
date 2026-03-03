import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { redirectUrl } from "./controllers/url.controller";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Routes
app.use("/api", routes);
app.get("/:code", redirectUrl);

// Code to serve React frontend
const clientPath = path.join(__dirname, "../../../client/dist");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
