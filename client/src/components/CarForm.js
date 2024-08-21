import React, { useState, useEffect } from "react";
import axios from "axios";

const CarForm = ({ car, setEditingCar }) => {
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        registrationNumber: "",
        fuelType: "",
        rentRate: "",
        latitude: 0, // Default latitude
        longitude: 0, // Default longitude
        isAvailable: true, // Default availability
    });

    useEffect(() => {
        if (car) {
            setFormData({
                ...formData, // Include current defaults
                ...car,
            });
        } else {
            setFormData({
                make: "",
                model: "",
                year: "",
                registrationNumber: "",
                fuelType: "",
                rentRate: "",
                latitude: 0, // Reset to default
                longitude: 0, // Reset to default
                isAvailable: true, // Reset to default
            });
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure defaults are set if values are missing
        const finalFormData = {
            ...formData,
            latitude: formData.latitude || 0, // Ensure default latitude
            longitude: formData.longitude || 0, // Ensure default longitude
            isAvailable:
                formData.isAvailable !== undefined
                    ? formData.isAvailable
                    : true, // Ensure default availability
        };

        try {
            if (car) {
                await axios.put(
                    `http://localhost:5000/api/cars/cars/${car._id}`,
                    finalFormData
                );
                alert("Car updated!");
            } else {
                await axios.post(
                    "http://localhost:5000/api/cars/cars",
                    finalFormData
                );
                alert("Car added!");
            }
            setEditingCar(null);
            setFormData({
                make: "",
                model: "",
                year: "",
                registrationNumber: "",
                fuelType: "",
                rentRate: "",
                latitude: 0,
                longitude: 0,
                isAvailable: true,
            });
        } catch (error) {
            console.error("Error saving car:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">
                {car ? "Edit Car" : "Add Car"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Make"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Model"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Year"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Registration Number"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="text"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    placeholder="Fuel Type"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="number"
                    name="rentRate"
                    value={formData.rentRate}
                    onChange={handleChange}
                    placeholder="Rent Per Day"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {car ? "Update Car" : "Add Car"}
                </button>
                {car && (
                    <button
                        type="button"
                        onClick={() => setEditingCar(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default CarForm;
