import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Pixell River back-end listening on http://localhost:${env.port}`);
  console.log(`Allowed front-end origins: ${env.frontendOrigins.join(", ")}`);
  console.log(`Try: curl http://localhost:${env.port}/api/employees`);
});
