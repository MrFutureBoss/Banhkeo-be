import mongoose, { Schema } from "mongoose";
import ProductSchema from "./Product.js";
const BillSchema = new Schema({
    name: {
        type: String,
        maxLength: 255
    },
    email: {
        type: String,
        maxLength: 255,
        minLenght: 5
    },
    phone: {
        type: String,
        maxLenght: 11
    },
    location: {
        type: String,
        maxLength: 255
    },
    total: {
        type: Number,
    },
    seri: {
        type: String,
        maxLength: 255
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Bill = mongoose.model('bills', BillSchema)

export default Bill