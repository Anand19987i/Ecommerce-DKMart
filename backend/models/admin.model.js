import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    password: {
        type: Number,
        default: "",
    },
})

adminSchema.methods.setAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}

export const Admin = mongoose.model("Admin", adminSchema);