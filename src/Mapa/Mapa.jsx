import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Circle, Fill, Stroke, Style } from 'ol/style';

import { testApiCall } from './ApiService';
import MapContainer from './MapContainer';


function MapComponent() {
  let map;
  let draw;

  const loadMap = (target, center, zoom) => {
    const raster = new TileLayer({
      source: new OSM()
    });

    map = new Map({
      layers: [raster],
      target: target,
      view: new View({
        center: center,
        zoom: zoom
      })
    });
  };

  const addTileServerURL = (url, layerID) => {
    console.log("Adding tile layer with URL:", url, "and ID:", layerID);
    const geeLayer = new TileLayer({
      source: new XYZ({
        url: url
        
      }),
      id: layerID
      
    });
    

    map.addLayer(geeLayer);
  };
  const sendPolygonCoordinatesToBackend = async (coordinates) => {
    try {
        const transformedCoordinates = coordinates[0].map(coord => transform(coord, 'EPSG:3857', 'EPSG:4326'));
        console.log(transformedCoordinates);
        const payload = JSON.stringify({ coordinates: transformedCoordinates });
        const response = await fetch('http://localhost:5000/coords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        const data = await response.json();
        console.log(data);

        if (data.tile_url) {
            // Función para remover una capa por ID
            const removeLayerByID = (layerID) => {
                const layerToRemove = map.getLayers().getArray().find(layer => layer.get('id') === layerID);
                if (layerToRemove) {
                    map.removeLayer(layerToRemove);
                }
            };

            // Llamar a removeLayerByID antes de añadir la nueva capa
            removeLayerByID("serverLayer");

            // Ahora añade la nueva capa
            addTileServerURL(data.tile_url, "serverLayer");

            // Llevar la nueva capa al frente
            const layer = map.getLayers().getArray().find(layer => layer.get('id') === "serverLayer");
            if (layer) {
                map.removeLayer(layer);
                map.addLayer(layer);
            }
        }
    } catch (error) {
        console.error('Error sending coordinates:', error);
    }
};




  const addDrawingLayer = () => {
    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    map.addLayer(vector);
    draw = new Draw({
      source: source,
      type: 'Polygon',
    });

    draw.on('drawend', (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      sendPolygonCoordinatesToBackend(coordinates);
    });

    map.addInteraction(draw);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        loadMap("map", transform([-77.297333, 2.570868], 'EPSG:4326', 'EPSG:3857'), 7);
        const data = await testApiCall();
        if (data.errMsg) {
          console.info(data.errMsg);
        } else if (data.url) {
          addTileServerURL(data.url, "geeLayer");
        } else {
          console.warn("Wrong Data Returned");
        }
        addDrawingLayer();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return <MapContainer />;
}

export default MapComponent;
