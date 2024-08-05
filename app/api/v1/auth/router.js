import express from "express";
const router = express();
import { signInCMS } from "./controller.js";

router.post("/auth/signin", signInCMS);

export default router;
