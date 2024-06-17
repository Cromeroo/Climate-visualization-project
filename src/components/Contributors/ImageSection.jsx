import React from "react";
import PropTypes from "prop-types";

const ImageSection = ({ title, images, style }) => (
  <>
    {title && (
      <h3 style={{ color: "#dc923e", margin: "0", padding: "20px" }}>
        {title}
      </h3>
    )}
    <div className="support-list">
      {images.map((src, index) => (
        <img key={index} src={src} style={style} alt="" />
      ))}
    </div>
  </>
);

ImageSection.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
};

ImageSection.defaultProps = {
  style: { objectFit: "cover", width: "200px", height: "200px" },
};

export default ImageSection;
