import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app = express();

// router
import categoriesRouter from "./app/api/v1/categories/router.js";
import imagesRouter from "./app/api/v1/images/router.js";
import talentsRouter from "./app/api/v1/talents/router.js";
import eventsRouter from "./app/api/v1/events/router.js";
import organizersRouter from "./app/api/v1/organizers/router.js";
import authCMSRouter from "./app/api/v1/auth/router.js";
import ordersRouter from "./app/api/v1/orders/router.js";
import participantsRouter from "./app/api/v1/participants/router.js";
import paymentsRouter from "./app/api/v1/payments/router.js";

const v1 = "/api/v1";

import notFoundMiddleware from "./app/middlewares/not-found.js";
import handlerErrorMiddleware from "./app/middlewares/handler-error.js";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to api semina",
  });
});

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(`${v1}`, participantsRouter);

// Custom Error
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

export default app;
