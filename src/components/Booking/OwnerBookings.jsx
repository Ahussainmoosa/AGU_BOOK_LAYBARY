// src/components/Booking/OwnerBookings.jsx
import { useEffect, useState } from 'react';
import './OwnerBookings.css';

const API = import.meta.env.VITE_BACK_END_SERVER_URL;

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API}/api/bookings`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setBookings(data.data || []);
      } catch {
        setError('Could not load bookings');
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    try {
      const res = await fetch(
        `${API}/api/bookings/${bookingId}/${status}`,
        {
          method: 'PUT',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error();

      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status } : b
        )
      );
    } catch {
      alert('Failed to update booking status');
    }
  };

  return (
    <div className="owner-bookings">
      <h2>Book Requests</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No booking requests</p>
      ) : (
        bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.property?.name}</h3>

            <p><strong>User:</strong> {booking.user?.username}</p>
            <p><strong>Date:</strong> {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Guests:</strong> {booking.peopleCount}</p>
            <p><strong>Phone:</strong> {booking.phoneNumber}</p>
            <p><strong>Total:</strong> {booking.totalPrice} BHD</p>
            <p><strong>Status:</strong> {booking.status}</p>

            {booking.status === 'pending' && (
              <div className="booking-actions">
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(booking.id, 'approve')}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(booking.id, 'reject')}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerBookings;
