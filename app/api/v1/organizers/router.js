import express from "express";
const router = express();
import {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
} from "./controller.js";
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";

router.post(
  "/organizers",
  authenticateUser,
  authorizedRoles("owner"),
  createCMSOrganizer
);
router.post(
  "/users",
  authenticateUser,
  authorizedRoles("organizer"),
  createCMSUser
);

router.get("/users", authenticateUser, authorizedRoles("owner"), getCMSUsers);

export default router;
