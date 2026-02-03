import { motion } from "framer-motion";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    API.get(`/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!place) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #fdf4ff)",
        paddingBottom: "60px"
      }}
    >
      {/* HERO SECTION */}
      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000 }}
          loop
        >
          {place.images?.map((img, index) => (
            <SwiperSlide key={index}>
  <div style={{ position: "relative" }}>
    <img
      src={`http://localhost:5000${img}`}
      alt=""
      style={{
        width: "100%",
        height: "500px",
        objectFit: "cover"
      }}
    />

    {/* Dark overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))"
      }}
    />
  </div>
</SwiperSlide>


          ))}
        </Swiper>

        {/* Overlay Title */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            color: "white"
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              textShadow: "0 5px 20px rgba(0,0,0,0.4)"
            }}
          >
            {place.name}
          </h1>

          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              marginTop: "10px"
            }}
          >
            ⭐ {place.rating} • {place.category}
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{
    maxWidth: "1000px",
    margin: "40px auto 0 auto",
    padding: "40px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.08)"
  }}
>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#374151",
            marginBottom: "20px"
          }}
        >
          {place.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}
        >
          <InfoCard label="Best Time" value={place.bestTime} />
          <InfoCard label="Budget" value={`₹ ${place.budget}`} />
          <InfoCard label="Category" value={place.category} />
          <InfoCard label="Rating" value={`⭐ ${place.rating}`} />
        </div>
      </motion.div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, #6366f1, #a855f7)",
        color: "white",
        boxShadow: "0 20px 50px rgba(99,102,241,0.35)",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <p style={{ fontSize: "13px", opacity: 0.85 }}>{label}</p>
      <h3 style={{ fontSize: "22px", marginTop: "8px" }}>{value}</h3>
    </div>
  );
}


export default PlaceDetails;
