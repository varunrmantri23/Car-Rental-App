import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define custom icons
const inTripIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Default green
    iconRetinaUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCELOH4qUb5Xk96d6aUphDlRoRC6VHUuS09A&s",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const notInTripIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Default red
    iconRetinaUrl:
        "https://png.pngtree.com/png-vector/20210214/ourmid/pngtree-location-marker-png-image_2921053.jpg",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const AdminMapPage = () => {
    const [cars, setCars] = useState([]);
    const [carBookings, setCarBookings] = useState({});

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/cars/cars"
            );
            const carsData = response.data || [];
            setCars(carsData);

            // Fetch bookings for each car
            const bookingsPromises = carsData.map(async (car) => {
                const bookingResponse = await axios.get(
                    `http://localhost:5000/api/bookings/bookings/${car._id}`
                );
                return {
                    carId: car._id,
                    bookings: bookingResponse.data || [],
                };
            });

            // Wait for all bookings to be fetched
            const bookingsResults = await Promise.all(bookingsPromises);
            const bookingsMap = bookingsResults.reduce(
                (acc, { carId, bookings }) => {
                    acc[carId] = bookings;
                    return acc;
                },
                {}
            );
            setCarBookings(bookingsMap);
        } catch (error) {
            console.error("Error fetching cars or bookings:", error);
        }
    };

    const getCarStatus = (carId) => {
        const bookings = carBookings[carId] || [];
        const now = new Date();

        for (const booking of bookings) {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);

            if (now >= startDate && now <= endDate) {
                return "intrip";
            }
        }
        return "notintrip";
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Car Location Map
            </h1>
            <MapContainer
                center={[22.505, 78.81]} // Center to a default location
                zoom={13}
                style={{ height: "600px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {cars.map((car) => (
                    <Marker
                        key={car._id}
                        position={[car.latitude, car.longitude]}
                        icon={
                            getCarStatus(car._id) === "intrip"
                                ? inTripIcon
                                : notInTripIcon
                        }
                    >
                        <Popup>
                            {car.make} {car.model} ({car.year})<br />
                            Status:{" "}
                            {getCarStatus(car._id) === "intrip"
                                ? "In Trip"
                                : "Available"}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default AdminMapPage;
