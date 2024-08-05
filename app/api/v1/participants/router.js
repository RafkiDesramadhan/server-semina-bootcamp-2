import express from "express";
const router = express();
import {
  activeParticipant,
  signIn,
  signUp,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
  checkout,
} from "./controller.js";
import { authenticateParticipant } from "../../../middlewares/auth.js";

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.put("/active", activeParticipant);
router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/orders", authenticateParticipant, getDashboard);
router.post("/checkout", authenticateParticipant, checkout);

export default router;
