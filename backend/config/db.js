const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/car_rental", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
