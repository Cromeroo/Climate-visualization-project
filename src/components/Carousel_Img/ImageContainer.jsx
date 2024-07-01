import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    height: 50vh;
  }

  @media (max-width: 600px) {
    height: 30vh;
    width: 80vh;
  }
`;

export default ImageContainer;
