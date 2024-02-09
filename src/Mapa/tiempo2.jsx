import React, { useEffect } from 'react';

const NewWeatherWidget = () => {
  useEffect(() => {
    // Crea un elemento script
    const script = document.createElement('script');

    // Configura los atributos para el script
    script.src = 'https://app2.weatherwidget.org/js/?id=ww_c12554a46419b';
    script.async = true;

    // Añade el script al body del documento
    document.body.appendChild(script);

    // Limpieza al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="ww_c12554a46419b" v='1.3' loc='auto' a='{"t":"responsive","lang":"es","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}' dangerouslySetInnerHTML={{ __html: `Más previsiones: <a href="https://oneweather.org/es/buenos_aires/25_days/" id="ww_c12554a46419b_u" target="_blank">Tiempo extendido en Buenos Aires 25 dias</a>` }}>
    </div>
  );
};

export default NewWeatherWidget;
