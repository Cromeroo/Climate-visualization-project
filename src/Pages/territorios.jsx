import React, { useState } from 'react';
import Mapa from '../Mapa/Mapa';
import LayerSelector from '../Mapa/LayerSelector';
import Drawer from '../components/drawert';
function ParentComponent() {
  const [layerType, setLayerType] = useState('coords');

  const changeLayer = (event) => {
    setLayerType(event.target.value);
  };
  const SlideOne = () =><div className="cont">
  <h2 className="text-center h2-style"> Experiencias de Adaptación y Mitigación a la Variabilidad Climática</h2>
  <p className="text-justify p-style ">
  Conferencias, Talleres y Publicaciones Científicas: Las conferencias y talleres internacionales brindan una plataforma para que expertos y practicantes compartan sus experiencias y conocimientos sobre adaptación y mitigación. Estos eventos fomentan la colaboración interdisciplinaria y ofrecen oportunidades para que los participantes aprendan de casos de estudio y prácticas exitosas de diferentes partes del mundo. Además, las publicaciones científicas y los informes de investigación juegan un papel crucial en la diseminación de conocimiento especializado. Estos recursos proporcionan una base de evidencia sólida sobre la efectividad de diversas estrategias de adaptación y mitigación, permitiendo que la comunidad global de cambio climático construya sobre el conocimiento existente y desarrolle soluciones más robustas y efectivas.
</p></div>;
  const SlideTwo = () => <div>Your Slide Two Content</div>;
  const SlideThree = () => <div>Your Slide Three Content</div>;
  const slides = [SlideOne, SlideTwo, SlideThree];


  return (
    <>
      <div className="p-4 border rounded bdy2">
      <Mapa layerType={layerType} />

      <LayerSelector layerType={layerType} changeLayer={changeLayer} />
    
      </div>
      <Drawer components={slides} intervalDuration={3000}/>
      
    </>
  );
}

export default ParentComponent;
