import app from "./app";
import { env } from "./config/env";
import { connectMongo } from "./config/mongo";

const PORT = env.PORT;

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();