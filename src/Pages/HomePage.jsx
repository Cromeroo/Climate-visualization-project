import React, { useState, useEffect } from 'react';
import Mapa from '../Mapa/Mapa';
import LayerSelector from '../Mapa/LayerSelector';
import Drawer from '../components/drawert';
function HomePage() {
  const [layerType, setLayerType] = useState('coords');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showLayerSelector, setShowLayerSelector] = useState(false); // Initially false

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };
  
  const changeStartDate = (newDate) => {
    setStartDate(newDate);
  };

  const changeEndDate = (newDate) => {
    setEndDate(newDate);
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
            startDate={startDate} 
            changeStartDate={changeStartDate}
            endDate={endDate}
            changeEndDate={changeEndDate} 
          />
          </div>
        )}

        <div className="p-4 border rounded" style={{ width: '80%', marginLeft: '10%' }}>
          <Mapa layerType={layerType} startDate={startDate} endDate={endDate} />
        </div>
      </div>
      <div  style={{top: '3003px'}} >
        
      <Drawer/>
      </div>
    </>
  );
}

export default HomePage;
