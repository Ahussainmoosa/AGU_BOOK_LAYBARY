// src/components/Properties/PropertiesDetails/PropertyDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { PropertiesService } from "../../../services/properties";
import MapPicker from "../../Map/Mapicker";
import { UserContext } from "../../../contexts/UserContext";
import "./PropertyDetails.css";

const API = import.meta.env.VITE_BACK_END_SERVER_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await PropertiesService.getProperties(id);
        setBook(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  const canEdit =
    user && (user.role === "admin" || user.role === "owner");

  return (
    <main className="book-details">
      <h1>{book.name}</h1>

      <div className="book-gallery">
        {book.photos && book.photos.length > 0 ? (
          book.photos.map(photo => (
            <img
              key={photo.id}
              src={`${API}${photo.imageUrl}`}
              alt="Book"
            />
          ))
        ) : (
          <div className="gallery-placeholder">
            <span style={{ fontSize: 40 }}>📷</span>
            <p>No images available</p>
          </div>
        )}

        {canEdit && (
          <button
            className="edit-btn"
            onClick={() => navigate(`/properties/${book.id}/edit`)}
            title="Add / Edit images"
          >
            +
          </button>
        )}
      </div>

      <p>{book.description}</p>

      <p>
        Weekday: {book.weekdayPrice} BHD / night<br />
        Weekend: {book.weekendPrice} BHD / night
      </p>

      <MapPicker
        latitude={book.latitude}
        longitude={book.longitude}
        readOnly
      />

      <button onClick={() => navigate(`/booking/${book.id}`)}>
        Book this book
      </button>
    </main>
  );
};

export default PropertyDetails;
