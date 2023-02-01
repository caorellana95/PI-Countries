import React from "react";
import layout from "../Card/Card.module.css"

export default function Card({ name, flag, continent }) {
  return (
    <div className={layout.cardContainer}>
      <h3>{name}</h3>
      <img className src={flag} alt='Imagen no encontrada' width="150px" height="80px"/>
      <div className={layout.infoConteiner}>
      <h5 className={layout.content}>{continent}</h5>
      </div>
      </div>
  )
}

console.log(Card)