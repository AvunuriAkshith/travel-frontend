import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(3);
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
   navigate(
  `/places?state=${state}&category=${category}&rating=${rating}&budget=${budget}`
);

  };

  return (
    
    <div className="home-bg">
<Link to="/admin-login" className="admin-home-btn">
  Admin
</Link>


      <div className="home-overlay">
        <div className="home-card">
          <h1>TripWise</h1>
          <p>Find places beyond the usual tourist spots</p>

          <input
            placeholder="Enter place (Goa, Kerala)"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Devotional">Devotional</option>
            <option value="Party">Party</option>
            <option value="Chill">Chill</option>
            <option value="Historical">Historical</option>
          </select>
          <input
  type="number"
  placeholder="Your Budget (₹)"
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
/>

          <label style={{ fontSize: "14px", fontWeight: "600" }}>
            Minimum Rating: {rating} ⭐
          </label>

          <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button onClick={handleSearch}>
            Explore Places
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
