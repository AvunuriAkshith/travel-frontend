import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Admin() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    state: "",
    category: "",
    rating: 1,
    budget: "",
    bestTime: "",
    description: ""
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [toast, setToast] = useState(null);

  // 🔥 Fetch Places
  const fetchPlaces = useCallback(async () => {
    try {
      const res = await API.get("/places");
      setPlaces(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    fetchPlaces();
  }, [navigate, fetchPlaces]);

  // 🔥 Toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // 🔥 Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 File Change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (editingId) {
        await API.put(`/places/${editingId}`, formData);
        showToast("Place updated ✅");
      } else {
        await API.post("/places", formData);
        showToast("Place added ✅");
      }

      resetForm();
      fetchPlaces();
    } catch (error) {
      console.log(error);
      showToast("Error saving place ❌", "error");
    }
  };

  // 🔥 Edit
  const handleEdit = (place) => {
    setEditingId(place._id);
    setForm({
      name: place.name,
      state: place.state,
      category: place.category,
      rating: place.rating,
      budget: place.budget || "",
      bestTime: place.bestTime,
      description: place.description
    });
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await API.delete(`/places/${id}`);
      fetchPlaces();
      showToast("Place deleted 🗑️");
    }
  };

  // 🔥 Reset
  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      state: "",
      category: "",
      rating: 1,
      budget: "",
      bestTime: "",
      description: ""
    });
    setSelectedFiles([]);
    setPreview([]);
  };

  return (
    <div className="admin-wrapper">
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <div className="admin-card" style={{ width: "850px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <h2>{editingId ? "Edit Place" : "Admin · Add Place"}</h2>

          <button
            style={{ background: "#b3261e", padding: "6px 12px" }}
            onClick={() => {
              localStorage.removeItem("isAdmin");
              window.location.href = "/admin-login";
            }}
          >
            Logout
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Place Name"
              required
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Devotional">Devotional</option>
            <option value="Party">Party</option>
            <option value="Chill">Chill</option>
            <option value="Historical">Historical</option>
          </select>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label>Rating: {Number(form.rating).toFixed(1)} ⭐</label>
              <input
                name="rating"
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />
            </div>

            <input
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              placeholder="Budget (₹)"
              required
            />
          </div>

          <input
            name="bestTime"
            value={form.bestTime}
            onChange={handleChange}
            placeholder="Best Time to Visit"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
          />

          <input type="file" accept="image/*" multiple onChange={handleFileChange} />

          {preview.length > 0 && (
            <div className="image-preview">
              {preview.map((img, i) => (
                <img key={i} src={img} alt="preview" />
              ))}
            </div>
          )}

          <div style={{ marginTop: "10px" }}>
            <button type="submit">
              {editingId ? "Update Place" : "Add Place"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{ marginLeft: "10px", background: "#f2f2f2" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <hr style={{ margin: "30px 0" }} />

        {/* TABLE */}
        <h3>All Places</h3>

        <table
  style={{
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
    background: "#fffaf0",
    borderRadius: "12px",
    overflow: "hidden"
  }}
>
  <thead style={{ background: "#f1f5f9" }}>
    <tr>
      <th style={{ padding: "12px" }}>Name</th>
      <th>State</th>
      <th>Category</th>
      <th>Rating</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {places.length === 0 ? (
      <tr>
        <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
          No places added yet.
        </td>
      </tr>
    ) : (
      places.map((place) => (
        <tr
          key={place._id}
          style={{
            transition: "background 0.2s ease"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#f0fdfa")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <td style={{ padding: "12px" }}>{place.name}</td>
          <td>{place.state}</td>
          <td>{place.category}</td>
          <td>{place.rating} ⭐</td>

          <td>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(place)}
                style={{
                  background:
                    "linear-gradient(135deg, #00c9a7, #00b4d8)",
                  color: "white",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 4px 10px rgba(0, 180, 216, 0.3)",
                  transition: "all 0.2s ease"
                }}
              >
                ✏ Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(place._id)
                }
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b6b, #ff3d00)",
                  color: "white",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 4px 10px rgba(255, 61, 0, 0.3)",
                  transition: "all 0.2s ease"
                }}
              >
                🗑 Delete
              </button>
            </div>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

      </div>
    </div>
  );
}

export default Admin;
