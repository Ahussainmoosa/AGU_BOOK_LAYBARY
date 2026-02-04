// src/components/Booking/UserBookingHistory.jsx
import { useEffect, useState } from 'react';
import './UserBookingHistory.css';

const API = import.meta.env.VITE_BACK_END_SERVER_URL;

const UserBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API}/api/bookings`, {
          credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load bookings');

        setBookings(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-bookings">
      <h2>My Books</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(booking => (
          <div key={booking.id} className="user-booking-card">
            <strong>{booking.property?.name}</strong>
            <p>
              Date:{' '}
              {booking.bookingDate
                ? new Date(booking.bookingDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p>Status: {booking.status || 'Pending'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookingHistory;
