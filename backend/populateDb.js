const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedCars = async () => {
    try {
        await Car.deleteMany(); // Clear the Car collection

        const cars = [
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 21.5937, // Example latitude
                longitude: 7.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Tata",
                model: "Nano",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "India, Hey",
                latitude: 20.5937, // Example latitude
                longitude: 78.9629, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "Los Angeles, CA",
                latitude: 34.0522, // Example latitude
                longitude: -118.2437, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null, // No current customer
                fuelType: "Diesel",
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "Los Angeles, CA",
                latitude: 34.0522, // Example latitude
                longitude: -118.2437, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                fuelType: "Diesel", // No current customer
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2020,
                licenseNumber: "XYZ1235",
                rentRate: 40,
                location1: "Los Angeles, CA",
                latitude: 34.0522, // Example latitude
                longitude: -118.2437, // Example longitude
                isAvailable: true,
                ratings: [], // Empty array for ratings
                currentCustomer: null,
                fuelType: "Diesel",
                // No current customer
            },
            // Add more cars as needed
        ];

        await Car.insertMany(cars);
        console.log("Cars seeded successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedCars();
