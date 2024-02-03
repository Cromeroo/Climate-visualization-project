import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

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
  ${props => props.$isMinimized && `
  background-color: lightgray; // Por ejemplo, cambia el color de fondo cuando está minimizado
`}


`;

function LayerSelector({ layerType, changeLayer, isLayerVisible, setIsLayerVisible,onVisibilityChange  }) {
  const [isMinimized, setIsMinimized] = useState(false); // Estado para controlar la minimización
  const [selectedLayer, setSelectedLayer] = useState('');
  const [layersChecked, setLayersChecked] = useState({
    precipitation: false,
    prueba: false,
  });


  // Función intermedia para manejar el cambio de capa y agregar el console.log
  const handleLayerChange = (e) => {
    const newLayerType = e.target.value;
    const layerName = e.target.value;
    const isChecked = e.target.checked;
    console.log("Capa seleccionada:", newLayerType); // Aquí se muestra el valor seleccionado en la consola
    changeLayer(e); // Llamada a la función original pasada como prop para manejar el cambio de capa
    setSelectedLayer(newLayerType);
    onVisibilityChange(newLayerType, e.target.checked);
    console.log("Cambiando visibilidad de", layerName, "a", isChecked);
    onVisibilityChange(layerName, isChecked);
    
    console.log("Capa seleccionada:", layerName, "; Estado:", isChecked);


    setLayersChecked(prev => {
      const newState = { ...prev, [layerName]: isChecked };
      console.log(newState); // Verificar el nuevo estado
      return newState;
    });

    
  // Llama a la función para manejar la visibilidad de la capa
  onVisibilityChange(layerName, isChecked);
};




  return (
    <StyledLayerSelector $isMinimized={isMinimized} className="toolbox">
      <div>
        <div className="row mt-3 d-flex justify-content-center">
          <div className="col-9">
            <label className="form-label"><strong>Capa </strong>:</label>
            <select className="form-select" onChange={handleLayerChange} value={layerType}>
              <option value="coords">Temperatura</option>
            
              <option value="precipitation">Precipitación</option>
              <option value="prueba">Prueba</option>
            </select>
            
          </div>
        </div>
        <label>
        <input
          type="checkbox"
          value="precipitation"
          checked={layersChecked['precipitation'] || false}
          onChange={handleLayerChange}
        />
        Layer 1
      </label>
      <label>
        <input
          type="checkbox"
          value="prueba"
          checked={layersChecked['prueba'] || false}
          onChange={handleLayerChange}
        />
        Layer 1
      </label>


        <hr />

        <div className="row mb-3 justify-content-center">
          <div className="col-9">
            <label className="form-label"><strong>Capa Base</strong>:</label>
          </div>


          <div className="col-9">
            {/* Checkbox para la visibilidad de la capa de Departamentos */}
            <label>
        GeoJSON Layer
        <input
          type="checkbox"
          checked={isLayerVisible}
          onChange={(e) => setIsLayerVisible(e.target.checked)}
        />
      </label>
            {/* Asumiendo que podrías tener otro manejo para la visibilidad de Municipios */}
            <label className="form-label">
              Municipios
              <input type="checkbox" onChange={(e) => {/* Aquí podrías manejar la visibilidad de otra capa */}} />
            </label>
          </div>

          <div className="col-9">
            <label className="form-label">Fecha Final:</label>
          </div>
        </div>
      </div>
    </StyledLayerSelector>
  );
}





export default LayerSelector;
