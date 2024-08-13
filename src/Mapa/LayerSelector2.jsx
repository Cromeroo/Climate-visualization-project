import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, FormCheck, Button } from "react-bootstrap";

const StyledLayerSelector = styled.div`
  position: relative;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 98%;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  max-height: 62vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
    width: 95%;
    margin: 10px auto;
    max-height: 70vh;
  }

  @media (max-width: 480px) {
    padding: 10px;
    width: 90%;
    top: 20px;
    left: 5%;
    max-height: 60vh;
    overflow-y: auto;
  }

  ${(props) =>
    props.$isMinimized &&
    `
    background-color: #f0f0f0;
    padding: 10px;
  `}
`;

const StyledFormCheck = styled(FormCheck)`
  .form-check-input {
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    width: 18px;
    height: 18px;
  }

  .form-check-label {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const GroupTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: "${(props) => (props.$isOpen ? "▲" : "▼")}";
    font-size: 12px;
    margin-left: 10px;
  }
`;

const LayerGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  background-color: #f8f9fa; /* Color de fondo blanco/gris */
  color: #555; /* Color del texto en gris oscuro */
  border: 2px solid #e0e0e0; /* Borde gris */
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0; /* Color de fondo gris claro al hacer hover */
    color: #000; /* Texto en negro al hacer hover */
    border-color: #d1d1d1; /* Borde ligeramente más oscuro */
  }
`;

function LayerSelector({
  layerType,
  changeLayer,
  isLayerVisible,
  setIsLayerVisible,
  onVisibilityChange,
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  const capasDeseadas = {
    CapaBase: ["Resguardos", "Departamentos", "Mpiosparticipación"],
    Actual: ["A1", "A12"],
    SSP126: ["A1ssp126", "A12ssp126"],
    SSP245: ["A1ssp245", "A12ssp245"],
    SSP370: ["A1ssp370", "A12ssp370"],
    SSP585: ["A1ssp585", "A12ssp585"],
  };

  const handleGroupToggle = (groupName) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

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
    onVisibilityChange(newLayerType, isChecked);
    handleVisibilityChange(layerName, isChecked);
  };

  const handleDeselectAll = () => {
    const updatedVisibility = {};
    Object.keys(isLayerVisible).forEach((layer) => {
      updatedVisibility[layer] = false;
    });
    setIsLayerVisible(updatedVisibility);
    Object.keys(updatedVisibility).forEach((layer) => {
      onVisibilityChange(layer, false);
    });
  };

  return (
    <StyledLayerSelector $isMinimized={isMinimized} className="toolbox">
      <Container>
        {Object.entries(capasDeseadas).map(([groupName, layers]) => (
          <LayerGroup key={groupName}>
            <GroupTitle
              $isOpen={openGroups[groupName]}
              onClick={() => handleGroupToggle(groupName)}
            >
              {groupName}
            </GroupTitle>
            {openGroups[groupName] && (
              <Row className="mb-3">
                <Col xs={12}>
                  {layers.map((layerId) => (
                    <StyledFormCheck
                      key={layerId}
                      type="checkbox"
                      label={layerId}
                      checked={isLayerVisible[layerId] || false}
                      onChange={(e) =>
                        handleVisibilityChange(layerId, e.target.checked)
                      }
                    />
                  ))}
                </Col>
              </Row>
            )}
          </LayerGroup>
        ))}
        <StyledButton onClick={handleDeselectAll}>
          Deseleccionar Todas
        </StyledButton>
      </Container>
    </StyledLayerSelector>
  );
}

export default LayerSelector;
