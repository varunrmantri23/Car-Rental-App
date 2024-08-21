import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarList = ({ cars, onDelete, showDelete }) => {
    const carImage =
        "https://images.unsplash.com/photo-1517153192978-b2e379ac0710?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const deleteCar = async (carId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cars/cars/${carId}`);
            alert("Car deleted successfully!");
            window.location.href = window.location.href; // Refresh the page
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
                <div
                    key={car._id}
                    className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105"
                >
                    <img
                        src={carImage}
                        alt={`${car.make} ${car.model}`}
                        style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "cover",
                        }} // Inline styles for debugging
                        className="rounded-lg mb-4"
                    />
                    <div className="card-body">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            {car.make} {car.model} ({car.year})
                        </h2>
                        <p className="text-gray-600">
                            Fuel Type: {car.fuelType}
                        </p>
                        <p className="text-gray-600">
                            Rent: ${car.rentRate} / day
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <Link
                                to={`/car/${car._id}/`}
                                className="text-blue-500 hover:underline"
                            >
                                View Details
                            </Link>
                            {showDelete && (
                                <button
                                    onClick={() => deleteCar(car._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete Car
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarList;
