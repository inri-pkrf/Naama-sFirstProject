import React from "react";
import "../componentsCss/circle.css";

function Circle({ image, name, className,onClick }) {
  return (
    <div className={`circle ${className}`} onClick={onClick}>
      <div className="circle-inner">
        <div className="circle-front">
          <img src={image} alt={name} />
        </div>
        <div className="circle-back">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default Circle;
