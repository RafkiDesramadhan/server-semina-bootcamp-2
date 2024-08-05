import express from "express";
const router = express();
import { create, index, find, update, destroy } from "./controller.js";
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";

router.get(
  "/categories",
  authenticateUser,
  authorizedRoles("organizer"),
  index
);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  find
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  destroy
);
router.post(
  "/categories",
  authenticateUser,
  authorizedRoles("organizer"),
  create
);

export default router;
