import cors, { type CorsOptions } from "cors";
import { env } from "../config/env";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (env.frontendOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin not allowed: ${origin}`));
  },
};

export const corsMiddleware = cors(corsOptions);
