import express from "express";
const router = express();
import { create, index, find, update, destroy } from "./controller.js";
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";

router.get("/talents", authenticateUser, authorizedRoles("organizer"), index);
router.post("/talents", authenticateUser, authorizedRoles("organizer"), create);
router.get(
  "/talents/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  find
);
router.put(
  "/talents/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  update
);
router.delete(
  "/talents/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  destroy
);

export default router;
