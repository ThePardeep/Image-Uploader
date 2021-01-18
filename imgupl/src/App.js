import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadImageForm from "./Component/Image Upload";
import { ImagesList } from "./Component/ImagesList";
import "./Style.css";
function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios
      .get("/image/all")
      .then((res) => {
        const { result } = res.data;
        if (result.length > 0) {
          setImages(result);
          return;
        }
        setImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="img-upl">
      <div className="upl-form">
        <UploadImageForm fetchImages={fetchImages} />
      </div>
      <div className="images">
        <h2>Images</h2>
        <hr />
        <ImagesList images={images} />
      </div>
    </div>
  );
}

export default App;
