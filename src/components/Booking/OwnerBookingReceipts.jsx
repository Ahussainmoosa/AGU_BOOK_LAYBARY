// src/components/Booking/OwnerBookingReceipts.jsx
import { useEffect, useState } from 'react';
import './OwnerBookingReceipts.css';

const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const OwnerBookingReceipts = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/booking`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(data.data || []);
    } catch {}
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await fetch(`${API_URL}/booking/${id}/${action}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch {}
  };

  return (
    <div className="owner-bookings">
      <h2>Book Booking Orders</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h3>{b.propertyId?.name || 'Book deleted'}</h3>

            <p><strong>User:</strong> {b.userId?.username}</p>
            <p><strong>People:</strong> {b.people}</p>
            <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {b.status}</p>

            {b.status === 'pending' && (
              <div className="booking-actions">
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(b._id, 'approve')}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(b._id, 'reject')}
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

export default OwnerBookingReceipts;
