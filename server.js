const express = require('express');
const app = express();
const mongoose = require('./db/connection');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
app.use(cors({ origin: 'https://coordinate-4ppv.onrender.com', credentials: true }));
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');

require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'yerrr',
    store: MongoStore.create({mongoUrl: MONGODB_URI}),
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.use('/', authController);

// // Own middleware for checking logged in
// app.use((req, res, next) => {
//   console.log(req.session);
//   if (!req.session.userid) {
//     res.send('please log in');
//     return;
//   }
//   next();
// });

app.use('/event', eventController);



app.listen(PORT, () => console.log('The server is running on port', PORT));