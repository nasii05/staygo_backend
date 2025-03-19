import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    type: {type: String, required: true},
    price: {type: Number, required: true},
    available: {type: Boolean, default: true}
})

const HotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    rooms: [roomSchema]
})

export default mongoose.model("Hotel", HotelSchema);