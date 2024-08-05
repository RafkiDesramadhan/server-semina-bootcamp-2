import express from "express";
const router = express();
import {
  create,
  index,
  find,
  update,
  destroy,
  changeStatus,
} from "./controller.js";
import {
  authenticateUser,
  authorizedRoles,
} from "../../../middlewares/auth.js";

router.get("/events", authenticateUser, authorizedRoles("organizer"), index);
router.post("/events", authenticateUser, authorizedRoles("organizer"), create);
router.get("/events/:id", authenticateUser, authorizedRoles("organizer"), find);
router.put(
  "/events/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticateUser,
  authorizedRoles("organizer"),
  destroy
);
router.put(
  "/events/:id/status",
  authenticateUser,
  authorizedRoles("organizer"),
  changeStatus
);

export default router;
