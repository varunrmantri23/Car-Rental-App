import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Car Rental
                </Link>
                <div>
                    <Link to="/" className="mr-4">
                        Home
                    </Link>
                    <Link to="/bookings" className="mr-4">
                        Bookings
                    </Link>
                    <Link to="/admin" className="mr-4">
                        Admin Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
