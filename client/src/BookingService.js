import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

const BookingServices = {
    // Create a new booking
    createBooking: async (carId, bookingData) => {
        try {
            const response = await axios.post(
                `${API_URL}/bookings/${carId}`, // Correct endpoint
                bookingData
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error creating booking";
        }
    },

    // Cancel a booking
    cancelBooking: async (bookingId) => {
        try {
            const response = await axios.put(
                `${API_URL}/bookings/${bookingId}/cancel` // Correct endpoint
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error canceling booking";
        }
    },

    // Get all bookings for a specific car
    getBookings: async (carId) => {
        try {
            const response = await axios.get(
                `${API_URL}/bookings/car/${carId}`
            ); // Correct endpoint
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error fetching bookings";
        }
    },
};

export default BookingServices;
