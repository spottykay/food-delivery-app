// models/Location.js
import mongoose from "mongoose";


const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  city: { type: String, required: true },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Location = mongoose.model("locations", LocationSchema);

export default Location;
