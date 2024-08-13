import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, FormCheck } from "react-bootstrap";

const StyledLayerSelector = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  margin: 20px auto;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1708px) {
    top: -30%;
    left: 174px;
    padding: 6px;
    width: 100%;
  }

  @media (max-width: 900px) {
    top: -25%;
    left: 280px;
    padding: 6px;
    width: 100%;
  }

  @media (max-width: 768px) {
    top: -15%;
    left: 90px;
    padding: 6px;
    width: fit-content;
  }

  @media (max-width: 480px) {
    position: absolute;
    height: auto;
    width: fit-content;
    top: 20px;
    left: 5%;
    padding: 10px;
  }

  ${(props) =>
    props.$isMinimized &&
    `
  background-color: lightgray;
`}
`;

function LayerSelector({
  layerType,
  changeLayer,
  isLayerVisible,
  setIsLayerVisible,
  onVisibilityChange,
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const capasDeseadas = [
    "Resguardos",
    "Departamentos",
    "Mpiosparticipación",
    "A12",
  ];
  const [selectedLayer, setSelectedLayer] = useState("");
  const [layersChecked, setLayersChecked] = useState({
    precipitation: false,
    prueba: false,
  });

  const handleVisibilityChange = (layerName, isVisible) => {
    setIsLayerVisible((prevState) => ({
      ...prevState,
      [layerName]: isVisible,
    }));
  };

  const handleLayerChange = (e) => {
    const newLayerType = e.target.value;
    const layerName = e.target.value;
    const isChecked = e.target.checked;
    changeLayer(e);
    setSelectedLayer(newLayerType);
    onVisibilityChange(newLayerType, e.target.checked);
    handleVisibilityChange(layerName, isChecked);
    setLayersChecked((prev) => ({ ...prev, [layerName]: isChecked }));
    onVisibilityChange(layerName, isChecked);
  };

  return (
    <StyledLayerSelector $isMinimized={isMinimized} className="toolbox">
      <Container>
        <Row className="mt-3 d-flex justify-content-center">
          <Col xs={9}>
            <Form.Label>
              <strong>Capa</strong>:
            </Form.Label>
            <Form.Select
              className="form-select"
              onChange={handleLayerChange}
              value={layerType}
            >
              <option value="coords">Temperatura</option>
              <option value="precipitation">Precipitación</option>
              <option value="prueba">Cobertura Vegetal</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="checkbox-container">
          <Col>
            <FormCheck
              type="checkbox"
              value="coords"
              label="Temperatura"
              checked={layersChecked["coords"] || false}
              onChange={handleLayerChange}
            />
          </Col>
        </Row>

        <Row className="checkbox-container">
          <Col>
            <FormCheck
              type="checkbox"
              value="precipitation"
              label="Precipitación"
              checked={layersChecked["precipitation"] || false}
              onChange={handleLayerChange}
            />
          </Col>
        </Row>

        <Row className="checkbox-container">
          <Col>
            <FormCheck
              type="checkbox"
              value="prueba"
              label="Cobertura Vegetal"
              checked={layersChecked["prueba"] || false}
              onChange={handleLayerChange}
            />
          </Col>
        </Row>

        <hr />

        <Row className="mb-3 justify-content-center">
          <Col xs={9}>
            <Form.Label>
              <strong>Capa Base</strong>:
            </Form.Label>
            <div>
              {Object.entries(isLayerVisible)
                .filter(([layerId, _]) => capasDeseadas.includes(layerId))
                .map(([layerId, isVisible]) => (
                  <FormCheck
                    key={layerId}
                    type="checkbox"
                    label={layerId}
                    checked={isVisible}
                    onChange={(e) =>
                      handleVisibilityChange(layerId, e.target.checked)
                    }
                  />
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </StyledLayerSelector>
  );
}

export default LayerSelector;
