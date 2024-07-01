import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const SectionContainer = styled(motion.div)`
  padding: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #8b0000;
  margin: 20px 0 10px;
`;

const Content = styled.p`
  white-space: pre-wrap;
  text-align: justify;
  color: #333;
  font-size: 18px;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 2000px;
`;

const Section = ({ title, content, image }) => (
  <SectionContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Title>{title}</Title>
    <Content>{content}</Content>
  </SectionContainer>
);

export default Section;
