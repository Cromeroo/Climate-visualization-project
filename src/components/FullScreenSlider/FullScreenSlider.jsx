import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideItem from "./SlideItem";
import { sliderData } from "./sliderData";

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 60vh;
  overflow: hidden;
  padding: 0 !important;
  margin: 0 !important;

  .slick-slider {
    height: 100%;
  }

  .slick-dots {
    bottom: 20px;

    li {
      width: 16px;
      height: 16px;
      margin: 0 5px;

      button {
        width: 100%;
        height: 100%;
        padding: 0;

        &:before {
          font-size: 16px;
          color: white;
          opacity: 0.75; /* Default opacity */
        }
      }

      &.slick-active button:before {
        color: green; /* Active dot color */
        opacity: 1; /* Active dot opacity */
      }
    }
  }

  .slick-slide img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

const FullScreenSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <FullScreenContainer>
      <Slider {...settings}>
        {sliderData.map((slide, index) => (
          <SlideItem key={index} slide={slide} />
        ))}
      </Slider>
    </FullScreenContainer>
  );
};

export default FullScreenSlider;
