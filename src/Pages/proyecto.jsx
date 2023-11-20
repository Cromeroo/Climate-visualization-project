import React, { useState } from 'react';
import Mapa from '../Mapa/layercontrol';
import Toolbox from '../Mapa/toolbox';
import Mapa2 from '../Mapa/Mapa';

function HomePage() {
  // Estado compartido para la capa seleccionada
  const [selectedLayer, setSelectedLayer] = useState('');

  // Función para actualizar la capa seleccionada
  const handleLayerChange = (layer) => {
    console.log("Capa seleccionadaaa:", layer);
    setSelectedLayer(layer);
  };
  return (
    <div>
      
      <div className="bdy3">
      <Toolbox onLayerSelect={handleLayerChange} />
      </div>
      <div className="p-4 border rounded, bdy2">
      <Mapa2/>
      </div>
      <div className="cont">
        <h2 className="text-center h2-style">La importancia de los sistemas agroalimentarios</h2>
        <p className="text-justify p-style ">
          
          
          
          
          
          
          
          
          
          
        </p>
      </div>
    </div>
  );
}

export default HomePage;

