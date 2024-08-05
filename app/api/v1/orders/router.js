import express from "express";
const router = express();
import { index } from "./controller.js";
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";

router.get(
  "/orders",
  authenticateUser,
  authorizedRoles("organizer", "admin", "owner"),
  index
);

export default router;
