import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fixing leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
    iconUrl: require("leaflet/dist/images/marker-icon.png").default,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const MapView = ({ cars }) => {
    const [center, setCenter] = useState([51.505, -0.09]);

    useEffect(() => {
        if (cars.length > 0) {
            setCenter([cars[0].latitude, cars[0].longitude]);
        }
    }, [cars]);

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cars.map((car) => (
                    <Marker
                        key={car._id}
                        position={[car.latitude, car.longitude]}
                    >
                        <Popup>
                            {car.make} {car.model} <br /> {car.year}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
