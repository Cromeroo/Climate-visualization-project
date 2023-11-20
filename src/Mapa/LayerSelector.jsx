import React, { useState } from 'react';



function LayerSelector({ layerType, changeLayer }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  return (
    <div className="toolbox p-3 border rounded position-absolute start-1 translate-middle-y">
      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-9">
        <label className="form-label">Capa:</label>
        <div className="col-9"> </div>

          <select className="form-select"  onChange={changeLayer} value={layerType}>
             <option value="coords">Coordenadas</option>
             <option value="precipitation">Precipitación</option>
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
    </div>
  );
}

export default LayerSelector;
