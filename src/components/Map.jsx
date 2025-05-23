import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../contexts/CityContext';
import styles from './Map.module.css';
import { useGeolocation } from '../hooks/useGeolocation';
import { useURLlocation } from '../hooks/useURLlocation';
import Button from './Button';

export default function Map() {
  const { cities } = useCities();
  const { isLoading: isLoadingPos, position: geoLocationPos, getPosition } = useGeolocation();
  const [mapLat,mapLng] = useURLlocation();
  const [position, setPosition] = useState([40, 0]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setPosition([parseFloat(mapLat), parseFloat(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPos) {
      setPosition([geoLocationPos.lat, geoLocationPos.lng]);
    }
  }, [geoLocationPos]);

  console.log("Current position:", position); // Debugging line

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPos && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPos ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span><span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
