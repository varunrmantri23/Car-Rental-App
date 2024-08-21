const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const nodemailer = require("nodemailer");
const cors = require("cors");
const Booking = require("./models/Booking");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const activeUsers = {}; // This will store the user IDs viewing each car

const checkOverlap = async (carId, startDate, endDate) => {
    const bookings = await Booking.find({
        car: carId,
        status: { $ne: "canceled" },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    return bookings.length > 0;
};

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("viewingCar", (carId) => {
        if (!activeUsers[carId]) {
            activeUsers[carId] = [];
        }
        activeUsers[carId].push(socket.id);

        // Broadcast view count update to all users viewing this car
        io.to(carId).emit("viewCountUpdate", {
            carId,
            count: activeUsers[carId].length,
        });

        socket.join(carId);

        // Notify others that a new user is viewing the car
        socket.broadcast.to(carId).emit("userViewingCar", {
            message:
                "Hurry! You might lose the chance, someone else is viewing this car.",
        });
    });

    socket.on("carBooked", async ({ carId, startDate, endDate }) => {
        const isOverlap = await checkOverlap(carId, startDate, endDate);
        if (!isOverlap) {
            io.to(carId).emit("updateCarStatus", carId);
        } else {
            socket.emit("bookingFailed", {
                message:
                    "This slot has been booked by someone else. Kindly choose another slot.",
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        for (let carId in activeUsers) {
            activeUsers[carId] = activeUsers[carId].filter(
                (id) => id !== socket.id
            );
            // Broadcast view count update
            io.to(carId).emit("viewCountUpdate", {
                carId,
                count: activeUsers[carId].length,
            });

            if (activeUsers[carId].length === 0) {
                delete activeUsers[carId];
            }
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
