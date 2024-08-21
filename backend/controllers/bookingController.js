const Booking = require("../models/Booking");
const Car = require("../models/Car");
const mongoose = require("mongoose");
const sendEmail = require("../config/email"); // Import the mailer service

// Function to check if there are overlapping bookings for a given car and date range
const checkOverlap = async (carId, startDate, endDate) => {
    const bookings = await Booking.find({
        car: carId,
        status: { $ne: "canceled" },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    return bookings.length > 0;
};

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { startDate, endDate, totalPrice, car } = req.body;
        const customerEmail = "varunrmantri23@gmail.com";
        // Check for overlapping bookings
        const isOverlap = await checkOverlap(car, startDate, endDate);
        if (isOverlap) {
            // Notify the user of the failure
            await sendEmail(
                customerEmail,
                "Booking Failed",
                "Unfortunately, the selected date range overlaps with an existing booking. Please choose another slot."
            );
            return res.status(400).json({
                error: "The selected date range overlaps with an existing booking.",
            });
        }

        // Create and save the new booking
        const newBooking = new Booking({
            car,
            customerEmail,
            startDate,
            endDate,
            totalPrice,
        });

        await newBooking.save();

        // Send a confirmation email to the user
        await sendEmail(
            customerEmail,
            "Booking Confirmation",
            `Your booking has been confirmed from ${startDate} to ${endDate} with car ${car}. Thank you for choosing our service!`
        );

        // Update car availability
        const carDoc = await Car.findById(car);
        if (carDoc) {
            // Perform additional logic if necessary
            await carDoc.save();
        }

        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking or sending email:", error); // Log the complete error object
        res.status(500).json({
            error: "An error occurred while creating the booking or sending the email.",
        });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    console.log(`Cancel booking request received for ID: ${bookingId}`);

    try {
        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res
                .status(400)
                .json({ error: "Invalid booking ID format." });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.log(`Booking with ID ${bookingId} not found.`);
            return res.status(404).json({ error: "Booking not found." });
        }

        // Check if the booking status is already canceled
        if (booking.status === "canceled") {
            return res
                .status(400)
                .json({ error: "Booking is already canceled." });
        }

        // Update booking status to "canceled"
        booking.status = "canceled";
        await booking.save();

        // Perform additional updates or notifications if necessary
        const car = await Car.findById(booking.car);
        if (car) {
            // Perform additional logic if necessary
            await car.save();
        }

        // Notify the user of the cancellation
        await sendEmail(
            booking.customerEmail,
            "Booking Canceled",
            `Your booking from ${booking.startDate} to ${booking.endDate} has been canceled for the car with ID ${booking.car}. We apologize for any inconvenience.`
        );

        res.status(200).json({ message: "Booking canceled successfully." });
    } catch (error) {
        console.error(
            "Error canceling booking or sending email:",
            error.message
        );
        res.status(500).json({
            error: "An error occurred while canceling the booking or sending the email.",
        });
    }
};

// Get all bookings for a specific car
exports.getBookings = async (req, res) => {
    const { carId } = req.params;

    try {
        const bookings = await Booking.find({ car: carId });

        if (!bookings.length) {
            return res
                .status(404)
                .json({ message: "No bookings found for this car." });
        }

        res.json(bookings);
        console.log("Bookings fetched successfully:", bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        res.status(400).json({
            error: "An error occurred while fetching the bookings.",
        });
    }
};
