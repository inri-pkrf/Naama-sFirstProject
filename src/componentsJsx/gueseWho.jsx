import React, { useState } from "react";
import "../componentsCss/gueseWho.css";
import { useNavigate } from "react-router-dom";

function GuessWho() {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      clues: [
        "אני המקום הנמוך בעולם",
        "אפשר לצוף בי בקלות",
        "אני עשיר במינרלים ומלח"
      ],
      options: ["ירושלים", "ים המלח", "עמק יזרעאל", "ראש הנקרה"],
      correctAnswer: "ים המלח"
    },
    {
      id: 2,
      clues: [
        "אני עיר הבירה של ישראל",
        "הכנסת נמצאת בי",
        "אני קדושה לשלוש הדתות"
      ],
      options: ["ירושלים", "ים המלח", "עמק יזרעאל", "ראש הנקרה"],
      correctAnswer: "ירושלים"
    },
    {
      id: 3,
      clues: [
        "אני עמק ירוק בצפון הארץ",
        "אני אזור חקלאי חשוב",
        "אני נמצא בין הרי הגליל והשומרון"
      ],
      options: ["ירושלים", "ים המלח", "עמק יזרעאל", "ראש הנקרה"],
      correctAnswer: "עמק יזרעאל"
    },
    {
      id: 4,
      clues: [
        "אני נמצא בצפון על חוף הים",
        "יש בי נקרות טבעיות",
        "אני סמוך לגבול לבנון"
      ],
      options: ["ירושלים", "ים המלח", "עמק יזרעאל", "ראש הנקרה"],
      correctAnswer: "ראש הנקרה"
    }
  ];

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedClues, setRevealedClues] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const revealNextClue = () => {
    if (revealedClues < currentQuestion.clues.length) {
      setRevealedClues((prev) => prev + 1);
    }
  };

  const handleAnswerClick = (option) => {
    if (answered) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      const points = 10 - (revealedClues - 1) * 3;
      setScore((prev) => prev + points);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedClues(1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const resetGame = () => {
    setStarted(false);
    setCurrentIndex(0);
    setRevealedClues(1);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setFinished(false);
  };

  // ---------- מסך הוראות ----------
  if (!started) {
    return (
      <div className="guess-container">
        <div className="card">
          <h1>מי אני?</h1>
          <p>
            יוצגו בפניך רמזים על מקום בארץ.
            <br />
            קראי היטב ובחרי את המקום המתאים.
            <br />
            ככל שתגלי פחות רמזים – תקבלי יותר נקודות!
          </p>
          <button className="main-btn" onClick={() => setStarted(true)}>
            התחל משחק
          </button>
        </div>
      </div>
    );
  }

  // ---------- מסך סיום ----------
if (finished) {
  return (
    <div className="guess-container">
      <div className="card">
        <h2>סיימת את המשחק!</h2>
        <h3>הניקוד שלך: {score}</h3>

        {/* 🔥 המשך למשחק הבא */}
        <button
          className="main-btn"
          onClick={() => navigate("/game3")}
        >
          המשך למשחק הבא
        </button>

        {/* 🔁 שחק שוב */}
        <button className="secondary-btn" onClick={resetGame}>
          שחק שוב
        </button>
      </div>
    </div>
  );
}

  // ---------- מסך משחק ----------
  return (
    <div className="guess-container">
      <div className="score">ניקוד: {score}</div>

      <div className="card">
        <h2>רמזים:</h2>

        {currentQuestion.clues.slice(0, revealedClues).map((clue, index) => (
          <p key={index} className="clue">
            🧩 {clue}
          </p>
        ))}

        {!answered && revealedClues < currentQuestion.clues.length && (
          <button className="secondary-btn" onClick={revealNextClue}>
            גלה רמז נוסף
          </button>
        )}

        <div className="options">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`option-btn
                ${answered && option === currentQuestion.correctAnswer ? "correct" : ""}
                ${answered && option === selectedAnswer && option !== currentQuestion.correctAnswer ? "wrong" : ""}
              `}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <button className="main-btn" onClick={nextQuestion}>
            לשאלה הבאה
          </button>
        )}
      </div>
    </div>
  );
}

export default GuessWho;
