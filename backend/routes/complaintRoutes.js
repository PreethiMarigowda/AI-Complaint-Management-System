import express from "express";

import {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE COMPLAINT
router.post(
  "/create",
  isAuthenticated,
  createComplaint
);

// USER COMPLAINTS
router.get(
  "/my",
  isAuthenticated,
  getUserComplaints
);

// ADMIN - ALL COMPLAINTS
router.get(
  "/all",
  isAuthenticated,
  getAllComplaints
);

// UPDATE STATUS
router.put(
  "/:id",
  isAuthenticated,
  updateComplaintStatus
);

export default router;