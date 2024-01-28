import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';

function MapComponent() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Inicializar el mapa
    const initialMap = new Map({
      target: 'map-container', // El ID de tu div contenedor
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        // Otras capas pueden ser añadidas aquí
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Transforma las coordenadas a la proyección 'EPSG:3857'
        zoom: 2
      })
    });
    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (map) {
      // Realizar la solicitud para obtener datos GeoJSON
      fetch('http://127.0.0.1:5000/process_geojson')
        .then(response => response.json())
        .then(data => {
          console.log('Datos GeoJSON recibidos:', data);

          // Crear una fuente de datos vectoriales con los datos GeoJSON
          const vectorSource = new VectorSource({
            features: new GeoJSON({
              featureProjection: 'EPSG:3857' 
            }).readFeatures(data)
          });

          // Crear una capa vectorial con la fuente de datos
          const vectorLayer = new VectorLayer({
            source: vectorSource
          });

          // Añadir la capa al mapa
          map.addLayer(vectorLayer);
      console.log(map);
        })
        .catch(error => console.error('Error al cargar los datos GeoJSON:', error));
    }
  }, [map]);





  return <div id="map-container" style={{ width: '100%', height: '400px' }}></div>;
}

export default MapComponent;


