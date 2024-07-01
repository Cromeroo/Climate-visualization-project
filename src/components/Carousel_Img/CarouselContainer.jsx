import styled from "styled-components";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;

  .slick-prev,
  .slick-next {
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }

  .slick-dots {
    bottom: -30px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    li {
      width: 12px;
      height: 12px;

      button:before {
        font-size: 12px;
      }
    }
  }
`;

export default CarouselContainer;
