import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";

const socket = io("http://localhost:5000");

const BookingForm = ({ carId }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const [carRentRate, setCarRentRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAlert, setUserAlert] = useState(""); // For real-time alerts
    const [rating, setRating] = useState(1); // Default rating

    // Pricing tiers
    const pricingTiers = [
        { days: 1, rate: 100 }, // Example rate for 1 day
        { days: 3, rate: 80 }, // Example rate for 2-3 days
        { days: 7, rate: 60 }, // Example rate for 4-7 days
        { days: Infinity, rate: 50 }, // Discounted rate for 8 or more days
    ];

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/cars/getcars/${carId}`
                );
                setCarRentRate(response.data.rentRate);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching car details:", error);
                setLoading(false);
            }
        };

        fetchCarDetails();

        // Notify the server that this user is viewing the car
        socket.emit("viewingCar", carId);

        // Listen for updates
        socket.on("userViewingCar", (data) => {
            setUserAlert(data.message);
        });

        socket.on("bookingFailed", (data) => {
            setMessage(data.message);
        });

        socket.on("updateCarStatus", () => {
            setMessage(
                "This car has just been booked by someone else. Look For another slot"
            );
        });

        return () => {
            socket.off("userViewingCar");
            socket.off("bookingFailed");
            socket.off("updateCarStatus");
        };
    }, [carId]);

    // Function to calculate total price based on dynamic pricing
    const calculateTotalPrice = (start, end) => {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let rate = 0;
        for (const tier of pricingTiers) {
            if (diffDays <= tier.days) {
                rate = tier.rate;
                break;
            }
        }

        return diffDays * rate;
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        const start = new Date(startDate);
        const end = new Date(endDate);
        const totalPrice = calculateTotalPrice(start, end);

        try {
            socket.emit("carBooked", { carId, startDate, endDate });
            const response = await axios.post(
                `http://localhost:5000/api/bookings/bookings/${carId}`,
                {
                    startDate,
                    endDate,
                    totalPrice,
                    car: `${carId}`,
                    customer: "66c504327862bbb85d1d87da",
                    status: "Booked",
                    rating,
                }
            );
            setMessage(
                `Booking successful! Total Price is ${totalPrice}. Pay now :)`
            );
        } catch (error) {
            const errorMessage =
                error.response?.data?.error ||
                "Error booking the car. Please try again.";
            setMessage(errorMessage);
        }
    };

    if (loading) {
        return <p>Loading car details...</p>;
    }

    return (
        <form onSubmit={handleBooking} className="my-6">
            <div className="mb-4">
                {userAlert && (
                    <p className="mt-4 text-yellow-500">{userAlert}</p>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="startDate"
                >
                    Start Date
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="endDate"
                >
                    End Date
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="rating"
                >
                    Rating
                </label>
                <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Book Now
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
    );
};

export default BookingForm;
