const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    dlImage: { type: String, required: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Customer", customerSchema);
