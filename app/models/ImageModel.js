import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  id: String,
  width: Number,
  height: Number,
  url: String,
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
