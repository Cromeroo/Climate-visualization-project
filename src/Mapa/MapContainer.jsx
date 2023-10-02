import React from 'react';

function MapContainer({ children }) {
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>
      {children}
    </div>
  );
}

export default MapContainer;
