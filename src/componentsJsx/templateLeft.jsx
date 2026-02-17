import React from "react";
import "../componentsCss/templateLeft.css";

function TemplateLeft({ children }) {
  return (
    <div id="template-bg">
      <div className="gili-picture"></div>
      <div className="content">{children}</div>
    </div>
  );
}

export default TemplateLeft;
