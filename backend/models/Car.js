const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    // licenseNumber: String,
    rentRate: Number,
    location1: String,
    latitude: Number, // Added for map integration
    longitude: Number, // Added for map integration
    isAvailable: Boolean,
    ratings: [Number],
    currentCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    registrationNumber: Number,
    fuelType: String,
});

module.exports = mongoose.model("Car", carSchema);
