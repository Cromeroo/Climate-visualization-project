import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import { testApiCall,getLayer } from './ApiService';
import MapContainer from './MapContainer';

function MapComponent() {
  let map;
  const [selectedLayer, setSelectedLayer] = useState('era5_land');

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

  const loadSelectedLayer = () => {
    getLayer(selectedLayer)
      .then(data => {
        addMapLayer(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    loadMap("map", ol.proj.transform([-77.297333, 4.570868], 'EPSG:4326', 'EPSG:3857'), 7);
    loadSelectedLayer(); 
  }, [selectedLayer])

  return (
    <div>
      <select value={selectedLayer} onChange={e => setSelectedLayer(e.target.value)}>
        <option value="era5_land">ERA5 Land</option>
        <option value="gpm_precipitation">GPM Precipitation</option>
        <option value="temperature_above_ground">Temperature Above Ground</option>
      </select>
      <button onClick={loadSelectedLayer}>Load Layer</button>
      <MapContainer />
    </div>
  );
}

export default MapComponent;