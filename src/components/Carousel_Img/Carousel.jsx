import React from "react";
import Slider from "react-slick";
import CarouselContainer from "./CarouselContainer";
import ImageContainer from "./ImageContainer";
import StyledImage from "./StyledImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <ImageContainer key={index}>
            <StyledImage src={image} alt={`Slide ${index}`} />
          </ImageContainer>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
