import React, { useEffect } from 'react';

export default function Map() {

  useEffect(() => {
    loadMap('map', ol.proj.transform([-122, 37], 'EPSG:4326', 'EPSG:3857'), 10); 
    test();
  }, []);

  const test = () => {
    $.ajax({
      url: api_url + "test",
      type: "POST",
      async: true,
      crossDomain: true,
      contentType: "application/json",
      data: JSON.stringify({})
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      fail(jqXHR, textStatus, errorThrown);
    })  
    .done((data) => {
      addMapLayer(data);
    });
  }

  return (
    <div id="map"></div>
  );

}