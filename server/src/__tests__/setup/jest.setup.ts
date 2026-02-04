import { connectTestMongo, disconnectTestMongo, clearTestMongo } from "./mongo";
import "./redis";

beforeAll(async () => {
  await connectTestMongo();
});

afterEach(async () => {
  await clearTestMongo();
});

afterAll(async () => {
  await disconnectTestMongo();
});
