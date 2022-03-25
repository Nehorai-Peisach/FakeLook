import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Map, Icon } from 'leaflet';

const MapPage = (props) => {
  const [position, setPosition] = useState();
  const [map, setMap] = useState();
  const goHome = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        console.log(data.coords);

        setPosition({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 10000 } 
    );
  };

  return (
    <div className="map_container">
      <MapContainer className="map" center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
