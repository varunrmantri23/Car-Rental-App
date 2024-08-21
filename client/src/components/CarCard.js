import React from "react";

const carImage =
    "https://images.unsplash.com/photo-1517676109075-9a94d44145d1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CarCard = ({ car }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <img
                src={carImage}
                alt={`${car.make} ${car.model}`}
                style={{ width: "100%", height: "160px", objectFit: "cover" }} // Inline styles for debugging
                className="rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">
                {car.make} {car.model}
            </h3>

            <p>Year: {car.year}</p>
            <p>License: {car.licenseNumber}</p>
            <p>Rent Rate: ${car.rentRate} per day</p>
            <p>Location: {car.location1}</p>
            <p>Status: {car.isAvailable ? "Available" : "Not Available"}</p>
            <div className="flex justify-end mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default CarCard;
