import cors, { type CorsOptions } from "cors";
import { env } from "../config/env";

/**
 * Only the front-end may call this API from a browser.
 *
 * - A request with no Origin header (curl, Postman, server-to-server)
 *   is allowed — that is how the API is tested in development.
 * - A browser request whose Origin is on the FRONTEND_ORIGINS
 *   allow-list is allowed.
 * - Any other browser Origin is rejected (403, "Not allowed by CORS").
 *
 * This is the Lab 4.1 interpretation of "requests should only be
 * accepted from the front-end (and development tools like Postman)".
 * CORS is a browser enforcement, not authentication — it does not
 * stop a non-browser client from calling the API, and it is not
 * presented here as if it did.
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (env.frontendOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin not allowed: ${origin}`));
  },
};

export const corsMiddleware = cors(corsOptions);
