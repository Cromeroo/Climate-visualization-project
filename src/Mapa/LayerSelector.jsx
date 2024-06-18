import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";

const StyledLayerSelector = styled.div`
  position: relative;
  padding: 3px;
  border: 1px solid;
  border-radius: 5px;
  text-align: center;
  width: 56%;
  top: 20px;
  left: 198px;

  @media (max-width: 1708px) {
    top: -30%;
    left: 174px;
    padding: 6px;
  }
  @media (max-width: 900px) {
    top: -25%;
    left: 280px;
    padding: 6px;
  }

  @media (max-width: 768px) {
    top: -15%;
    left: 90px;
    padding: 6px;
  }

  @media (max-width: 480px) {
    position: absolute;
    height: 350px;
    width: 150px;
    top: 20px;
    left: 60px;
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
  const capasDeseadas = ["Resguardos", "Departamentos", "Mpiosparticipación"];
  // Estado para controlar la minimización
  const [selectedLayer, setSelectedLayer] = useState("");
  const [layersChecked, setLayersChecked] = useState({
    precipitation: false,
    prueba: false,
  });
  const handleVisibilityChange = (layerName, isVisible) => {
    console.log("Cambiando visibilidad de", layerName, "a", isVisible);
    setIsLayerVisible((prevState) => ({
      ...prevState,
      [layerName]: isVisible,
    }));
  };
  console.log(
    "Estado inicial de isLayerVisible en LayerSelector:",
    isLayerVisible
  );

  const handleLayerChange = (e) => {
    const newLayerType = e.target.value;
    const layerName = e.target.value;
    const isChecked = e.target.checked;
    console.log("Capa seleccionada:", newLayerType); 
    changeLayer(e); 
    setSelectedLayer(newLayerType);
    onVisibilityChange(newLayerType, e.target.checked);
    console.log("Cambiando visibilidad de", layerName, "a", isChecked);
    onVisibilityChange(layerName, isChecked);

    console.log("Capa seleccionada:", layerName, "; Estado:", isChecked);
    changeLayer(e); 
    handleVisibilityChange(layerName, isChecked);

    setLayersChecked((prev) => {
      const newState = { ...prev, [layerName]: isChecked };
      console.log(newState); // Verificar el nuevo estado
      return newState;
    });

    onVisibilityChange(layerName, isChecked);
  };

  return (
    <StyledLayerSelector $isMinimized={isMinimized} className="toolbox">
      <div>
        <div className="row mt-3 d-flex justify-content-center">
          <div className="col-9">
            <label className="form-label">
              <strong>Capa </strong>:
            </label>
            <select
              className="form-select"
              onChange={handleLayerChange}
              value={layerType}
            >
              <option value="coords">Temperatura</option>
              <option value="precipitation">Precipitación</option>
              <option value="prueba">Cobertura Vegetal</option>
            </select>
          </div>
        </div>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="coords"
              checked={layersChecked["coords"] || false}
              onChange={handleLayerChange}
            />
            Temperatura
          </label>
        </div>

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="precipitation"
              checked={layersChecked["precipitation"] || false}
              onChange={handleLayerChange}
            />
            Precipitación
          </label>
        </div>

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              value="prueba"
              checked={layersChecked["prueba"] || false}
              onChange={handleLayerChange}
            />
            Cobertura Vegetal
          </label>
        </div>
        <hr />

        <div className="row mb-3 justify-content-center">
          <div className="col-9">
            <label className="form-label">
              <strong>Capa Base</strong>:
            </label>
          </div>

          <div className="col-9">
            {/* Checkbox para la visibilidad de la capa de Departamentos */}
            <div>
              {/* Otros controles */}
              {Object.entries(isLayerVisible)
                .filter(([layerId, _]) => capasDeseadas.includes(layerId)) // Filtra solo las capas deseadas
                .map(([layerId, isVisible]) => (
                  <label key={layerId}>
                    {layerId}
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) =>
                        handleVisibilityChange(layerId, e.target.checked)
                      }
                    />
                  </label>
                ))}
            </div>
          </div>

          <div className="col-9"></div>
        </div>
      </div>
    </StyledLayerSelector>
  );
}

export default LayerSelector;
