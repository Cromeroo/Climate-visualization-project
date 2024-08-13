import React, { useEffect, useRef, useCallback } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";

function MapComponent({ layerType, isLayerVisible, layersVisibility }) {
  const layerTypeRef = useRef(layerType);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const api_url = "http://127.0.0.1:5000/";

  const cachedLayers = useRef({});

  useEffect(() => {
    layerTypeRef.current = layerType;
  }, [layerType]);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = useCallback(() => {
    const raster = new ol.layer.Tile({
      source: new ol.source.OSM(),
    });

    mapRef.current = new ol.Map({
      layers: [raster],
      target: "map",
      view: new ol.View({
        center: ol.proj.transform([-77.0197, 2.7738], "EPSG:4326", "EPSG:3857"),
        zoom: 8,
      }),
    });

    addDrawFunctionality(mapRef.current);
  }, []);

  const addDrawFunctionality = useCallback((map) => {
    const source = new ol.source.Vector({ wrapX: false });
    const vector = new ol.layer.Vector({ source: source });
    map.addLayer(vector);

    const draw = new ol.interaction.Draw({
      source: source,
      type: "Polygon",
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
  }, []);

  const loadDataAndCreateLayer = useCallback(
    (url, styleFunction, layerId, visibility) => {
      if (cachedLayers.current[layerId]) {
        // Si la capa ya está en caché, solo ajusta la visibilidad
        cachedLayers.current[layerId].setVisible(visibility);
      } else {
        // Si la capa no está en caché, cárgala y almacénala en caché
        fetch(url)
          .then((response) => response.json())
          .then((geojsonData) => {
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
            cachedLayers.current[layerId] = vectorLayer; // Almacena la capa en caché
          })
          .catch((error) => {
            console.error(`Error loading GeoJSON data for ${layerId}:`, error);
          });
      }
    },
    []
  );

  const loadDataAndCreateLayerFromUrl = useCallback(
    (url, styleFunction, layerId, visibility) => {
      fetch(api_url + "geojson-from-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
        .then((response) => response.json())
        .then((geojsonData) => {
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
            `Error loading GeoJSON data from URL for ${layerId}:`,
            error
          );
        });
    },
    []
  );

  const styleFunctionResguardos = useCallback((feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({ color: "rgba(255, 255, 255, 0.6)" }),
      stroke: new ol.style.Stroke({ color: "#319FD3", width: 1 }),
      text: new ol.style.Text({
        text: feature.get("NOMBRE"),
        fill: new ol.style.Fill({ color: "#000" }),
        stroke: new ol.style.Stroke({ color: "#fff", width: 3 }),
        font: "24px Calibri,sans-serif",
      }),
    });
  }, []);

  const styleFunctionDepartamentos = useCallback((feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({ color: "rgba(255, 255, 255, 0.6)" }),
      stroke: new ol.style.Stroke({ color: "#319FD3", width: 1 }),
      text: new ol.style.Text({
        text: feature.get("DeNombre"),
        fill: new ol.style.Fill({ color: "#000" }),
        stroke: new ol.style.Stroke({ color: "#fff", width: 3 }),
        font: "24px Calibri,sans-serif",
      }),
    });
  }, []);

  const styleFunctionMpios = useCallback((feature) => {
    return new ol.style.Style({
      fill: new ol.style.Fill({ color: "rgba(255, 255, 255, 0.6)" }),
      stroke: new ol.style.Stroke({ color: "#319FD3", width: 1 }),
      text: new ol.style.Text({
        text: feature.get("MpNombre"),
        fill: new ol.style.Fill({ color: "#000" }),
        stroke: new ol.style.Stroke({ color: "#fff", width: 3 }),
        font: "24px Calibri,sans-serif",
      }),
    });
  }, []);

  const loadLayers = useCallback(() => {
    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/process_geojson",
      styleFunctionResguardos,
      "Resguardos",
      isLayerVisible["Resguardos"]
    );

    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/lim_geojson",
      styleFunctionDepartamentos,
      "Departamentos",
      isLayerVisible["Departamentos"]
    );

    loadDataAndCreateLayer(
      "http://127.0.0.1:5000/res_geojson",
      styleFunctionMpios,
      "Mpiosparticipación",
      isLayerVisible["Mpiosparticipación"]
    );

    loadDataAndCreateLayerFromUrl(
      "https://cromeroo.github.io/Capas/A1.geojson",
      styleFunctionMpios,
      "A12",
      isLayerVisible["A12"]
    );
  }, [
    loadDataAndCreateLayer,
    loadDataAndCreateLayerFromUrl,
    styleFunctionResguardos,
    styleFunctionDepartamentos,
    styleFunctionMpios,
    isLayerVisible,
  ]);

  useEffect(() => {
    loadLayers();
  }, [loadLayers]);

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

  const sendPolygonToServer = useCallback((coordinates) => {
    let endpoint;

    switch (layerTypeRef.current) {
      case "coords":
        endpoint = "coords";
        break;
      case "precipitation":
        endpoint = "precipitation";
        break;
      case "prueba":
        endpoint = "prueba";
        break;
      case "process_s2_images":
        endpoint = "process_s2_images";
        break;
      default:
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

          mapRef.current.addLayer(vectorLayer);
        } else {
          console.error("Formato de respuesta no reconocido:", data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const addTileServerURL = useCallback((url, layerID) => {
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
    const uniqueLayerID = `${layerID}-${Date.now()}`;
    geeLayer.set("id", uniqueLayerID);
    console.log("Creando capa con ID:", uniqueLayerID, geeLayer);

    mapRef.current.addLayer(geeLayer);
  }, []);

  const setLayerVisibilityByOption = useCallback((option, isVisible) => {
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
  }, []);

  useEffect(() => {
    if (layersVisibility) {
      Object.keys(layersVisibility).forEach((option) => {
        console.log(
          `Actualizando visibilidad para ${option}: ${layersVisibility[option]}`
        );
        setLayerVisibilityByOption(option, layersVisibility[option]);
      });
    }
  }, [layersVisibility, setLayerVisibilityByOption]);

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
}

export default MapComponent;
