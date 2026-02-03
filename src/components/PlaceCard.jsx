import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <div
      style={{
        borderRadius: "24px",
        background: "#ffffff",
        boxShadow: "0 20px 60px rgba(99, 102, 241, 0.15)",
        overflow: "hidden",
        transition: "all 0.35s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow =
          "0 30px 70px rgba(168, 85, 247, 0.25)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 20px 60px rgba(99, 102, 241, 0.15)";
      }}
    >
      {/* IMAGE */}
      <img
        src={`http://localhost:5000${place.images?.[0]}`}
        alt={place.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover"
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "25px" }}>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#1f2937"
          }}
        >
          {place.name}
        </h3>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "20px",
            fontSize: "15px"
          }}
        >
          {place.category} ⭐ {place.rating}
        </p>

        <Link to={`/place/${place._id}`}>
          <button
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              border: "none",
              color: "#fff",
              padding: "12px 26px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.07)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            View Details →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;
