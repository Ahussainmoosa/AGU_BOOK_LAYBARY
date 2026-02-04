// src/components/Properties/PropertiesEdit/PropertiesEdit.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "/src/contexts/UserContext";
import "./PropertiesEdit.css";

const API = import.meta.env.VITE_BACK_END_SERVER_URL;

const PropertiesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/properties/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load book");
        return res.json();
      })
      .then(setBook)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner =
    user &&
    book &&
    (user.role === "admin" ||
      (user.role === "owner" && user.id === book.owner?.id));

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFilesUpload = async files => {
    const formData = new FormData();
    files.forEach(file => formData.append("photo", file));

    await fetch(`${API}/api/properties/${id}/photos`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const updated = await fetch(`${API}/api/properties/${id}`).then(r =>
      r.json()
    );
    setBook(updated);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch(`${API}/api/properties/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    if (res.ok) navigate(`/properties/${id}`);
    else setError("Update failed");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?"))
      return;

    setDeleting(true);
    const res = await fetch(`${API}/api/properties/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) navigate("/properties");
    else {
      setError("Delete failed");
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>{error || "Book not found"}</p>;

  return (
    <main className="edit-book">
      <h2>Edit Book</h2>

      {isOwner && (
        <div
          className="upload-box"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            handleFilesUpload(Array.from(e.dataTransfer.files));
          }}
        >
          <p>➕ Drag & drop images here</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={e =>
              handleFilesUpload(Array.from(e.target.files))
            }
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={book.name || ""}
          onChange={handleChange}
          required
          disabled={!isOwner}
        />

        <textarea
          name="description"
          value={book.description || ""}
          onChange={handleChange}
          required
          disabled={!isOwner}
        />

        <input
          type="number"
          name="weekdayPrice"
          value={book.weekdayPrice}
          onChange={handleChange}
          required
          disabled={!isOwner}
        />

        <input
          type="number"
          name="weekendPrice"
          value={book.weekendPrice}
          onChange={handleChange}
          required
          disabled={!isOwner}
        />

        {isOwner && <button type="submit">Save Changes</button>}
      </form>

      {isOwner && (
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Book"}
        </button>
      )}
    </main>
  );
};

export default PropertiesEdit;
