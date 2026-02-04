// src/components/Booking/Booking.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './Booking.css';

const API = import.meta.env.VITE_BACK_END_SERVER_URL;

const BookingCreate = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    bookingDate: '',
    peopleCount: 1,
    phoneNumber: '',
  });

  useEffect(() => {
    fetch(`${API}/api/properties/${propertyId}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setBook(data))
      .catch(() => setBook(null));
  }, [propertyId]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!book) return;

    const res = await fetch(`${API}/api/bookings`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId: Number(propertyId),
        bookingDate: formData.bookingDate,
        peopleCount: Number(formData.peopleCount),
        phoneNumber: formData.phoneNumber,
        totalPrice: book.weekdayPrice,
      }),
    });

    if (res.ok) navigate('/my-bookings');
  };

  if (!book) return <p>Loading...</p>;

  return (
    <main className="booking-create">
      <h2>Book {book.name}</h2>
      <p>Weekday Price: {book.weekdayPrice} BHD / night</p>

      <form onSubmit={handleSubmit}>
        <input type="date" name="bookingDate" onChange={handleChange} required />
        <input
          type="number"
          name="peopleCount"
          min="1"
          value={formData.peopleCount}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone number"
          onChange={handleChange}
          required
        />
        <button>Book Now</button>
      </form>
    </main>
  );
};

export default BookingCreate;
