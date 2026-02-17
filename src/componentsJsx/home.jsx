import React from "react";
import "../componentsCss/home.css";
import TemplateLeft from "./templateLeft.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/map");
  };

  return (
    <div className="home-container">
      <TemplateLeft>
        <div id="title-welcome">
          <h1 id="title-welcome-text">ברוכים הבאים ללומדת הטיולים</h1>
        </div>
        <h2 className="message-home-web">
          נעים מאוד אני גילי אני אוהבת לטייל בארץ ורוצה שתטיילו ביחד איתי. לאורך
          הלומדה נעבור בין יעדים מומלצים ומרהיבים מאוד בארץ שלנו. נלמד עליהם
          ונכיר אותם קצת יותר. אז תארזו תיק ותביאו איתכם כובע ומים. מאחלת לנו
          מסע מהנה ומעורר השראה!
        </h2>
        <h2 className="message-home-mobile">
          נעים מאוד! אני גילי 🙂 אני אוהבת לטייל בארץ ישראל. נצא למסע קצר ונגלה
          יחד מקומות מיוחדים, נכיר קצת היסטוריה — ונעבור חוויה מהנה!
        </h2>
        <div id="start-btn" onClick={handleNavigate}>
          <h3>קדימה למסע</h3>
          <div id="icon-start"></div>
        </div>
      </TemplateLeft>
    </div>
  );
}

export default Home;
