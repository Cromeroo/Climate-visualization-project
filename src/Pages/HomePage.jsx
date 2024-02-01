import React, { useState, useEffect } from 'react';
import Mapa from '../Mapa/Mapa';
import LayerSelector from '../Mapa/LayerSelector';
import Drawer from '../components/drawert';
function HomePage() {
  const [layerType, setLayerType] = useState('coords');
  const [isLayerVisible, setIsLayerVisible] = useState(false); // Capa no visible inicialmente
  console.log("Cambiando visibilidad a:",isLayerVisible);
  const [showLayerSelector, setShowLayerSelector] = useState(false); // Initially false

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };
  
  
  const toggleLayerSelector = () => {
    setShowLayerSelector(!showLayerSelector);
  };
  const toggleLayerVisibility = () => {
    setIsLayerVisible(!isLayerVisible);
  };
  useEffect(() => {
    const handleResize = () => {
      setShowLayerSelector(!(window.innerWidth <= 1200));
    };

    window.addEventListener('resize', handleResize);

    // Limpieza del event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <button onClick={toggleLayerSelector} style={{ position: 'absolute', zIndex: 1000 }}>
        {showLayerSelector ? 'Esconder Selector de Capas' : 'Mostrar Selector de Capas'}
      </button>

      <div className='contenedor'>
        {showLayerSelector && (
          <div className="layer-selector">
            <LayerSelector 
              layerType={layerType} 
              changeLayer={changeLayer} 
              isLayerVisible={isLayerVisible} 
              setIsLayerVisible={setIsLayerVisible} 
            />
          </div>
        )}

        <div className="p-4 border rounded" style={{ width: '80%', marginLeft: '10%' }}>
          <Mapa 
            layerType={layerType}
            isLayerVisible={isLayerVisible}
             // Pasando isLayerVisible a Mapa

          />
        </div>
      </div>
      <div style={{ top: '300px' }}>
        <Drawer />
      </div>
    </>
  );
}

export default HomePage;
