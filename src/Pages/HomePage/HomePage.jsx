import React, { useState, useEffect } from "react";
import Mapa from "../../Mapa/Mapa";
import LayerSelector from "../../Mapa/LayerSelector";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Section from "../../components/section";
import Contribu from "../../components/Contributors/contribu";
import "./HomePage.css";

function HomePage() {
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
            <LayerSelector
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
          <Mapa
            layerType={layerType}
            isLayerVisible={isLayerVisible}
            layersVisibility={layersVisibility}
          />
        </div>
      </div>

      <div>
        <Section />
      </div>
      <div>
        <Contribu />
      </div>
    </>
  );
}

export default HomePage;
