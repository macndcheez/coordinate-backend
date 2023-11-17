const express = require('express')
const app = express();
const mongoose = require('./db/connection');
const session = require('express-session');
const cors = require('cors')
const authController = require('./controllers/authController')

require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: "yerrr", cookie: {maxAge: 3600000}}))
app.use(express.json());

app.use('/', authController)



app.listen(PORT, () => console.log('ello the port of', PORT, 'is here'))
