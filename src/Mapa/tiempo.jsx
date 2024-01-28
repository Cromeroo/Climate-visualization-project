import React, { useEffect, useState, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import Draw from 'ol/interaction/Draw';

function CombinedMapComponent() {
  const [map, setMap] = useState(null);
  const drawRef = useRef(null);
  const mapRef = useRef(null);
  const express = require('express');
    const cors = require('cors');
    const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Set to your app's origin
}));
app.listen(5000, () => console.log('Server running on http://127.0.0.1:5000'));


  // Initialize the map
  useEffect(() => {
    const initialMap = new Map({
      target: 'map-container',
      layers: [
        new TileLayer({ source: new OSM() }), // OpenStreetMap layer
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
    setMap(initialMap);
    mapRef.current = initialMap;
  }, []);

  // Fetch and add GeoJSON data
  useEffect(() => {
    if (map) {
      fetch('http://127.0.0.1:5000/process_geojson')
        .then(response => response.json())
        .then(data => {
          const vectorSource = new VectorSource({
            features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(data)
          });

          const vectorLayer = new VectorLayer({ source: vectorSource });
          map.addLayer(vectorLayer);
        })
        .catch(error => console.error('Error loading GeoJSON data:', error));
    }
  }, [map]);

  // Add drawing functionality
  useEffect(() => {
    if (map) {
      addDrawFunctionality(map);
    }
  }, [map]);

  const addDrawFunctionality = (map) => {
    const source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({ source: source });
    map.addLayer(vector);

    const draw = new Draw({
      source: source,
      type: 'Polygon'
    });

    drawRef.current = draw;
    map.addInteraction(draw);

    draw.on('drawend', (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      const transformedCoords = coordinates[0].map(coord => fromLonLat(coord, 'EPSG:3857', 'EPSG:4326'));
      sendPolygonToServer(transformedCoords);
    });
  };

  // Function to handle sending drawn polygon to server
  const sendPolygonToServer = (coordinates) => {
    // Replace with your server URL and endpoint
    const api_url = "http://127.0.0.1:5000/"; 
    fetch(api_url + "http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: coordinates })
    })
    .then(response => response.json())
    .then(data => {
      // Handle server response here
    })
    .catch(error => console.error('Error sending coordinates:', error));
  };

  return <div id="map-container" style={{ width: '100%', height: '400px' }}></div>;
}

export default CombinedMapComponent;
