import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CarForm from "../components/CarForm";
import CarList from "../components/CarList";
import axios from "axios";

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDeleteCar = (deletedCarId) => {
        setCars(cars.filter((car) => car._id !== deletedCarId));
    };

    const fetchCars = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/cars/cars"
            );
            setCars(response.data || []); // Ensure cars is always an array
        } catch (error) {
            console.error("Error fetching cars:", error);
            setCars([]); // Fallback to an empty array in case of error
        }
    };

    // Calculate the cars to display based on the current page
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(cars.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Navigate to the map view page
    const handleMapView = () => {
        navigate("/mapview"); // Replace with the correct path to your map view
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleMapView}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    View Car Map
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <CarForm onCarAdded={fetchCars} />
            </div>
            <div>
                <h1 className="text-2xl my-4">Car Inventory</h1>
                <CarList
                    cars={currentCars}
                    onDelete={handleDeleteCar}
                    showDelete={true}
                />
                <div className="flex justify-center mt-6">
                    <nav>
                        <ul className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index + 1}>
                                    <button
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800"
                                        } hover:bg-blue-400`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
