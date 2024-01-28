import React, { useState } from 'react';
import styled from 'styled-components';

const StyledLayerSelector = styled.div`
  position: relative;
  padding: 3px;
  border: 1px solid;
  border-radius: 5px;
  text-align: center;

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

function LayerSelector({  layerType, changeLayer, startDate, changeStartDate, endDate, changeEndDate }) {
  const [isMinimized, setIsMinimized] = useState(false); // Estado para controlar la minimización

  // Función para alternar la minimización

  
  return (
    <StyledLayerSelector $isMinimized={isMinimized} className="toolbox">

    <div >
      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-9">
          <label className="form-label">Capa:</label>
          <select className="form-select" onChange={changeLayer} value={layerType}>
            <option value="coords">Temperatura</option>
            <option value="process_geojson">Precipitación</option>
          </select>
        </div>
      </div>
  
      <hr />
  
      <div className="row mb-3 justify-content-center">
        <div className="col-9">
          <label className="form-label">Fecha Inicial:</label>
          <input 
            type="date" 
            className="form-control" 
            value={startDate} 
            onChange={(e) => changeStartDate(e.target.value)} 
          />
        </div>
  
        <div className="col-9">
          <label className="form-label">Fecha Final:</label>
          <input 
            type="date" 
            className="form-control" 
            value={endDate}   
            onChange={(e) => changeEndDate(e.target.value)} 
          />
        </div>
      </div>
    </div>
    </StyledLayerSelector>

  );
}

export default LayerSelector;
