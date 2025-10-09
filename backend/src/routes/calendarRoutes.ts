import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  getEvents,
  getTodayEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/calendarController";
import {
  validateDateRangeQuery,
  validateEventData,
  validateEventId,
} from "../middleware/calendarValidation";

const router = express.Router();

router.get("/events", authenticateToken, validateDateRangeQuery, getEvents);

router.get("/today", authenticateToken, getTodayEvents);

router.post("/events", authenticateToken, validateEventData, createEvent);

router.put(
  "/events/:id",
  authenticateToken,
  validateEventId,
  validateEventData,
  updateEvent
);

router.delete("/events/:id", authenticateToken, validateEventId, deleteEvent);

export default router;
