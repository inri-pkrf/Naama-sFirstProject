import React, { useState, useEffect } from "react";
import "../componentsCss/puzzleReveal.css";
import { useNavigate } from "react-router-dom";

const images = [
  { name: "ירושלים", src: "/images/jerusalem.jpg" },
  { name: "עמק יזרעאל", src: "/images/jezreelValley.webp" },
  { name: "ים המלח", src: "/images/deadSea.jpg" },
  { name: "ראש הנקרה", src: "/images/roshHanikra.png" },
];

function PuzzleReveal() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hiddenTiles, setHiddenTiles] = useState([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [finishedRound, setFinishedRound] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startRound();
  }, [currentIndex]);

  // אנימציית ניקוד עולה
  useEffect(() => {
    if (animatedScore < score) {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [score]);

  const startRound = () => {
    setHiddenTiles(Array.from({ length: 9 }, (_, i) => i));
    setRevealedCount(0);
    setSelectedAnswer(null);
    setFinishedRound(false);
  };

  const handleTileClick = (index) => {
    if (finishedRound) return;

    if (hiddenTiles.includes(index)) {
      setHiddenTiles(hiddenTiles.filter((tile) => tile !== index));
      setRevealedCount((prev) => prev + 1);
    }
  };

  const handleAnswer = (option) => {
    if (finishedRound) return;
    if (revealedCount === 0) return; // חובה לחשוף לפחות חלק אחד

    setSelectedAnswer(option);
    setFinishedRound(true);

    if (option === images[currentIndex].name) {
      const points = Math.max(10 - revealedCount, 1);
      setScore((prev) => prev + points);
    }
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnimatedScore(0);
    setCurrentIndex(0);
    setGameOver(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="puzzle-container">
      <h2>נחשי את המקום!</h2>
      <h3 className="score-display">ניקוד: {animatedScore}</h3>

      <div className="grid">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="tile"
            onClick={() => handleTileClick(index)}
          >
            <img src={currentImage.src} alt="" />
            {hiddenTiles.includes(index) && <div className="cover"></div>}
          </div>
        ))}
      </div>

      {revealedCount === 0 && (
        <p className="hint-text">חשפו לפחות חלק אחד כדי לענות</p>
      )}

      <div className="options">
        {images.map((img) => (
          <button
            key={img.name}
            disabled={revealedCount === 0}
            className={`option-btn ${
              finishedRound && img.name === currentImage.name
                ? "correct"
                : finishedRound && img.name === selectedAnswer
                  ? "wrong"
                  : ""
            }`}
            onClick={() => handleAnswer(img.name)}
          >
            {img.name}
          </button>
        ))}
      </div>

      {finishedRound && !gameOver && (
        <button className="main-btn" onClick={nextImage}>
          למקום הבא
        </button>
      )}

      {gameOver && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>סיימת את המשחק 🎉</h2>
            <h3>ניקוד סופי: {animatedScore}</h3>

            <button className="main-btn" onClick={resetGame}>
              שחק שוב
            </button>

            <button className="main-btn" onClick={() => navigate("/summary")}>
              לסיכום הלומדה
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PuzzleReveal;
