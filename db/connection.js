require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on('open', () => console.log('WAHOOOO we connected'))
    .on('close', () => console.log('NAUURR u r not connected'))
    .on('error', (e) => console.log('matey error yo', e))
module.exports = mongoose