import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        maxLength: 255,
        unique: true,
        minLenght: 5
    },
    name: {
        type: String,
        maxLength: 255
    },
    password: {
        type: String,
        maxLenght: 8
    },
    location: {
        type: String,
        maxLength: 255
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model('users', UserSchema)

export default User