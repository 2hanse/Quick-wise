import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  getEventAIContent,
  getTodayAIContent,
  retryEventAIContent,
} from "../controllers/aiContentController";

const router = express.Router();

router.get("/today", authenticateToken, getTodayAIContent);

router.get("/event/:eventId", authenticateToken, getEventAIContent);

router.get("/event/:eventId/retry", authenticateToken, retryEventAIContent);

export default router;
