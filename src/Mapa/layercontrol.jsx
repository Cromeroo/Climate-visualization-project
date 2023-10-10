import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';

function MapComponent() {
  const api_url = "http://127.0.0.1:5000/";
  const mapRef = useRef(null);  // Referencia para mantener el objeto mapa
  const drawRef = useRef(null); // Referencia para mantener el objeto de dibujo

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
      type: 'Polygon'
    });

    drawRef.current = draw;
    map.addInteraction(draw);

    draw.on('drawend', (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      const transformedCoords = coordinates[0].map(coord => ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326'));
      sendPolygonToServer(transformedCoords);
    });
  }

  function sendPolygonToServer(coordinates) {
    fetch(api_url + "coords", {
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
    console.log("Adding tile layer with URL:", url, "and ID:", layerID);
    var geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: url
      }),
      id: layerID
    });
    mapRef.current.addLayer(geeLayer);

  }
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default MapComponent;
