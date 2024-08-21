import React from "react";
import BookingService from "../services/BookingService";

const CancelBookingButton = ({ bookingId, onCancel }) => {
    const handleCancel = async () => {
        try {
            await BookingService.cancelBooking(bookingId);
            onCancel(); // Callback to refresh bookings list
        } catch (err) {
            alert(err.message || "Failed to cancel booking");
        }
    };

    return <button onClick={handleCancel}>Cancel Booking</button>;
};

export default CancelBookingButton;
