import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import CarDetailPage from "./pages/CarDetailPage";
import AdminMapPage from "./pages/AdminMapPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="/mapview" element={<AdminMapPage />} />
            </Routes>
        </Router>
    );
}

export default App;
