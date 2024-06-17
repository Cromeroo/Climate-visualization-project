import React, { useEffect, useRef,useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';

import 'ol/ol.css';


function MapComponent({ layerType,isLayerVisible,layersVisibility  }) { 
  console.log(`Sending: ${layerType}`);
  const [timeSeriesData, setTimeSeriesData] = useState([]);



  const layerTypeRef = useRef(layerType);


  useEffect(() => {
    layerTypeRef.current = layerType;
  }, [layerType]);


  const api_url = "http://127.0.0.1:5000/";
  const mapRef = useRef(null);  
  const drawRef = useRef(null);


  useEffect(() => {
    loadMap("map", ol.proj.transform([-77.0197, 2.7738], 'EPSG:4326', 'EPSG:3857'), 8);

  }, []);


  function loadMap(target, center, zoom) {
    const raster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    mapRef.current = new ol.Map({
      layers: [raster],
      target: target,
      view: new ol.View({
          center: center,
          zoom: zoom
      })
    });

    // Agregar funcionalidad de dibujo
    addDrawFunctionality(mapRef.current);
  }

  function addDrawFunctionality(map) {
    const source = new ol.source.Vector({wrapX: false});
    const vector = new ol.layer.Vector({
      source: source
    });
    map.addLayer(vector);

    const draw = new ol.interaction.Draw({
      source: source,
      type: 'Polygon',
      contrast: 0.2
    });

    drawRef.current = draw;
    map.addInteraction(draw);

    draw.on('drawend', (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      const transformedCoords = coordinates[0].map(coord => ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326'));
      
      sendPolygonToServer(transformedCoords);
    });
  }
  function sendPolygonToServer(transformedCoords) {
    const payload = {
      coordinates: [transformedCoords], // La API espera un array de arrays de coordenadas
      dateFrom: '2020-01-01', // Establece tus propias fechas
      dateTo: '2020-12-31',
      indexName: 'NDVI', // O cualquier índice que necesites
    };
  
    fetch(api_url + 'timeSeriesIndex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      if (data.timeSeries && Array.isArray(data.timeSeries)) {
        const formattedData = data.timeSeries.map(item => ({
          date: new Date(item.date).toLocaleDateString(), // Asegúrate de que esto se ajusta a tus necesidades
          value: item.value,
        }));
        setTimeSeriesData(formattedData);
      } else {
        throw new Error('Data format is incorrect or timeSeries is missing');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <div className="container-xl">
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      </div>

      <div className="container-xxl">
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <LineChart
              data={timeSeriesData}
              margin={{ top: 20, right: 80, left: 50, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="date">
                <Label value="Fecha" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [value, 'Valor']} labelFormatter={(label) => `Fecha: ${label}`} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default MapComponent;