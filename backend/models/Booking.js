const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Booked", "InTrip", "canceled", "Available"],
        default: "Booked",
    },
});

module.exports = mongoose.model("Booking", bookingSchema);
