import { Hono } from "hono";
import { routerSetup } from "../src/router/router";

const app = new Hono();

const main = () => {
  try {
    routerSetup(app);
  } catch (error) {
    console.error(error);
  }
};

main();

export default app;
