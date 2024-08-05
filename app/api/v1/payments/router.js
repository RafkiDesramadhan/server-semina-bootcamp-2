import express from "express";
const router = express();
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";
import { index, find, update, destroy, create } from "./controller.js";

router.get("/payments", authenticateUser, authorizedRoles("organizer"), index);
router.get(
  "/payments/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  find
);
router.put(
  "/payments/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  update
);
router.delete(
  "/payments/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  destroy
);
router.post(
  "/payments",
  authenticateUser,
  authorizedRoles("organizer"),
  create
);

export default router;
