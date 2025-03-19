import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate Booking ID
const generateBookingId = () => "BOOK-" + Math.random().toString(36).substr(2, 9).toUpperCase();

// Create Booking
router.post("/", protect, async (req, res) => {
  try {
    const { hotel, roomType, checkInDate, checkOutDate } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      hotel,
      roomType,
      checkInDate,
      checkOutDate,
      bookingId: generateBookingId(),
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Bookings for User
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("hotel");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
