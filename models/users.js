const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    premium: Boolean,
    hobbies: [String]
})

const User = mongoose.model("users", userSchema)

module.exports = User