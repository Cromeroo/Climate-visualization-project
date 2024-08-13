import React, { useState, useEffect } from "react";
import Map from "../../Mapa/Map";
import LayerSelector2 from "../../Mapa/LayerSelector2";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Section from "../../components/section";
import Contribu from "../../components/Contributors/contribu";

function Variabilidad() {
  const [layerType, setLayerType] = useState("coords");
  const [showLayerSelector, setShowLayerSelector] = useState(false);

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };

  const [layersVisibility, setLayersVisibility] = useState({
    precipitation: false,
    prueba: false,
  });

  const [isLayerVisible, setIsLayerVisible] = useState({
    Resguardos: false,
    Departamentos: false,
    Mpiosparticipación: false,
    A1: false,
    A12: false,
    A1ssp126: false,
    A12ssp126: false,
    A1ssp245: false,
    A12ssp245: false,
    A1ssp370: false,
    A12ssp370: false,
    A1ssp585: false,
    A12ssp585: false,
  });

  const handleVisibilityChange = (layerId, isVisible) => {
    setLayersVisibility((prevState) => ({
      ...prevState,
      [layerId]: isVisible,
    }));
  };

  const toggleLayerSelector = () => {
    setShowLayerSelector(!showLayerSelector);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowLayerSelector(!(window.innerWidth <= 1200));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="contenedor">
        {showLayerSelector && (
          <div className="layer-selector">
            <LayerSelector2
              layerType={layerType}
              changeLayer={changeLayer}
              isLayerVisible={isLayerVisible}
              setIsLayerVisible={setIsLayerVisible}
              layersVisibility={layersVisibility}
              onVisibilityChange={handleVisibilityChange}
            />
          </div>
        )}
        <div
          className="p-2 border rounded map-container"
          style={{ width: "80%", marginLeft: "10%", position: "relative" }}
        >
          <IconButton
            onClick={toggleLayerSelector}
            style={{
              position: "absolute",
              zIndex: 1000,
              top: "10px",
              right: "10px",
              color: "#8B0000",
            }}
          >
            <InfoIcon />
          </IconButton>
          <Map
            layerType={layerType}
            isLayerVisible={isLayerVisible}
            layersVisibility={layersVisibility}
          />
        </div>
      </div>
    </>
  );
}

export default Variabilidad;
