// frontend/src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarForm from "./CarForm";

const AdminPanel = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("/api/cars");
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };
        fetchCars();
    }, []);

    const handleEdit = (car) => {
        setEditingCar(car);
    };

    const handleDelete = async (carId) => {
        try {
            await axios.delete(`/api/cars/${carId}`);
            setCars(cars.filter((car) => car._id !== carId));
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <CarForm car={editingCar} setEditingCar={setEditingCar} />
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Car Inventory</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Make
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Model
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Year
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cars.map((car) => (
                            <tr key={car._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {car.make}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {car.model}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {car.year}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(car)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
