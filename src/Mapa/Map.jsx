import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import { Style, Fill, Stroke, Text } from "ol/style";

function MapComponent({ isLayerVisible }) {
  const mapRef = useRef(null);
  const cachedLayers = useRef({});

  useEffect(() => {
    const raster = new TileLayer({ source: new OSM() });

    mapRef.current = new Map({
      layers: [raster],
      target: "map",
      view: new View({
        center: transform([-77.8033, 1.3311], "EPSG:4326", "EPSG:3857"),
        zoom: 10,
      }),
    });
  }, []);

  const getColorForValue = (value, rules) => {
    for (const rule of rules) {
      if (value >= rule.threshold) {
        return rule.color;
      }
    }
    return rules[rules.length - 1].color;
  };

  const colorRulesA1 = [
    { threshold: 23.3, color: "rgba(139, 0, 0, 0.8)" },
    { threshold: 19.9, color: "rgba(220, 20, 60, 0.8)" },
    { threshold: 16.2, color: "rgba(255, 99, 71, 0.8)" },
    { threshold: 11.8, color: "rgba(255, 160, 122, 0.8)" },
    { threshold: 0, color: "rgba(255, 182, 193, 0.8)" },
  ];

  const colorRulesA12 = [
    { threshold: 3029.0, color: "rgba(0, 0, 139, 0.8)" },
    { threshold: 2036.1, color: "rgba(0, 0, 205, 0.8)" },
    { threshold: 1658.1, color: "rgba(30, 144, 255, 0.8)" },
    { threshold: 1513.1, color: "rgba(135, 206, 235, 0.8)" },
    { threshold: 0, color: "rgba(173, 216, 230, 0.8)" },
  ];

  const createStyleFunctionForValue = (rules) => (feature) => {
    const value = feature.get("value");
    const color = getColorForValue(value, rules);

    return new Style({
      fill: new Fill({ color }),
      stroke: new Stroke({ color: "#319FD3", width: 1 }),
      text: new Text({
        text: value ? value.toFixed(1) : "",
        fill: new Fill({ color: "#000" }),
        stroke: new Stroke({ color: "#fff", width: 3 }),
        font: "14px Calibri,sans-serif",
      }),
    });
  };

  const createStyleFunction = useCallback(
    (property) => (feature) =>
      new Style({
        fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
        stroke: new Stroke({ color: "#319FD3", width: 1 }),
        text: new Text({
          text: feature.get(property),
          fill: new Fill({ color: "#000" }),
          stroke: new Stroke({ color: "#fff", width: 3 }),
          font: "24px Calibri,sans-serif",
        }),
      }),
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
              visible: visibility,
            });

            // Asignar manualmente el id como propiedad
            vectorLayer.set("id", layerId);

            if (!mapRef.current) return;
            mapRef.current.addLayer(vectorLayer);
            cachedLayers.current[layerId] = vectorLayer;
          })
          .catch((error) =>
            console.error(
              `Error loading GeoJSON from ${url} (layerId: ${layerId}):`,
              error
            )
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
  }, [isLayerVisible, createStyleFunction, loadDataAndCreateLayer]);

  useEffect(() => {
    loadLayers();
  }, [loadLayers]);

  return <div id="map" style={{ width: "100%", height: "600px" }} />;
}

MapComponent.propTypes = {
  isLayerVisible: PropTypes.object.isRequired,
};

export default MapComponent;
