const API_URL = "http://localhost:5000/api";

export const fetchCars = async () => {
    const response = await fetch(`${API_URL}/cars`);
    return response.json();
};

export const fetchBookings = async () => {
    const response = await fetch(`${API_URL}/bookings`);
    return response.json();
};

export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    });
    return response.json();
};

export const deleteCar = async (carId) => {
    await fetch(`${API_URL}/cars/${carId}`, {
        method: "DELETE",
    });
};
