import mongoose, { Schema } from "mongoose";
const BillSchema = new Schema({
    name: {
        type: String,
        maxLength: 255
    },
    email: {
        type: String,
        maxLength: 255,
        unique: true,
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
    description: {
        type: String,
        maxLength: 255
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model('bills', BillSchema)

export default User