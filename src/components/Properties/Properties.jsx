// src/components/Properties/Properties.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { PropertiesService } from '../../services/propertiesService';
import MapPicker from '../Map/Mapicker';
import './Properties.css';

const Properties = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [photos, setPhotos] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactNumber: '',
    weekdayPrice: '',
    weekendPrice: '',
    latitude: '',
    longitude: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapChange = ({ lat, lng }) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const book = await PropertiesService.createProperties({
        name: formData.name,
        description: formData.description,
        contactNumber: formData.contactNumber,
        weekdayPrice: Number(formData.weekdayPrice),
        weekendPrice: Number(formData.weekendPrice),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });

      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          await PropertiesService.uploadPropertyPhoto(
            book.id,
            photos[i]
          );
        }
      }

      setMessage('Book created successfully!');
      navigate('/properties');
    } catch (err) {
      setMessage(err.message || 'Failed to create book');
    }
  };

  return (
    <div className="create-book">
      <h2>Create Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Book name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <input
          name="weekdayPrice"
          type="number"
          placeholder="Weekday Price"
          value={formData.weekdayPrice}
          onChange={handleChange}
          required
        />

        <input
          name="weekendPrice"
          type="number"
          placeholder="Weekend Price"
          value={formData.weekendPrice}
          onChange={handleChange}
          required
        />

        <MapPicker
          latitude={formData.latitude ? Number(formData.latitude) : null}
          longitude={formData.longitude ? Number(formData.longitude) : null}
          onChange={handleMapChange}
        />

        <input
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />

        <input
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setPhotos(e.target.files)}
        />

        <button type="submit">Create Book</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Properties;
