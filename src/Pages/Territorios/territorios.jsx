import React, { useState } from "react";
import Carousel from "../../components/Carousel_Img/Carousel";
import images from "../../components/Carousel_Img/images";
import "./territorios.css";
function Territorios() {
  console.log("Componente Biodiversidad renderizado");
  return (
    <div>
      <div className="biodiversidad-container">
        <h2 className="biodiversidad-title">
          Silvia (Cauca) - Comunidades Misak y Ampiuile .
        </h2>

        <div style={{ width: "100%", maxWidth: "1800px", margin: "0 auto" }}>
          <Carousel images={images} />
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default Territorios;
