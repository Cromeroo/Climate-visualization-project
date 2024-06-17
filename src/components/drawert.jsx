import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Imagen4 from "../images/img4.png";
import Imagen5 from "../images/img5.png";

const AutoSlidingContainer = ({
  intervalDuration = 6000,
  width = "100%",
  height = "500px",
}) => {
  // Componentes de los slides
  const SlideOne = ({ imageUrl, text }) => (
    <div>
      <div className="slide-container">
        <img src={Imagen4} alt="Descripción" className="slide-image" />

        <div className="slide-text">
          Es una plataforma colaborativa transdisciplinaria que integre
          perspectivas científicas y saberes locales en comunidades locales con
          especial relación a la variabilidad y cambio climático.
        </div>
      </div>
    </div>
  );

  const SlideTwo = () => (
    <div>
      <div className="contenedor-imagen">
        <img src={Imagen5} className="cont" alt="Slide" />
        <div className="texto-sobre-imagen">Tu texto aquí</div>
      </div>
    </div>
  );

  const SlideThree = () => (
    <div>
      <div className="contenedor-imagen">
        <img src={Imagen5} className="cont" alt="Descripción" />
        <div className="texto-sobre-imagen">Tu texto aquí</div>
      </div>
    </div>
  );

  // Array de componentes de slides
  const slides = [SlideOne, SlideTwo, SlideThree];

  // Configuraciones de Slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: intervalDuration,
    pauseOnHover: true,
    className: "track",
    arrows: false,
  };

  return (
    <div className="drawert">
      <Slider {...settings}>
        {slides.map((SlideComponent, index) => (
          <div key={index}>
            <SlideComponent />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoSlidingContainer;
