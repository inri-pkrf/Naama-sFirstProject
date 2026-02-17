import React from "react";
import { useNavigate } from "react-router-dom";
import "../componentsCss/gamesIntro.css";

function GamesIntro() {
  const navigate = useNavigate();

  return (
    <div className="games-intro-wrapper">
      <div className="games-intro-card">

        <h1 className="games-title">המשחקים מתחילים!</h1>

        <h2 className="games-subtitle">מתכוננות לאתגר?</h2>

        <p className="games-text">
          עברתן את כל היעדים במסע 👏
          <br />
          עכשיו מחכים לכן שלושה משחקים מהנים ומאתגרים!
          <br />
          צברו נקודות והוכיחו שאתן אלופות 💪
        </p>

        <div className="games-buttons">
          <button
            className="secondary-btn"
            onClick={() => navigate("/map")}
          >
            חזרה למפה
          </button>

          <button
            className="main-btn"
            onClick={() => navigate("/game1")}
          >
            המשך למשחקים
          </button>
        </div>

      </div>
    </div>
  );
}

export default GamesIntro;
