import React, { useState } from 'react';
import Mapa from '../Mapa/Mapa';
import Tiempo from '../Mapa/tiempo';
import LayerSelector from '../Mapa/LayerSelector';
import Map from '../Mapa/Map';

function HomePage() {
  const [layerType, setLayerType] = useState('coords');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };
  
  const changeStartDate = (newDate) => {
    setStartDate(newDate);
  };

  const changeEndDate = (newDate) => {
    setEndDate(newDate);
  };

  return (
    <>

      <LayerSelector 
        layerType={layerType} 
        changeLayer={changeLayer} 
        startDate={startDate} 
        changeStartDate={changeStartDate}
        endDate={endDate}
        changeEndDate={changeEndDate} 
      />
      <div className="p-4 border rounded, bdy2">
        <Mapa layerType={layerType} startDate={startDate} endDate={endDate} />
      </div>
        <div>
          <div className="cont">
          <Tiempo />
          </div>

      </div>

      
    </>
  );
}

export default HomePage;

