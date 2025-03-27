import mongoose from "mongoose"
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },

}, {timestamps: true});

userSchema.methods.setAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    return token;
}

export const User = mongoose.model("User", userSchema);