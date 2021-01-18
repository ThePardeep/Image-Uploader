const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const ImageSchema = new Schema({
  fileName: String,
  uploadDate: Number,
});

const ImageModel = model("Image", ImageSchema, "Image");

module.exports = ImageModel;
