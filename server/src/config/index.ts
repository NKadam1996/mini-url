import { env } from "./env";

export const config = {
  port: Number(env.PORT),
  nodeEnv: env.NODE_ENV,
};
