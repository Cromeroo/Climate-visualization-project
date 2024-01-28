import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';


function MapComponent({ layerType,startDate,endDate }) { 
  console.log(`Sending: ${startDate}`);
  console.log(`Sending: ${endDate}`);


  const layerTypeRef = useRef(layerType);
  const vectorLayerRef = useRef(null);


  useEffect(() => {
    layerTypeRef.current = layerType;
  }, [layerType]);


  const api_url = "http://127.0.0.1:5000/";
  const mapRef = useRef(null);  
  const drawRef = useRef(null);
  const geojsonLayerRef = useRef(); 


  useEffect(() => {
    loadMap("map", ol.proj.transform([-77.0197, 2.7738], 'EPSG:4326', 'EPSG:3857'), 8);

  }, []);
  useEffect(() => {

  fetch('http://127.0.0.1:5000/process_geojson')
  .then(response => response.json())
  .then(geojsonData => {
    // Crear una fuente vectorial con los datos GeoJSON
    const vectorSource = new ol.source.Vector({
      features: new ol.format.GeoJSON().readFeatures(geojsonData, {
        dataProjection: 'EPSG:4326',  // Asegúrese de que esto coincida con la proyección de sus datos GeoJSON
        featureProjection: 'EPSG:3857' // Proyección del mapa
      })
    });

    // Crear una capa vectorial con la fuente
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    // Agregar la capa al mapa
    mapRef.current.addLayer(vectorLayer);
  })
  .catch(error => {
    console.error('Error al cargar los datos GeoJSON:', error);
  });
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
      
      // Llamar a la función con las coordenadas y el tipo de capa actual
      sendPolygonToServer(transformedCoords);
    });
  }
  
  function sendPolygonToServer(coordinates) {
    const endpoint = layerTypeRef.current === 'coords' ? "coords" : "precipitation";

    console.log(`Sending to endpoint: ${endpoint}`);
    console.log(`Coordinates being sent:`, coordinates);
    fetch(api_url + endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: coordinates })
    })
    .then(response => response.json())
    .then(data => {
      if (data.url) {
        addTileServerURL(data.url, "userLayer");
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  function addTileServerURL(url, layerID) {
    if (typeof url !== "string") {
      console.error("Invalid URL type:", typeof url);
      return;
    }
    var geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: url
      }),
      id: layerID,
      opacity: 0.7
    });
    mapRef.current.addLayer(geeLayer);
  }

  // Agregar un selector para el tipo de capa antes del mapa
  return (
    <>
      
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}

export default MapComponent;
