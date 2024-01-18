import React, { useState } from 'react';

function TimeSeriesIndexComponent() {
    const [imageName, setImageName] = useState('');
    const [drawnPolygon, setDrawnPolygon] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [bandSelector, setBandSelector] = useState('');
    const [reducer, setReducer] = useState('');
    const [scale, setScale] = useState('');

    const timeSeriesIndex = async () => {
        const theJson = {
            collectionNameTimeSeries: imageName,
            geometry: JSON.parse(drawnPolygon),
            dateFromTimeSeries: fromDate,
            dateToTimeSeries: toDate,
            indexName: bandSelector,
            reducer: reducer,
            scale: scale,
        };

        try {
            const response = await fetch(api_url + 'timeSeriesIndex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(theJson)
            });

            const data = await response.json();
            if (data.errMsg) {
                console.info(data.errMsg);
            } else {
                if (data.hasOwnProperty("timeseries")) {
                    createChart('timeSeriesIndex', data.timeseries); // Asegúrate de que createChart esté definido
                } else {
                    console.warn("Wrong Data Returned");
                    console.log(data);
                }
            }
        } catch (error) {
            console.warn(error);
            // Manejar el error
        }
    };

    return (
        <div>
 <h2 className="text-center h2-style">Historico de Datos</h2>

        <div className="container mt-4 p-4 border rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <div id="chartContainer" style={{ width: '40%', height: '200px' }}>
                {/* Aquí se renderizará la gráfica */}
            </div>
        </div>
        </div>
    );
}

export default TimeSeriesIndexComponent;
