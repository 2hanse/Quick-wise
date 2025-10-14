import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  getEvents,
  getTodayEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  syncEvents,
} from "../controllers/calendarController";
import {
  validateDateRangeQuery,
  validateEventData,
  validateEventId,
} from "../middleware/calendarValidation";

const router = express.Router();

router.get("/events", authenticateToken, validateDateRangeQuery, getEvents);

router.get("/events/today", authenticateToken, getTodayEvents);

router.post("/events", authenticateToken, validateEventData, createEvent);

router.put(
  "/events/:id",
  authenticateToken,
  validateEventId,
  validateEventData,
  updateEvent
);

router.delete("/events/:id", authenticateToken, validateEventId, deleteEvent);

router.post("/sync", authenticateToken, validateDateRangeQuery, syncEvents);

export default router;
