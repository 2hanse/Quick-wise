import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  getEventAIContent,
  getTodayAIContent,
} from "../controllers/aiContentController";

const router = express.Router();

router.get("/today", authenticateToken, getTodayAIContent);

router.get("/event/:eventId", authenticateToken, getEventAIContent);

export default router;
