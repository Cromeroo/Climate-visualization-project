// Toolbox.jsx
import React, { useState } from 'react';

function Toolbox({ onLayerSelect }) {
    
    const [selectedLayer, setSelectedLayer] = useState(''); // Inicializado como una cadena vacía
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    
    // Esta función se llama cada vez que se selecciona una nueva capa en el dropdown.
    const handleLayerChange = (event) => {
        const layer = event.target.value;
        setSelectedLayer(layer);
        onLayerSelect(layer); // Añade esta línea

        console.log(`Layer type changed to: ${event.target.value}`); // Debería mostrar el tipo de capa actualizado

    };

    return (
        <div className="toolbox p-3 border rounded position-absolute start-1 translate-middle-y">
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-9">
                    <label className="form-label">Capa:</label>
                    <select className="form-select" value={selectedLayer} onChange={handleLayerChange}>
                        <option value="">Seleccione una capa</option>
                        <option value="coords">Coordenadas</option>
                        <option value="precipitation">Precipitación</option>
                        {/* Aquí puedes añadir más opciones de capas según sea necesario */}
                    </select>
                </div>
            </div>
            <hr />
            <div className="row mb-3 justify-content-center">
                <div className="col-9">
                    <label className="form-label">Fecha Inicial:</label>
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-9">
                    <label className="form-label">Fecha Final:</label>
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            {/* Puedes añadir más controles de interfaz de usuario según sea necesario */}
        </div>
    );
}

export default Toolbox;
