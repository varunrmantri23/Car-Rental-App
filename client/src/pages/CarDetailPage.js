import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BookingForm from "../components/BookingForm";
import io from "socket.io-client";

// Define the custom icon
const customIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Fixed customer ID for testing
const FIXED_CUSTOMER_ID = "66c504327862bbb85d1d87da";

const socket = io(); // Ensure this matches your server URL

const CarDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [car, setCar] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [showCancel, setShowCancel] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        fetchCarDetails();
        fetchCarBookings();

        // Check if we need to show admin buttons based on URL search params
        const searchParams = new URLSearchParams(location.search);
        setShowDelete(
            searchParams.has("admin") || location.pathname.startsWith("/admin")
        );

        // Socket.IO events
        socket.emit("viewingCar", id);
        socket.on("viewCountUpdate", (data) => {
            console.log(`View count update received: ${data.count}`);
            if (data.carId === id) {
                setViewCount(data.count);
            }
        });

        return () => {
            socket.off("viewCountUpdate");
            socket.disconnect();
        };
    }, [id]);

    const fetchCarDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/cars/getcars/${id}`
            );
            setCar(response.data);
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    };

    const fetchCarBookings = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/bookings/bookings/${id}`
            );
            setBookings(response.data);

            const userBooking = response.data.find(
                (booking) => booking.customer === FIXED_CUSTOMER_ID
            );
            if (userBooking) {
                setShowCancel(true);
            }
        } catch (error) {
            console.error("Error fetching car bookings:", error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.put(
                `http://localhost:5000/api/bookings/bookings/${bookingId}/cancel`
            );
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== bookingId)
            );
            setShowCancel(false);
            alert("Booking cancelled successfully");
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/cars/cars/${id}`);
            alert("Car deleted successfully");
            // Optionally redirect or handle UI update
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {car ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">
                        {car.make} {car.model} ({car.year})
                    </h1>
                    <p>Fuel Type: {car.fuelType}</p>
                    <p>Rent: ${car.rentRate} / day</p>

                    {/* Display current view count */}
                    <p className="text-lg font-semibold mb-4">
                        Currently {viewCount} people are viewing this car.
                    </p>

                    {/* Map rendering */}
                    <MapContainer
                        className="my-6"
                        center={[car.latitude, car.longitude]}
                        zoom={13}
                        style={{
                            height: "400px",
                            width: "100%",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                            position={[car.latitude, car.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                {car.make} {car.model} <br /> {car.year}
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className="my-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Car Location
                        </h2>
                    </div>
                    <BookingForm carId={car._id} />

                    <div className="my-6">
                        <h2 className="text-xl font-semibold mb-2">Bookings</h2>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="mb-2 p-2 border border-gray-300 rounded"
                                >
                                    <p>Customer ID: {booking.customer}</p>
                                    <p>
                                        Start Date:{" "}
                                        {new Date(
                                            booking.startDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        End Date:{" "}
                                        {new Date(
                                            booking.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>Status: {booking.status}</p>
                                    {booking.status !== "canceled" && // Show cancel button only if not canceled
                                        (FIXED_CUSTOMER_ID ===
                                            booking.customer ||
                                            showDelete) && (
                                            <button
                                                onClick={() =>
                                                    handleCancelBooking(
                                                        booking._id
                                                    )
                                                }
                                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                </div>
                            ))
                        ) : (
                            <p>No bookings found for this car.</p>
                        )}
                    </div>

                    {showDelete && (
                        <button
                            onClick={handleDelete}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Delete Car
                        </button>
                    )}
                </>
            ) : (
                <p>Loading car details...</p>
            )}
        </div>
    );
};

export default CarDetailPage;
