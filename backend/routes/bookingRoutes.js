const express = require("express");
const {
    createBooking,
    cancelBooking,
    getBookings,
} = require("../controllers/bookingController");

const router = express.Router();

// Create a new booking
router.post("/bookings/:carId", createBooking);

// Cancel a booking
router.put("/bookings/:bookingId/cancel", cancelBooking);

// Get all bookings for a specific car
router.get("/bookings/:carId", getBookings);

module.exports = router;
