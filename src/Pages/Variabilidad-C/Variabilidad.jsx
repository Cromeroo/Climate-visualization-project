import { useState, useEffect } from "react";
import Map from "../../Mapa/Map";
import LayerSelector2 from "../../Mapa/LayerSelector2";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

// --- INICIO: Importaciones para cargar datos ---
import { getContenido } from "../../services/section";
import Section from "../../components/SectionData/Section";
// --- FIN: Importaciones para cargar datos ---

function Variabilidad() {
  // --- Estados para el mapa (se mantienen igual) ---
  const [layerType, setLayerType] = useState("coords");
  const [showLayerSelector, setShowLayerSelector] = useState(false);
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

  // Estado para mostrar/ocultar el aviso informativo
  const [showInfo, setShowInfo] = useState(true);

  // --- INICIO: Estados para los datos del backend ---
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  // --- FIN: Estados para los datos del backend ---

  // Funciones para el mapa
  const handleVisibilityChange = (layerId, isVisible) => {
    setLayersVisibility((prevState) => ({
      ...prevState,
      [layerId]: isVisible,
    }));
  };

  const toggleLayerSelector = () => {
    setShowLayerSelector(!showLayerSelector);
  };

  // useEffect para el responsive del selector de capas (se mantiene igual)
  useEffect(() => {
    const handleResize = () => {
      setShowLayerSelector(!(window.innerWidth <= 1200));
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a la función al inicio para establecer el estado inicial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- INICIO: useEffect para cargar datos del backend ---
  useEffect(() => {
    getContenido("variabilidad") // Usamos "variabilidad" como el label
      .then((data) => {
        setSections(
          data.map((item) => ({
            title: item.tipo,
            content: item.contenido,
            image: item.image, // Descomenta si la BD devuelve imágenes
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
        setLoading(false);
      });
  }, []);
  // --- FIN: useEffect para cargar datos del backend ---

  return (
    <>
      {/* Aviso informativo con IconButton embebido */}
      {showInfo && (
        <div
          className="alert alert-info d-flex align-items-center"
          style={{
            maxWidth: 1200,
            margin: "30px auto 0 auto",
            position: "relative",
            boxShadow: "0 2px 8px #0002",
            borderRadius: "8px",
            paddingRight: 40,
          }}
        >
          <span style={{ flex: 1 }}>
            Para visualizar los datos de clima, haga click en{" "}
            <IconButton
              onClick={toggleLayerSelector}
              size="small"
              style={{
                verticalAlign: "middle",
                color: "#8B0000",
                margin: "0 2px",
                padding: 2,
              }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
            y seleccione las capas de interés. Las definiciones de cada capa
            están disponibles en las notas a continuación.
          </span>
          <IconButton
            onClick={() => setShowInfo(false)}
            size="small"
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              color: "#888",
            }}
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59L7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4"
              />
            </svg>
          </IconButton>
        </div>
      )}

      {/* Contenedor del Mapa y Selector de Capas */}
      <div className="contenedor">
        {showLayerSelector && (
          <div className="layer-selector">
            <LayerSelector2
              layerType={layerType}
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

      {/* Contenedor para las secciones cargadas del backend */}
      <div style={{ marginTop: "40px" }}>
        {loading ? (
          <div>Cargando contenido...</div>
        ) : (
          sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
              image={section.image}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Variabilidad;
