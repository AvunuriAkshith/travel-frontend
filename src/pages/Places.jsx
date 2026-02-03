import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import PlaceCard from "../components/PlaceCard";

function Places() {
  const [places, setPlaces] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    API.get(`/places${search}`)
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
  }, [search]);

  return (
  <div
    style={{
      minHeight: "100vh",
      padding: "70px 80px",
      background:
        "linear-gradient(135deg, #eef2ff, #f5f3ff, #fdf4ff)",
    }}
  >
    <h2
      style={{
        fontSize: "42px",
        fontWeight: "800",
        marginBottom: "50px",
        background: "linear-gradient(135deg, #6366f1, #a855f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      Discover Amazing Places ✨
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "40px"
      }}
    >
      {places.map((place) => (
        <PlaceCard key={place._id} place={place} />
      ))}
    </div>
  </div>
);




}

export default Places;
