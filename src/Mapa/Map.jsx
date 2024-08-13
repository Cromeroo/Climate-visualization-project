import React, { useEffect, useRef, useCallback } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import { Style, Fill, Stroke, Text } from "ol/style";

function MapComponent({ layerType, isLayerVisible }) {
  const mapRef = useRef(null);
  const cachedLayers = useRef({});

  useEffect(() => {
    const raster = new TileLayer({ source: new OSM() });

    mapRef.current = new Map({
      layers: [raster],
      target: "map",
      view: new View({
        center: transform([-77.0197, 2.7738], "EPSG:4326", "EPSG:3857"),
        zoom: 8,
      }),
    });
  }, []);

  // Función para obtener el color basado en el valor y las reglas
  const getColorForValue = (value, rules) => {
    for (const rule of rules) {
      if (value >= rule.threshold) {
        return rule.color;
      }
    }
    return rules[rules.length - 1].color; // Color por defecto si no se cumple ninguna regla
  };

  // Reglas para A1
  const colorRulesA1 = [
    { threshold: 23.3, color: "rgba(139, 0, 0, 0.8)" }, // Rojo oscuro
    { threshold: 19.9, color: "rgba(220, 20, 60, 0.8)" }, // Rojo
    { threshold: 16.2, color: "rgba(255, 99, 71, 0.8)" }, // Tomate
    { threshold: 11.8, color: "rgba(255, 160, 122, 0.8)" }, // Salmón claro
    { threshold: 0, color: "rgba(255, 182, 193, 0.8)" }, // Rosa claro
  ];

  // Reglas para A12
  const colorRulesA12 = [
    { threshold: 3029.0, color: "rgba(0, 0, 139, 0.8)" }, // Azul oscuro
    { threshold: 2036.1, color: "rgba(0, 0, 205, 0.8)" }, // Azul medio
    { threshold: 1658.1, color: "rgba(30, 144, 255, 0.8)" }, // Azul dodger
    { threshold: 1513.1, color: "rgba(135, 206, 235, 0.8)" }, // Azul cielo claro
    { threshold: 0, color: "rgba(173, 216, 230, 0.8)" }, // Azul claro
  ];

  // Función de estilo para capas basada en el valor y las reglas
  const createStyleFunctionForValue = (rules) => (feature) => {
    const value = feature.get("value");
    const color = getColorForValue(value, rules);

    return new Style({
      fill: new Fill({ color: color }),
      stroke: new Stroke({ color: "#319FD3", width: 1 }),
      text: new Text({
        text: value ? value.toFixed(1) : "",
        fill: new Fill({ color: "#000" }),
        stroke: new Stroke({ color: "#fff", width: 3 }),
        font: "14px Calibri,sans-serif",
      }),
    });
  };

  // Función de estilo general para otras capas
  const createStyleFunction = useCallback(
    (property) => (feature) => {
      return new Style({
        fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
        stroke: new Stroke({ color: "#319FD3", width: 1 }),
        text: new Text({
          text: feature.get(property),
          fill: new Fill({ color: "#000" }),
          stroke: new Stroke({ color: "#fff", width: 3 }),
          font: "24px Calibri,sans-serif",
        }),
      });
    },
    []
  );

  const loadDataAndCreateLayer = useCallback(
    (url, styleFunction, layerId, visibility) => {
      if (cachedLayers.current[layerId]) {
        cachedLayers.current[layerId].setVisible(visibility);
      } else {
        fetch(url)
          .then((response) => response.json())
          .then((geojsonData) => {
            const vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojsonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
              }),
            });

            const vectorLayer = new VectorLayer({
              source: vectorSource,
              style: styleFunction,
              id: layerId,
              visible: visibility,
            });

            mapRef.current.addLayer(vectorLayer);
            cachedLayers.current[layerId] = vectorLayer;
          })
          .catch((error) =>
            console.error(`Error loading GeoJSON data for ${layerId}:`, error)
          );
      }
    },
    []
  );

  const layersData = [
    {
      url: "https://cromeroo.github.io/Capas/resguardos.geojson",
      property: "NOMBRE",
      id: "Resguardos",
    },
    {
      url: "https://cromeroo.github.io/Capas/LimiteDep.geojson",
      property: "DeNombre",
      id: "Departamentos",
    },
    {
      url: "https://cromeroo.github.io/Capas/Mparticipación.geojson",
      property: "MpNombre",
      id: "Mpiosparticipación",
    },
    {
      url: "https://cromeroo.github.io/Capas/A1.geojson",
      property: "MpNombre",
      id: "A1",
    },
    {
      url: "https://cromeroo.github.io/Capas/A12.geojson",
      property: "MpNombre",
      id: "A12",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp126/A1.geojson",
      property: "MpNombre",
      id: "A1ssp126",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp126/A12.geojson",
      property: "MpNombre",
      id: "A12ssp126",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp245/A1.geojson",
      property: "MpNombre",
      id: "A1ssp245",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp245/A12.geojson",
      property: "MpNombre",
      id: "A12ssp245",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp370/A1.geojson",
      property: "MpNombre",
      id: "A1ssp370",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp370/A12.geojson",
      property: "MpNombre",
      id: "A12ssp370",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp585/A1.geojson",
      property: "MpNombre",
      id: "A1ssp585",
    },
    {
      url: "https://cromeroo.github.io/Capas/ssp585/A12.geojson",
      property: "MpNombre",
      id: "A12ssp585",
    },
  ];

  const loadLayers = useCallback(() => {
    layersData.forEach(({ url, property, id }) => {
      const styleFunction = /^A1(?!2)/.test(id)
        ? createStyleFunctionForValue(colorRulesA1)
        : /^A12/.test(id)
        ? createStyleFunctionForValue(colorRulesA12)
        : createStyleFunction(property);

      loadDataAndCreateLayer(url, styleFunction, id, isLayerVisible[id]);
    });
  }, [isLayerVisible, createStyleFunction]);

  useEffect(() => {
    loadLayers();
  }, [loadLayers]);

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
}

export default MapComponent;
