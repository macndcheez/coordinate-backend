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
app.use(session({ secret: "yerrr", cookie: {maxAge: 3600000}, resave: false, saveUninitialized: true}))
app.use(express.json());

app.use('/', authController)

// own middleware for checking logged in
app.use((req, res, next) => {
    console.log(req.session)
    if (!req.session.userId){
        res.redirect('/login')
        return
    }
    next();
});


app.listen(PORT, () => console.log('ello the port of', PORT, 'is here'))
