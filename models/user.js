const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const User = new mongoose.model('User', userSchema)
module.exports = User