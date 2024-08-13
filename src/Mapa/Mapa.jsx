import React, { useEffect, useRef, useCallback } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

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
        center: ol.proj.fromLonLat([-77.0197, 2.7738]), // Simplificación con fromLonLat
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
        cachedLayers.current[layerId].setVisible(visibility);
      } else {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Error loading GeoJSON data for ${layerId}: ${response.statusText}`
              );
            }
            return response.json();
          })
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
            cachedLayers.current[layerId] = vectorLayer;
          })
          .catch((error) => {
            console.error(`Error loading GeoJSON data for ${layerId}:`, error);
          });
      }
    },
    []
  );

  const sendPolygonToServer = useCallback((coordinates) => {
    const endpoints = {
      coords: "coords",
      precipitation: "precipitation",
      prueba: "prueba",
      process_s2_images: "process_s2_images",
    };

    const endpoint = endpoints[layerTypeRef.current];
    if (!endpoint) {
      console.error("Tipo de capa desconocido:", layerTypeRef.current);
      return;
    }

    fetch(`${api_url}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.url) {
          addTileServerURL(data.url, endpoint);
        } else if (data.type === "FeatureCollection") {
          const vectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(data, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            }),
          });

          const vectorLayer = new ol.layer.Vector({
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

    const geeLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({ url }),
      opacity: 0.7,
    });

    geeLayer.set("id", `${layerID}-${Date.now()}`);
    mapRef.current.addLayer(geeLayer);
  }, []);

  const setLayerVisibilityByOption = useCallback((option, isVisible) => {
    mapRef.current
      .getLayers()
      .getArray()
      .forEach((layer) => {
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
        setLayerVisibilityByOption(option, layersVisibility[option]);
      });
    }
  }, [layersVisibility, setLayerVisibilityByOption]);

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
}

export default MapComponent;
