import express from "express";
const router = express();
import { create } from "./controller.js";
import uploadMiddleware from "../../../middlewares/multer.js";

router.post("/images", uploadMiddleware.single("avatar"), create);

export default router;
