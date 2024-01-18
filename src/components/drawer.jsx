import React, { useState } from 'react';
import Imagen3 from '../images/imagenes3.png'
const TextSlider = () => {
  const textos = [  <div className="cont">
  <h2 className="text-center h2-style"> Experiencias de Adaptación y Mitigación a la Variabilidad Climática</h2>
  <p className="text-justify p-style ">
  Plataformas Digitales y Redes Sociales: En la era digital, las plataformas en línea y las redes sociales se han convertido en herramientas poderosas para compartir experiencias y conocimientos sobre la adaptación y mitigación de la variabilidad climática. Estas plataformas permiten a individuos, comunidades y organizaciones de todo el mundo intercambiar información sobre estrategias exitosas, desafíos y soluciones innovadoras. Por ejemplo, los foros en línea y los grupos de redes sociales dedicados a la sostenibilidad y el cambio climático facilitan la colaboración y el aprendizaje colectivo. Además, las redes sociales pueden amplificar las voces locales, permitiendo que experiencias de adaptación de comunidades vulnerables alcancen una audiencia global, aumentando así la conciencia y fomentando un diálogo más inclusivo.  
  </p>
  <img src={Imagen3} className="cont"/>

</div>, 
  
  
  <div className="cont">
  <h2 className="text-center h2-style"> Experiencias de Adaptación y Mitigación a la Variabilidad Climática</h2>
  <p className="text-justify p-style ">
  Herramientas de Mapeo y Visualización de Datos: La visualización de datos a través de herramientas de mapeo es esencial para comprender y comunicar la complejidad de la variabilidad climática y sus impactos. Estas herramientas permiten a los usuarios visualizar tendencias climáticas, patrones de riesgo y áreas de vulnerabilidad. Por ejemplo, los Sistemas de Información Geográfica (GIS) se utilizan para mapear eventos climáticos extremos y sus efectos, ayudando a identificar áreas que requieren adaptación urgente o donde las estrategias de mitigación han sido efectivas. Además, plataformas interactivas en línea que ofrecen acceso a mapas climáticos y modelos predictivos pueden ser utilizadas por planificadores urbanos, agricultores y científicos para tomar decisiones informadas basadas en datos.  </p>
</div>, 
  
  
  
  <div className="cont">
  <h2 className="text-center h2-style"> Experiencias de Adaptación y Mitigación a la Variabilidad Climática</h2>
  <p className="text-justify p-style ">
  Conferencias, Talleres y Publicaciones Científicas: Las conferencias y talleres internacionales brindan una plataforma para que expertos y practicantes compartan sus experiencias y conocimientos sobre adaptación y mitigación. Estos eventos fomentan la colaboración interdisciplinaria y ofrecen oportunidades para que los participantes aprendan de casos de estudio y prácticas exitosas de diferentes partes del mundo. Además, las publicaciones científicas y los informes de investigación juegan un papel crucial en la diseminación de conocimiento especializado. Estos recursos proporcionan una base de evidencia sólida sobre la efectividad de diversas estrategias de adaptación y mitigación, permitiendo que la comunidad global de cambio climático construya sobre el conocimiento existente y desarrolle soluciones más robustas y efectivas.
</p>
</div>, ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextText = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % textos.length);
  };

  const goToPreviousText = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + textos.length) % textos.length);
  };

  return (
    <div className="text-slider-container">
      <button className="arrow-button" onClick={goToPreviousText}>&lt;</button>
      <div className="text-slider-content">{textos[currentIndex]}</div>
      <button className="arrow-button" onClick={goToNextText}>&gt;</button>
    </div>
  );
};

export default TextSlider;
