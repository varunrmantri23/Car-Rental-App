import React, { useEffect, useState } from "react";
import BookingServices from "../services/BookingService";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await BookingServices.getBookings();
                setBookings(bookingsData);
            } catch (err) {
                setError(err.message || "Failed to fetch bookings");
            }
        };

        fetchBookings();
    });

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        {booking.carId.make} {booking.carId.model} -{" "}
                        {booking.startDate} to {booking.endDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
