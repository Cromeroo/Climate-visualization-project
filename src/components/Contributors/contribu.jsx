import React from "react";
import logo from "../../assets/images/logoTCVR.png";
import ImageSection from "./ImageSection";
import "./contributors.css";

const contributors = () => {
  return (
    <section id="section-support" className="section">
      <div className="container">
        <h2 className="section-title title-dark">
          Iniciativa Territorio, Comida y Vida
        </h2>
        <img
          className="img-fluid custom-img-style"
          src={logo}
          alt="MapBiomas"
        />
        <div className="w-75 mx-auto">
          <p className="text-center">
            Como parte de esta iniciativa en la que participa la Universidad
            Nacional de Colombia (UNAL), a partir de un trabajo conjunto con las
            comunidades indígenas y campesinas en Cauca y Nariño, el cual busca
            “superar la inseguridad alimentaria que viven 8 de cada 10 familias
            indígenas en el país
          </p>
        </div>
        <ImageSection
          title="Iniciativa de"
          images={[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGk3JWNCxk5-U9yGOGD3mykPitbsgm4TqctbK2OByZ0gSyITtLb9vBiS78Q2agDliz_Y&usqp=CAU",
            "https://images.credly.com/images/d57ca793-0499-419a-a5a8-8a56699c6c6c/blob.png",
          ]}
        />
        <ImageSection title="Co-creadores" images={[]} />
        <ImageSection title="Financiación" images={[]} />
        <ImageSection
          title="Tecnología implementada"
          images={[
            "https://www.gisandbeers.com/wp-content/uploads/2018/10/Google-Earth-Engine-GEE.jpg",
            "https://miro.medium.com/v2/resize:fit:1400/0*l-92pnhn0eB0_ldc",
          ]}
          style={{ objectFit: "cover", width: "400px", height: "200px" }}
        />
      </div>
    </section>
  );
};

export default contributors;
