import React, { useEffect, useState } from "react";
import "../componentsCss/map.css";
import TemplateLeft from "./templateLeft.jsx";
import Circle from "./circle.jsx";
import { useNavigate } from "react-router-dom";

function Map({ placeIndex, setPlaceIndex }) {
  const navigate = useNavigate();
  const [showEndBtn, setShowEndBtn] = useState(false);

  // כפתור סיום – רק אחרי שהגענו ליעד האחרון
  useEffect(() => {
    if (placeIndex >= 4) {
      const timer = setTimeout(() => {
        setShowEndBtn(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [placeIndex]);

  const handleNavigate = (id, index) => {
    navigate(`/place/${id}`);

    // מתקדמים רק אם זה היעד הבא במסע
    if (index === placeIndex) {
      setPlaceIndex(placeIndex + 1);
    }
  };

  return (
    <TemplateLeft>
      <div id="map-road"></div>

      <Circle
        name="ירושלים"
        image="/images/jerusalem.jpg"
        className={`place1 ${placeIndex === 0 ? "glowing-box-shadow" : ""}`}
        onClick={
          placeIndex >= 0
            ? () => handleNavigate("jerusalem", 0)
            : undefined
        }
      />

      <Circle
        name="עמק יזרעאל"
        image="/images/jezreelValley.webp"
        className={`place2 ${placeIndex === 1 ? "glowing-box-shadow" : ""}`}
        onClick={
          placeIndex >= 1
            ? () => handleNavigate("jezreelValley", 1)
            : undefined
        }
      />

      <Circle
        name="ים המלח"
        image="/images/deadSea.jpg"
        className={`place3 ${placeIndex === 2 ? "glowing-box-shadow" : ""}`}
        onClick={
          placeIndex >= 2
            ? () => handleNavigate("deadSea", 2)
            : undefined
        }
      />

      <Circle
        name="ראש הנקרה"
        image="/images/roshHanikra.png"
        className={`place4 ${placeIndex === 3 ? "glowing-box-shadow" : ""}`}
        onClick={
          placeIndex >= 3
            ? () => handleNavigate("roshHanikra", 3)
            : undefined
        }
      />

      {showEndBtn && (
        <div id="end-btn" onClick={() => navigate("/gamesIntro")}>
          <h3>לסיום המסע</h3>
          <div id="icon-start"></div>
        </div>
      )}
    </TemplateLeft>
  );
}

export default Map;
