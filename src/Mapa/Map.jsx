import React, { useEffect } from 'react';
import 'ol/ol.css'; // Asegúrate de importar el estilo de OpenLayers si es necesario

function MapComponent() {
  const api_url = "http://127.0.0.1:5000/";

  useEffect(() => {
    loadMap("map", ol.proj.transform([-74.297333, 4.570868], 'EPSG:4326', 'EPSG:3857'), 10);
    test();
  }, []);

  function test() {
    fetch(api_url + "test", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        addMapLayer(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }
  
  function meanImageByCollection() {
    const theJson = {
      collectionName: $("#imageName").val(),
      visParams: JSON.parse(
        $("#visParams").val().length ? $("#visParams").val() : null
      ),
      dateFrom: $("#fromDate").val(),
      dateTo: $("#toDate").val(),
    };

    fetch(api_url + "meanImageByCollection", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theJson)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        addMapLayer(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

    function comingSoon() {
    console.log("Coming Soon");
    // Puedes realizar acciones adicionales aquí si es necesario
    }


    
  let map;

  function loadMap(target, center, zoom) {
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
  }

  function addMapLayer(data) {
    if (data.errMsg) {
      console.info(data.errMsg);
    } else {
      if (data.hasOwnProperty("url")) {
        addTileServerURL(data.url, "geeLayer");
      } else {
        console.warn("Wrong Data Returned");
      }
    }
  }

  function addTileServerURL(url, layerID) {
    var geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: url
      }),
      id: layerID
    });
    map.addLayer(geeLayer);
  }

  function removeLayer(which) {
    map.getLayers().forEach(function (layer) {
      if (layer.get("id") != undefined && layer.get("id") === which) {
        map.removeLayer(layer);
      }
    });
  }

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default MapComponent;
