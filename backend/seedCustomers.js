const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");
const Booking = require("./models/Booking");
const Car = require("./models/Car");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedCustomers = async () => {
    try {
        await Customer.deleteMany(); // Clear the Customer collection

        // Fetch some car IDs to use in bookings
        const cars = await Car.find().limit(5); // Adjust limit as needed

        const customers = [
            {
                name: "John Doe",
                contact: "123-456-7890",
                dlImage: "https://example.com/dl1.jpg",
            },
            {
                name: "Jane Smith",
                contact: "987-654-3210",
                dlImage: "https://example.com/dl2.jpg",
            },
            {
                name: "Alice Johnson",
                contact: "555-555-5555",
                dlImage: "https://example.com/dl3.jpg",
            },
            {
                name: "Bob Brown",
                contact: "666-666-6666",
                dlImage: "https://example.com/dl4.jpg",
            },
            // Add more customers as needed
        ];

        const insertedCustomers = await Customer.insertMany(customers);
        console.log("Customers seeded successfully");

        // Create some bookings
        const bookings = [
            {
                car: cars[0]._id,
                customer: insertedCustomers[0]._id,
                startDate: new Date("2024-08-01"),
                endDate: new Date("2024-08-07"),
                totalPrice: 280,
            },
            {
                car: cars[1]._id,
                customer: insertedCustomers[1]._id,
                startDate: new Date("2024-08-05"),
                endDate: new Date("2024-08-10"),
                totalPrice: 200,
            },
            {
                car: cars[2]._id,
                customer: insertedCustomers[2]._id,
                startDate: new Date("2024-08-10"),
                endDate: new Date("2024-08-15"),
                totalPrice: 300,
            },
            {
                car: cars[3]._id,
                customer: insertedCustomers[3]._id,
                startDate: new Date("2024-08-15"),
                endDate: new Date("2024-08-20"),
                totalPrice: 350,
            },
            // Add more bookings as needed
        ];

        await Booking.insertMany(bookings);
        console.log("Bookings seeded successfully");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedCustomers();
