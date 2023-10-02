import React, { useEffect } from 'react';
import 'ol/ol.css';
import { testApiCall } from './ApiService';
import MapContainer from './MapContainer';

function MapComponent() {
  let map;

  const loadMap = (target, center, zoom) => {
    const raster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    map = new ol.Map({
      layers: [raster],
      target: target,
      view: new ol.View({
        center: center,
        zoom: zoom
      })
    });
  };

  const addMapLayer = (data) => {
    if (data.errMsg) {
      console.info(data.errMsg);
    } else {
      if (data.hasOwnProperty("url")) {
        addTileServerURL(data.url, "geeLayer");
      } else {
        console.warn("Wrong Data Returned");
      }
    }
  };

  const addTileServerURL = (url, layerID) => {
    const geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: url
      }),
      id: layerID
    });
    map.addLayer(geeLayer);
  };

  useEffect(() => {
    loadMap("map", ol.proj.transform([-77.297333, 2.570868], 'EPSG:4326', 'EPSG:3857'), 7);

    testApiCall()
      .then(data => {
        addMapLayer(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }, []);

  return <MapContainer />;
}

export default MapComponent;
