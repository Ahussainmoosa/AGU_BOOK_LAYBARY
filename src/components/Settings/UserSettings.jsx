// src/components/UserSettings/UserSettings.jsx
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../api/axios';
import './UserSettings.css';

const UserSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const requestOwner = async () => {
    const res = await api.put('/users/request-owner');
    setMessage(res.data.message);
    setUser(res.data.user);
  };

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <h3>Settings</h3>

        {user.role === 'user' && (
          <button onClick={requestOwner}>
            Request to become owner
          </button>
        )}

        {user.ownerRequestStatus === 'pending' && (
          <p className="status-pending">Request pending approval</p>
        )}

        {user.ownerRequestStatus === 'rejected' && (
          <p className="status-rejected">Request rejected</p>
        )}
      </aside>

      <main className="settings-main">
        <h2>User Settings</h2>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
};

export default UserSettings;
