import React from "react";
import TemplateLeft from "./templateLeft.jsx";
import "../componentsCss/summary.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation, useNavigate } from "react-router-dom";

function Summary({resetMap}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    cssEase: "ease-in-out",
  };

  const images = [
    { src: "/images/jerusalem.jpg", alt: "ירושלים" },
    { src: "/images/jezreelValley.webp", alt: "עמק יזרעאל" },
    { src: "/images/deadSea.jpg", alt: "ים המלח" },
    { src: "/images/roshHanikra.png", alt: "ראש הנקרה" },
  ];

  const navigate = useNavigate();

  const handleNavigate = () => {
    resetMap();
    navigate("/home");
  };

  return (
    <TemplateLeft>
      <h1 id="summary-title">אז איפה טיילנו?</h1>
      <div id="repeat" onClick={handleNavigate}></div>
      <div id="container-gallery">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="slide-wrapper">
              <h2 id="place-name">{img.alt}</h2>
              <img src={img.src} alt={img.alt} className="slide-image" />
            </div>
          ))}
        </Slider>
      </div>
    </TemplateLeft>
  );
}

export default Summary;
