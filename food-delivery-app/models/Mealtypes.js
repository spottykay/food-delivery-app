// models/Mealtypes.js
import mongoose from 'mongoose';

const MealtypeSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  image: String
});

const Mealtype = mongoose.model('mealtypes', MealtypeSchema); // Ensure the model name matches the collection name
export default Mealtype;
