// src/components/Map/MapPicker.jsx
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './MapPicker.css';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 25.276987,
  lng: 55.296249,
};

const MapPicker = ({ latitude, longitude, onChange, readOnly }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div className="map-loading">Loading map...</div>;

  const center =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : defaultCenter;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={(e) => {
          if (readOnly) return;
          onChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
      >
        {latitude && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapPicker;
