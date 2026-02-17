import React from "react";
import "../componentsCss/placeInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function PlaceInfo() {
  const { id } = useParams(); // כאן מקבלים את ה-id מה-URL

  const content = {
    jerusalem: {
      text: "ירושלים היא עיר הבירה של ישראל, בעלת היסטוריה עשירה ומורשת תרבותית ודתית שמושכת מבקרים מכל העולם. העיר מציעה שילוב מרתק של עתיקות ומודרניות – מהעיר העתיקה עם אתרים כמו הכותל המערבי וכנסיית הקבר ועד רובעים חדשים, מוזיאונים, פארקים ושווקים צבעוניים.",
      image: "/images/jerusalem.jpg",
    },
    jezreelValley: {
      text: "עמק יזרעאל הוא אחד האזורים הפוריים והירוקים ביותר בישראל, המציע נופים פתוחים של שדות, חקלאות ומורשת ציורית. העמק מלא בכפרים ציוריים, אתרי טבע ותחנות היסטוריות, מה שהופך אותו ליעד מצוין לטיולי יום, רכיבה על אופניים וטיולים משפחתיים.",
      image: "/images/jezreelValley.webp",
    },
    deadSea: {
      text: "ים המלח הוא המקום הנמוך ביותר בעולם, הידוע במימיו המלוחים והמרפאים. החופים שלו משמשים למנוחה וטיפולי ספא טבעיים, והחוויה היחודית של ציפה על המים גורמת למבקרים להרגיש כאילו הם מרחפים. הנופים המדבריים סביבו מוסיפים לחוויה קסומה וייחודית.",
      image: "/images/deadSea.jpg",
    },
    roshHanikra: {
      text: "ראש הנקרה, בצפון הארץ, היא אתר טבע מרהיב עם מערות משיש מרתקות וציוריות שנוצרו לאורך אלפי שנים. ניתן ליהנות מנופים מדהימים של חוף הים התיכון, ולטייל בגשרים ובשבילי ההליכה שמובילים אל המערות והנקודות הצפייה. מקום אידיאלי לצילום ונופש בחיק הטבע.",
      image: "/public/images/roshHanikra.png",
    },
  };

  const place = content[id];

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/map", { state: { visited: true } });
  };

  if (!place) return <div>המקום לא נמצא</div>;

  return (
    <div id="place-bg" className={id}>
      <div className="gili-picture"></div>
      <h2 className="message">{place.text}</h2>
      <button className="next-destination-btn" onClick={handleNavigate}>
        ליעד הבא
      </button>
    </div>
  );
}

export default PlaceInfo;
