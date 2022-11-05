import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const DetailstRight = ({ userData }) => {
  const { geolocation } = userData;

  const position = userData?.geolocation;

  return (
    <div>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{userData?.address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DetailstRight;
