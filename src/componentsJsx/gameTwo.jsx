import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import "../componentsCss/gameTwo.css";
import { useNavigate } from "react-router-dom";

function GameTwo() {
  const navigate = useNavigate();

  // 🔒 שמירת מיקום גלילה
  const scrollYRef = useRef(0);

  function lockScroll() {
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollYRef.current);
  }

  const initialQuestions = [
    { id: 1, text: "עיר הבירה של ישראל", correctPlace: "jerusalem" },
    { id: 2, text: "הכנסת נמצאת בה", correctPlace: "jerusalem" },
    { id: 3, text: "העיר הקדושה לשלוש הדתות", correctPlace: "jerusalem" },
    { id: 4, text: "המקום הנמוך בעולם", correctPlace: "deadSea" },
    { id: 5, text: "אפשר לצוף בו בגלל ריכוז המלח הגבוה", correctPlace: "deadSea" },
    { id: 6, text: "עמק ירוק וחקלאי בצפון הארץ", correctPlace: "jezreelValley" },
    { id: 7, text: "נמצא בין הרי הגליל להרי השומרון", correctPlace: "jezreelValley" },
    { id: 8, text: "מערות מרהיבות בצפון על חוף הים", correctPlace: "roshHanikra" },
    { id: 9, text: "נמצאת סמוך לגבול לבנון", correctPlace: "roshHanikra" },
    { id: 10, text: "ידועה במצוקי גיר לבנים ובנקרות טבעיות", correctPlace: "roshHanikra" },
  ];

  const shuffleArray = (array) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const [questions, setQuestions] = useState(() =>
    shuffleArray(initialQuestions)
  );

  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);
  const [dragOverPlace, setDragOverPlace] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dragStyle, setDragStyle] = useState(null);

  const nextQuestion = questions.find((q) => !placements[q.id]);

  const dragRef = useRef({
    isDragging: false,
    draggedId: null,
    offsetX: 0,
    offsetY: 0,
  });

  // ===== START DRAG =====
  // ===== START DRAG =====
const handlePointerDown = (e, questionId) => {
  const rect = e.currentTarget.getBoundingClientRect();

  // 📱 אם זה מגע — השתמש ב-touch
  const isTouch = e.pointerType === "touch";

  const clientX = isTouch && e.touches
    ? e.touches[0].clientX
    : e.clientX;

  const clientY = isTouch && e.touches
    ? e.touches[0].clientY
    : e.clientY;

  dragRef.current = {
    isDragging: true,
    draggedId: questionId,

    // ⭐ המיקום המדויק של האצבע בתוך האלמנט
    offsetX: clientX - rect.left,
    offsetY: clientY - rect.top,
  };

  lockScroll();

  setDragStyle({
    position: "fixed",
    left: 0,
    top: 0,
    width: rect.width,
    zIndex: 1000,
    pointerEvents: "none",
    transform: `translate(${rect.left}px, ${rect.top}px)`,
  });

  e.currentTarget.setPointerCapture(e.pointerId);
  e.preventDefault();
};

  // ===== MOVE =====
  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;

    const x = e.clientX - dragRef.current.offsetX;
    const y = e.clientY - dragRef.current.offsetY;

    setDragStyle((prev) => ({
      ...prev,
      transform: `translate(${x}px, ${y}px)`,
    }));

    const element = document.elementFromPoint(e.clientX, e.clientY);
    const placeBox = element?.closest(".place-box");

    const placeId = placeBox?.className.match(
      /\b(jerusalem|deadSea|jezreelValley|roshHanikra)\b/
    )?.[1];

    setDragOverPlace(placeId || null);
  };

  // ===== DROP =====
  const handlePointerUp = (e) => {
    if (!dragRef.current.isDragging) return;

    unlockScroll();

    const questionId = dragRef.current.draggedId;

    const element = document.elementFromPoint(e.clientX, e.clientY);
    const placeBox = element?.closest(".place-box");

    const targetPlaceId = placeBox?.className.match(
      /\b(jerusalem|deadSea|jezreelValley|roshHanikra)\b/
    )?.[1];

    if (targetPlaceId) {
      setPlacements((prev) => ({
        ...prev,
        [questionId]: targetPlaceId,
      }));
      setChecked(false);
    }

    dragRef.current.isDragging = false;
    dragRef.current.draggedId = null;
    setDragOverPlace(null);
    setDragStyle(null);
  };

  const handleCheck = () => {
    setChecked(true);

    const allCorrect = questions.every(
      (q) => placements[q.id] === q.correctPlace
    );

    if (allCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const resetGame = () => {
    setPlacements({});
    setChecked(false);
    setQuestions(shuffleArray(initialQuestions));
    setShowConfetti(false);
  };

  const getClassName = (q) => {
    if (!checked) return "sentence-item";
    return placements[q.id] === q.correctPlace
      ? "sentence-item correct"
      : "sentence-item wrong";
  };

  const renderPlaceBox = (placeId, label) => (
    <div
      className={`place-box ${placeId}
      ${dragOverPlace ? "dimmed" : ""}
      ${dragOverPlace === placeId ? "active" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <h3>{label}</h3>

      {questions
        .filter((q) => placements[q.id] === placeId)
        .map((q) => (
          <div
            key={q.id}
            className={getClassName(q)}
            onPointerDown={(e) => handlePointerDown(e, q.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              cursor: "grab",
              touchAction: "none",
              ...(dragRef.current.draggedId === q.id ? dragStyle : {}),
            }}
          >
            {q.text}
          </div>
        ))}
    </div>
  );

  return (
    <div className="game-two-container">
      {showConfetti && <Confetti />}

      <div className="places-container">
        {renderPlaceBox("jerusalem", "ירושלים")}
        {renderPlaceBox("jezreelValley", "עמק יזרעאל")}
        {renderPlaceBox("deadSea", "ים המלח")}
        {renderPlaceBox("roshHanikra", "ראש הנקרה")}
      </div>

      {/* ⭐ המשפט הבא שלא הונח */}
      {nextQuestion && (
        <div
          className="current-sentence"
          onPointerDown={(e) => handlePointerDown(e, nextQuestion.id)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            cursor: "grab",
            touchAction: "none",

            // ⭐ התיקון הקריטי
            ...(dragRef.current.draggedId === nextQuestion.id
              ? dragStyle
              : {}),
          }}
        >
          {nextQuestion.text}
        </div>
      )}

      {Object.keys(placements).length === questions.length && (
        <div className="buttons-container">
          {!checked && (
            <button className="check-btn" onClick={handleCheck}>
              בדיקה
            </button>
          )}

          {checked && (
            <>
              <button
                className="finish-btn"
                onClick={() => navigate("/game2")}
              >
                סיום משחק
              </button>

              <button className="restart-btn" onClick={resetGame}>
                שחק שוב
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GameTwo;
