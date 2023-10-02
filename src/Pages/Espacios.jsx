import React from 'react';
import Mapa from '../Mapa/Mapa';

function HomePage() {
  return (
    <div>
      <div className="p-4 border rounded">
        <Mapa />
      </div>
      <div className="cont">
        <h2 className="text-center h2-style">La importancia de los sistemas agroalimentarios</h2>
        <p className="text-justify p-style ">
          Los sistemas agroalimentarios son fundamentales para la nutrición y la salud de las personas y el planeta. Desempeñan un papel crucial en la economía, empleando a una gran cantidad de personas y siendo una fuente esencial de desarrollo y crecimiento económico. Sin embargo, también tienen el potencial de impactar negativamente en el medio ambiente a través de la emisión de gases de efecto invernadero, la deforestación y la pérdida de biodiversidad. Por lo tanto, es esencial que trabajemos hacia sistemas agroalimentarios sostenibles que proporcionen alimentos saludables y nutritivos para todos, mientras protegemos el medio ambiente.
        </p>
      </div>
    </div>
  );
}

export default HomePage;

