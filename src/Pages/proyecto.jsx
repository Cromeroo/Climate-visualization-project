import { useEffect, useState } from "react";
import { getContenido } from "../services/section";
import Section from "../components/SectionData/Section";

function Proyecto() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContenido("proyecto")
      .then((data) => {
        // Si tu backend devuelve [{tipo, contenido}], puedes mapearlo a {title, content}
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
    </div>
  );
}

export default Proyecto;
