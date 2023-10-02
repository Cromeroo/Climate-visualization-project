import React, { useEffect } from 'react';
import 'ol/ol.css';
import { fetchLayerData } from './ApiService';


const LayerControl = ({ map }) => {

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchLayerData();
          addMapLayer(data);  // Aquí llamamos a addMapLayer dentro del useEffect
        } catch (error) {
          console.warn("Error adding layer:", error);
        }
      };
      
      fetchData();
    }, [map]);
  
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
        source: new ol.source.XYZ({ url }),
        id: layerID
      });
      map.addLayer(geeLayer);
    };
  
    return null;
  };
  
  export default LayerControl;
  
