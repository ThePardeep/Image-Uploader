const express = require("express");
const Path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const ImageSchema = require("./DB/Model/File Model");
const UploadImage = require("./image_uploader");
const app = express();
const PORT = 4000;

//MongoDb Connection

mongoose.connect(
  "mongodb://localhost:27017/Images",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;

    console.log("MongoDb Connect");
  }
);

//Static Folder
app.use(express.static(Path.join(__dirname, "imgupl/build")));

//@TYPE : POST
//@ROUTE : /upload/image
//@ACCESS : PUBLIC
//@DESC : Upload Image

app.post("/upload/image", (req, res) => {
  UploadImage(req, res, (err) => {
    if (err) {
      throw err;
    }

    const fileData = {
      fileName: req.file.filename,
      uploadDate: Date.now(),
    };

    ImageSchema.insertMany([fileData])
      .then((result) => {
        if (result.length > 0) {
          res.json({
            msg: "Upload Success",
            error: false,
          });
          return;
        }

        res.json({
          msg: "Upload Failed",
          error: true,
        });
      })
      .catch((err) => {
        throw err;
      });
  });
});

//@TYPE : GET
//@ROUTE : /image/all
//@ACCESS : PUBLIC
//@DESC : Fetch All Images

app.get("/image/all", (req, res) => {
  ImageSchema.find()
    .then((result) => {
      if (result.length > 0) {
        res.json({
          result,
          error: false,
        });
        return;
      }
      res.json({
        msg: "Fetch Failed",
        error: true,
      });
    })
    .catch((err) => {
      throw err;
    });
});

//@TYPE : GET
//@ROUTE : /image/:filename
//@ACCESS : PUBLIC
//@DESC : Fetch Image by Name

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const isExist = fs.existsSync(`public/images/${filename}`);
  if (isExist) {
    res.sendFile(Path.resolve("public/images", filename));
  } else {
    res.send("File Not Exist");
  }
});

//@TYPE : GET
//@ROUTE : *
//@ACCESS : PUBLIC

app.get("*", (req, res) => {
  res.sendFile(
    Path.resolve(Path.join(__dirname, "imgupl/build", "index.html"))
  );
});

app.listen(PORT, () => {
  console.log("Server Running At PORT " + PORT);
});
