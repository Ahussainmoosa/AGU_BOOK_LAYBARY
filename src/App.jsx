// src/App.jsx

import { Routes, Route } from 'react-router-dom'; 

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Properties from './components/Properties/Properties';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import RequireRole from "./components/auth/RequireRole";
import PropertiesList from './components/Dashboard/PropertiesList';
import PropertyDetails from './components/Properties/PropertiesDetails/PropertyDetails';
import PropertiesEdit from './components/Properties/PropertiesEdit/PropertiesEdit';
import BookingCreate from './components/Booking/Booking.jsx';
import OwnerBookings from './components/Booking/OwnerBookings';
import UserBookingHistory from './components/Booking/UserBookingHistory';
import OwnerBookingReceipts from './components/Booking/OwnerBookingReceipts';
import UserSettings from './components/Settings/UserSettings';
import OwnerRequests from './components/Admin/OwnerRequests';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/booking/:propertyId" element={<BookingCreate />} />
        <Route path="/my-bookings" element={<UserBookingHistory />} />
        <Route path='/properties' element={<PropertiesList/>}/>

        {user ? (
          <>
            <Route path='/' element={<PropertiesList/>}/>
            <Route
              path="/properties/new"
              element={
                <RequireRole allowedRoles={["owner", "admin"]}>
                  <Properties/>
                </RequireRole>
              }
            />

            <Route path="/properties/:id" element={<PropertyDetails />} />

            <Route
              path="/properties/:id/edit"
              element={
                <RequireRole allowedRoles={["owner", "admin"]}>
                  <PropertiesEdit />
                </RequireRole>
              }
            />

            <Route path="/bookings/owner" element={<OwnerBookings />} />
            <Route path="/owner/bookings" element={<OwnerBookingReceipts />} />

            <Route
              path="/admin/owner-requests"
              element={
                <ProtectedRoute roles={['admin']}>
                  <OwnerRequests />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
          </>
        ) : (
          <Route path='/' element={<Landing/>}/>
        )}

        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
        
      <>
          <Routes>...</Routes>
          <Footer />
      </>
    </>
  );
};

export default App;
