import React, { useEffect } from 'react';

const TomorrowWeatherWidget = () => {
  useEffect(() => {
    const id = 'tomorrow-sdk';

    if (document.getElementById(id)) {
      // Si el script ya está presente, intenta renderizar el widget
      if (window.__TOMORROW__) {
        window.__TOMORROW__.renderWidget();
      }
      return;
    }

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');

    js.id = id;
    js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
    fjs.parentNode.insertBefore(js, fjs);

    // Limpieza: eliminar el script al desmontar el componente
    return () => {
      js.parentNode.removeChild(js);
    };
  }, []);

  return (
    <div className="tomorrow"
      data-location-id=""
      data-language="ES"
      data-unit-system="METRIC"
      data-skin="dark"
      data-widget-type="upcoming"
      style={{ paddingBottom: '8px', position: 'relative' }}>
      <a
        href="https://www.tomorrow.io/weather-api/"
        rel="nofollow noopener noreferrer"
        target="_blank"
        style={{ position: 'absolute', bottom: '0', transform: 'translateX(-50%)', left: '50%' }}>
        <img
          alt="Powered by the Tomorrow.io Weather API"
          src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
          width="250"
          height="18"
        />
      </a>
    </div>
  );
};

export default TomorrowWeatherWidget;
