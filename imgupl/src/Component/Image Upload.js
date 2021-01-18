import axios from "axios";
import React, { useState } from "react";
const ImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const onSubmit = (E) => {
    E.preventDefault();
    if (!image) {
      return;
    }
    const imageFormData = new FormData();
    imageFormData.append("image", image, Date.now() + "_" + image.name);
    axios
      .post("/upload/image", imageFormData)
      .then((res) => {
        if (res.data.error) {
          return;
        }
        props.fetchImages();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = (E) => {
    const file = E.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/x-png" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      setImage(file);
    }
  };
  return (
    <form method="POST" onSubmit={onSubmit}>
      <input
        type="file"
        onChange={onChange}
        name="image"
        id="image"
        accept="image/x-png,image/gif,image/jpeg"
      />
      <input type="submit" />
    </form>
  );
};

export default ImageUpload;
