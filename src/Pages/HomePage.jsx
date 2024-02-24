import React, { useState, useEffect } from 'react';
import Mapa from '../Mapa/Mapa';
import LayerSelector from '../Mapa/LayerSelector';
import Drawer from '../components/drawert';
function HomePage() {
  const [layerType, setLayerType] = useState('coords');
  
  const [showLayerSelector, setShowLayerSelector] = useState(false); // Initially false
  
  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };
  
  const [layersVisibility, setLayersVisibility] = useState({
    precipitation: false, // Inicialmente visible
    prueba: false // Inicialmente no visible
    
    
  });
  const [isLayerVisible, setIsLayerVisible] = useState({
    'Resguardos': false,
    'Departamentos': false,
    'Mpiosparticipación':false
  });
  console.log('Estado inicial de isLayerVisible:', isLayerVisible);


  
  const handleVisibilityChange = (layerId, isVisible) => {
    setLayersVisibility(prevState => ({
      ...prevState,
      [layerId]: isVisible
    }));
  };
  const toggleLayerSelector = () => {
    setShowLayerSelector(!showLayerSelector);
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
              layersVisibility={layersVisibility} 
              onVisibilityChange={handleVisibilityChange}            
            />
          </div>
        )}

        <div className="p-4 border rounded" style={{ width: '80%', marginLeft: '10%' }}>
          <Mapa 
            layerType={layerType}
            isLayerVisible={isLayerVisible}
            layersVisibility={layersVisibility}
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
