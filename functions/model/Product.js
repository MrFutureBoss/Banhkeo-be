import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    name: {
        type: String,
        maxLength: 255,
    },
    type: {
        type: String,
        minLength: 1
    },
    special: {
        type: String,
        minLength: 1
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        maxLength: 255
    },
    quantity: {
        type: Number
    },
    description: {
        type: String,
        maxLength: 700
    },
    sold: {
        type: Number
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Product = mongoose.model('products', ProductSchema)

export default Product