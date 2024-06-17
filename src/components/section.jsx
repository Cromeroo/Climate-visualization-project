import React from 'react';
import { IoMapSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GiTeamIdea } from "react-icons/gi";


 function section () {
return(
    <section id="section-platform" className="section" >
    <div className="container">
        <h2 className="section-title text-white">Plataforma de Mapas y Datos</h2>
        <div className="row">
            <div className="col-6 col-md-3">
                <div className="card-icon">
                    <div className="card-icon-image">
                    <IconContext.Provider value={{ size: "120px" }}>
                    <IoMapSharp />
                    </IconContext.Provider>

                    </div>
                    <p>Cobertura</p>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="card-icon">
                    <div className="card-icon-image">
                    <IconContext.Provider value={{ size: "120px" }}>
                    <TiWeatherPartlySunny />
                    </IconContext.Provider>

                    </div>
                    <p>Datos Climaticos </p>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="card-icon">
                    <div className="card-icon-image">
                    <IconContext.Provider value={{ size: "120px" }}>
                    <GiTeamIdea />
                    </IconContext.Provider>
                    </div>
                    <p>Estadísticas</p>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="card-icon">
                    <div className="card-icon-image">
                        <img src="https://amazonia.mapbiomas.org/wp-content/themes/mapbiomas/assets/images/icon-quality.svg"/>
                    </div>
                    <p>Calidad</p>
                </div>
            </div>
        </div>
    </div>
</section>
    
    )
    
}
export default section;