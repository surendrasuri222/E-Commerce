const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "Registered"
    },
    gender: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: 0
    },
    profession: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },

}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel