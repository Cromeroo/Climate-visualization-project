import React, { useState } from 'react';
import Mapa from '../Mapa/Mapa';
import LayerSelector from '../Mapa/LayerSelector';
function ParentComponent() {
  const [layerType, setLayerType] = useState('coords');

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };

  return (
    <>
      <LayerSelector layerType={layerType} changeLayer={changeLayer} />
      <div className="p-4 border rounded, bdy2">
      <Mapa layerType={layerType} />
      </div>
      
    </>
  );
}

export default ParentComponent;
