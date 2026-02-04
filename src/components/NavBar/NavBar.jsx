// src/components/NavBar/NavBar.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="brand">
          <Link to="/">Home</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}

        {user && user.role === 'user' && (
          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>
        )}

        {user && (user.role === 'owner' || user.role === 'admin') && (
          <>
            <li>
              <Link to="/properties/new">Add Book</Link>
            </li>
            <li>
              <Link to="/bookings/owner">Booking Requests</Link>
            </li>
          </>
        )}

        {user?.role === 'admin' && (
          <li>
            <Link to="/admin/owner-requests">Owner Requests</Link>
          </li>
        )}

        {user && (
          <>
            <li className="user-info">
              Welcome, {user.username} ({user.role})
            </li>
            <li>
              <Link className="signout" to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
