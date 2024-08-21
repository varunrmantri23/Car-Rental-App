import React, { useState, useEffect } from "react";
import CarList from "../components/CarList";
import axios from "axios";

const Home = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        fuelType: "",
        make: "",
        model: "",
        year: "",
        rentRange: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, cars]);

    const fetchCars = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/cars/cars"
            );
            setCars(response.data);
            setFilteredCars(response.data); // Initialize filteredCars with all fetched data
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const applyFilters = () => {
        let tempCars = [...cars];

        if (filters.make || filters.model || filters.year) {
            tempCars = tempCars.filter(
                (car) =>
                    (!filters.make ||
                        car.make
                            .toLowerCase()
                            .includes(filters.make.toLowerCase())) &&
                    (!filters.model ||
                        car.model
                            .toLowerCase()
                            .includes(filters.model.toLowerCase())) &&
                    (!filters.year ||
                        car.year.toString().includes(filters.year))
            );
        }

        if (filters.fuelType) {
            tempCars = tempCars.filter((car) =>
                car.fuelType
                    .toLowerCase()
                    .includes(filters.fuelType.toLowerCase())
            );
        }

        if (filters.rentRange) {
            const [minRent, maxRent] = filters.rentRange.split("-").map(Number);
            tempCars = tempCars.filter(
                (car) =>
                    (!minRent || car.rentRate >= minRent) &&
                    (!maxRent || car.rentRate <= maxRent)
            );
        }

        setFilteredCars(tempCars);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearchClick = () => {
        applyFilters();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            // Reset the filter when backspace is pressed
            setFilters({
                fuelType: "",
                make: "",
                model: "",
                year: "",
                rentRange: "",
            });
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedCars = filteredCars.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Find Your Perfect Car
            </h1>
            <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        name="make"
                        placeholder="Make"
                        value={filters.make}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="input input-bordered w-full md:w-1/4 p-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={filters.model}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="input input-bordered w-full md:w-1/4 p-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="input input-bordered w-full md:w-1/4 p-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="text"
                        name="fuelType"
                        placeholder="Fuel Type"
                        value={filters.fuelType}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="input input-bordered w-full md:w-1/4 p-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="text"
                        name="rentRange"
                        placeholder="Rent Range (e.g., 20-100)"
                        value={filters.rentRange}
                        onChange={handleFilterChange}
                        onKeyDown={handleKeyDown}
                        className="input input-bordered w-full md:w-1/4 p-2 rounded-lg border border-gray-300"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
            </div>
            <CarList cars={paginatedCars} />
            <div className="flex justify-center mt-6">
                <nav>
                    <ul className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
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
    );
};

export default Home;
