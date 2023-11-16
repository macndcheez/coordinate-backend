// require mongoose to tell it which database to connect to 
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(
    process.env.MONGODB_URI
);

// check for connection or error
mongoose.connection.on('connected',  () => {
    console.log('WAHOOO mongodb connected!!!')
})

mongoose.connection.on('error', err => {
    console.log('nauurr error', err)
})

module.exports = mongoose;