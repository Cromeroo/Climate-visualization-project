import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";

function MapComponent({ layerType, isLayerVisible, layersVisibility }) {
  console.log(`Sending: ${layerType}`);
  const layerTypeRef = useRef(layerType);

  useEffect(() => {
    layerTypeRef.current = layerType;
  }, [layerType]);

  const api_url = "http://127.0.0.1:5000/";
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  useEffect(() => {
    loadMap(
      "map",
      ol.proj.transform([-77.0197, 2.7738], "EPSG:4326", "EPSG:3857"),
      8
    );
  }, []);
  const styleFunctionResguardos = (feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(255, 255, 255, 0.6)", // Color de relleno
      }),
      stroke: new ol.style.Stroke({
        color: "#319FD3", // Color de borde
        width: 1, // Ancho de borde
      }),
      text: new ol.style.Text({
        text: feature.get("NOMBRE"),
        fill: new ol.style.Fill({
          color: "#000", // Color del texto
        }),
        stroke: new ol.style.Stroke({
          color: "#fff", // Contorno del texto
          width: 3,
        }),
        font: "24px Calibri,sans-serif",
      }),
    });
  };
  const styleFunctionDepartamentos = (feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(255, 255, 255, 0.6)",
      }),
      stroke: new ol.style.Stroke({
        color: "#319FD3",
        width: 1,
      }),

      text: new ol.style.Text({
        text: feature.get("DeNombre"),
        fill: new ol.style.Fill({
          color: "#000",
        }),
        stroke: new ol.style.Stroke({
          color: "#fff",
          width: 3,
        }),
        font: "24px Calibri,sans-serif",
      }),
    });
  };
  const styleFunctionMpios = (feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(255, 255, 255, 0.6)",
      }),
      stroke: new ol.style.Stroke({
        color: "#319FD3",
        width: 1,
      }),

      text: new ol.style.Text({
        text: feature.get("MpNombre"),
        fill: new ol.style.Fill({
          color: "#000",
        }),
        stroke: new ol.style.Stroke({
          color: "#fff",
          width: 3,
        }),
        font: "24px Calibri,sans-serif",
      }),
    });
  };

  // Función genérica para cargar datos y crear capas
  const loadDataAndCreateLayer = (url, styleFunction, layerId, visibility) => {
    fetch(url)
      .then((response) => response.json())
      .then((geojsonData) => {
        console.log("Datos GeoJSON recibidos:", geojsonData);

        const vectorSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(geojsonData, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          }),
        });

        const vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: styleFunction,
          id: layerId,
          visible: visibility,
        });

        mapRef.current.addLayer(vectorLayer);
      })
      .catch((error) => {
        console.error(
          `Error al cargar los datos GeoJSON de ${layerId}:`,
          error
        );
      });
  };

  useEffect(() => {
    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/process_geojson",
      styleFunctionResguardos,
      "Resguardos",
      isLayerVisible["Resguardos"]
    );
  }, []);

  useEffect(() => {
    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/lim_geojson",
      styleFunctionDepartamentos,
      "Departamentos",
      isLayerVisible["Departamentos"]
    );
  }, []);

  useEffect(() => {
    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/res_geojson",
      styleFunctionMpios,
      "Mpiosparticipación",
      isLayerVisible["Mpiosparticipación"]
    );
  }, []);

  useEffect(() => {
    if (mapRef.current && mapRef.current.getLayers()) {
      const layers = mapRef.current.getLayers().getArray();

      console.log(
        "Capas en el mapa:",
        layers.map((layer) => layer.get("id"))
      );
      console.log("Estado de isLayerVisible en Mapa:", isLayerVisible);

      layers.forEach((layer) => {
        const layerId = layer.get("id");
        console.log(
          `Capa: ${layerId}, Visibilidad deseada: ${isLayerVisible[layerId]}`
        );
        if (isLayerVisible.hasOwnProperty(layerId)) {
          layer.setVisible(isLayerVisible[layerId]);
        }
      });
    }
  }, [isLayerVisible]);

  function loadMap(target, center, zoom) {
    const raster = new ol.layer.Tile({
      source: new ol.source.OSM(),
    });
    mapRef.current = new ol.Map({
      layers: [raster],
      target: target,
      view: new ol.View({
        center: center,
        zoom: zoom,
      }),
    });

    addDrawFunctionality(mapRef.current);
  }

  function addDrawFunctionality(map) {
    const source = new ol.source.Vector({ wrapX: false });
    const vector = new ol.layer.Vector({
      source: source,
    });
    map.addLayer(vector);

    const draw = new ol.interaction.Draw({
      source: source,
      type: "Polygon",
      contrast: 0.2,
    });

    drawRef.current = draw;
    map.addInteraction(draw);

    draw.on("drawend", (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      const transformedCoords = coordinates[0].map((coord) =>
        ol.proj.transform(coord, "EPSG:3857", "EPSG:4326")
      );

      sendPolygonToServer(transformedCoords);
    });
  }
  let layerCounter = 0;

  function sendPolygonToServer(coordinates) {
    let endpoint;

    if (layerTypeRef.current === "coords") {
      endpoint = "coords";
    } else if (layerTypeRef.current === "precipitation") {
      endpoint = "precipitation";
    } else if (layerTypeRef.current === "prueba") {
      endpoint = "prueba";
    } else if (layerTypeRef.current === "process_s2_images") {
      endpoint = "process_s2_images";
    } else {
      console.error("Tipo de capa desconocido:", layerTypeRef.current);
      return;
    }

    console.log(`Sending to endpoint: ${endpoint}`);
    console.log(`Coordinates being sent:`, coordinates);
    fetch(api_url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates: coordinates }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          addTileServerURL(data.url, endpoint);
        } else if (data.type === "FeatureCollection") {
          var vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(data, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            }),
          });

          var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            id: endpoint,
          });

          // Añadir la capa vectorial al mapa
          mapRef.current.addLayer(vectorLayer);
        } else {
          console.error("Formato de respuesta no reconocido:", data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  function addTileServerURL(url, layerID) {
    if (typeof url !== "string") {
      console.error("Invalid URL type:", typeof url);
      return;
    }
    var geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: url,
      }),

      opacity: 0.7,
    });
    const uniqueLayerID = `${layerID}-${Date.now()}`; // Agrega un identificador único
    geeLayer.set("id", uniqueLayerID); // Establecer el ID de esta manera
    console.log("Creando capa con ID:", uniqueLayerID, geeLayer);

    mapRef.current.addLayer(geeLayer);
  }

  function setLayerVisibilityByOption(option, isVisible) {
    const layers = mapRef.current.getLayers().getArray();
    layers.forEach((layer) => {
      const layerID = layer.get("id");
      if (layerID && layerID.startsWith(option)) {
        layer.setVisible(isVisible);
        console.log(
          `Visibilidad actualizada para todas las capas de ${option}: ${isVisible}`
        );
      }
    });
  }

  useEffect(() => {
    if (layersVisibility) {
      Object.keys(layersVisibility).forEach((option) => {
        console.log(
          `Actualizando visibilidad para ${option}: ${layersVisibility[option]}`
        );
        setLayerVisibilityByOption(option, layersVisibility[option]);
      });
    }
  }, [layersVisibility]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </>
  );
}

export default MapComponent;
