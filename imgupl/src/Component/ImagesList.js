import React from "react";
export const ImagesList = (props) => {
  const images = props.images;
  return (
    <div className="img-list">
      {images.map((image, index) => {
        return (
          <img
            key={index}
            className="img"
            src={`/image/${image.fileName}`}
            alt={image.fileName}
          />
        );
      })}
    </div>
  );
};
