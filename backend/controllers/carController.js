const Car = require("../models/Car");
const Booking = require("../models/Booking");
const io = require("socket.io-client");

const socket = io.connect("http://localhost:5000");

exports.bookCar = async (req, res) => {
    try {
        const { carId, customerId, startDate, endDate } = req.body;

        const car = await Car.findById(carId);
        if (!car.isAvailable) {
            return res.status(400).json({ message: "Car is not available" });
        }

        const booking = new Booking({
            car: carId,
            customer: customerId,
            startDate,
            endDate,
            status: "Booked",
        });
        await booking.save();

        car.isAvailable = false;
        await car.save();

        socket.emit("carBooked", carId);

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getcar = async (req, res) => {
    try {
        const id = req.params.id;
        const car = await Car.findById(id);
        res.status(201).json(car);
    } catch (error) {
        console.log(error);
    }
};

exports.getCars = async (req, res) => {
    try {
        const { make, model, year, licenseNumber, isAvailable } = req.query;
        const filter = {};

        if (make) filter.make = make;
        if (model) filter.model = model;
        if (year) filter.year = year;
        if (licenseNumber) filter.licenseNumber = licenseNumber;
        if (isAvailable !== undefined) filter.isAvailable = isAvailable;

        const cars = await Car.find(filter);
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
