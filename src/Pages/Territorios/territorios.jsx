import { useEffect, useState } from "react";
import { getContenido } from "../../services/section";
import Section from "../../components/SectionData/Section";
import Carousel from "../../components/Carousel_Img/Carousel";
import {
  caucaImages,
  narinoImages,
} from "../../components/Carousel_Img/images";

function Territorios() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContenido("territorios")
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

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          content={section.content}
          image={section.image}
        />
      ))}
      <div className="dIwRPW">
        <h2 style={{ color: "#2c3e50" }}>
          En Cauca, se co-crea con los resguardos de Guambia y el de Ambaló.
        </h2>
        <Carousel images={caucaImages} />
      </div>

      <div className="dIwRPW">
        <h2 style={{ color: "#2c3e50" }}>
          En Nariño, con la comunidad de los Pastos, en los municipios:
          Guachucal, Cumbal y Contadero.
        </h2>
        <Carousel images={narinoImages} />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
          fontSize: "14px",
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        <p>
          Tomado de: <br />
          Primer Reporte Técnico 1 de septiembre 2022 – 28 de febrero de 2023
          “Transformando los sistemas alimentarios para mejorar los medios de
          vida y la sostenibilidad ambiental en dos territorios indígenas de
          Colombia -Territorio, comida y vida-”. Número de proyecto IDRC
          109946-001. Presentado el 28 de febrero de 2023.
          <br />
          Registros fotográficos de las actividades en campo. Informe mensual
          2023.
        </p>
      </div>
    </div>
  );
}

export default Territorios;
