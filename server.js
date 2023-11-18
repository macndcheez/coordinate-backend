const express = require('express');
const app = express();
const mongoose = require('./db/connection');
const session = require('express-session');
const cors = require('cors');
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');
const CalendarEvent = require('./models/calendarEvent'); // Import the calendarEvent model

require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'yerrr',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.use('/', authController);

// Own middleware for checking logged in
app.use((req, res, next) => {
  console.log(req.session);
  if (!req.session.userid) {
    res.send('please log in');
    return;
  }
  next();
});

app.use('/event', eventController);

// Route for creating a specific calendar event
app.post('/event/:uniqueUrl', async (req, res) => {
    const {uniqueUrl} = req.params
  try {
    const { title, start, end } = req.body;
    const newCalendarEvent = new CalendarEvent({ title, start, end, uniqueUrl });
    const savedCalendarEvent = await newCalendarEvent.save();
    res.json(savedCalendarEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for getting all specific calendar events
app.get('/event/:uniqueUrl', async (req, res) => {
    const {uniqueUrl} = req.params
  try {
    const calendarEvents = await CalendarEvent.find({uniqueUrl});
    res.json(calendarEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log('The server is running on port', PORT));