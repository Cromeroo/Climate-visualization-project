import "./Biodiversidad.css";
import { useEffect, useState } from "react";
import { getContenido } from "../../services/section";
import Section from "../../components/SectionData/Section";

function Biodiversidad() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    getContenido("biodiversidad")
      .then((data) => {
        setSections(
          data.map((item) => ({
            title: item.tipo,
            content: item.contenido,
            // image: item.image, // si tienes imágenes en la BD
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleProducts = () => setShowProducts((s) => !s);

  console.log("Componente Biodiversidad renderizado");

  if (loading) return <div>Cargando...</div>;

  const insertIndex = Math.floor((sections.length - 1) / 2);

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index}>
          <Section
            title={section.title}
            content={section.content}
            image={section.image}
          />

          {index === insertIndex && (
            <div
              style={{
                padding: 20,
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                margin: "20px 0",
                borderRadius: 8,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                onClick={toggleProducts}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleProducts();
                }}
                role="button"
                tabIndex={0}
                style={{
                  fontSize: 24,
                  maxWidth: "60ch",
                  margin: "0 auto",
                  color: "#8b0000",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                ¿Adivinas qué más se produce?
              </h2>
              <div style={{ height: 18 }} />

              {showProducts && (
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    textAlign: "justify",
                    color: "#333",
                    maxWidth: "100ch",
                    fontSize: 18,
                    padding: "0 20px",
                    margin: "1rem auto 0",
                  }}
                >
                  Ajo, Espinaca, Arracacha, Caléndula, Col, Brócoli, tomate de
                  árbol, uchuva, alegría, quinua, flor de estrella, orégano,
                  durazno, pronto alivio, romero, tomillo, acelga, frijol,
                  calabaza o mexicano, maíz, claveles, fresa, menta, café,
                  banano, plátano, yuca, piña, coca, yahe, guama, achiote,
                  naranja, mandarina, limón, mango, caña de panela, tomate
                  cherry, zapallo, guayaba, arbolito, zanahoria, ruda, paico,
                  curuba, aguacate, remolacha, cedrón, hierbabuena, cilantro,
                  linaza, toronjil, mejorana, diente de león, altamisa, pera,
                  níspero, cúrcuma.
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Sección estática reutilizando el componente Section para tipografía y estilo */}
    </div>
  );
}

export default Biodiversidad;
