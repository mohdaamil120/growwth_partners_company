import React from "react";
import * as Icons from "react-icons/fa";
import "./card.css";

function Card({ title, subtitle, icon }) {
  const IconComponent = Icons[icon];
  return (
    <div className="card">
      <div className="icon">
        <IconComponent />
      </div>
      <div className="text">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default Card;
