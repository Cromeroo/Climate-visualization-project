import React from "react";
import styled from "styled-components";

const Slide = styled.div`
  position: relative;
  color: white;

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .text-overlay {
    position: absolute;
    top: 20%;
    left: 10%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
  }
`;
const SlideItem = ({ slide }) => {
  return (
    <Slide>
      <img src={slide.image} alt={`Slide ${slide.text}`} />
      <div className="text-overlay">
        <h2>{slide.text}</h2>
        <p>recopilación de datos</p>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          En vivo
        </button>
      </div>
    </Slide>
  );
};

export default SlideItem;
