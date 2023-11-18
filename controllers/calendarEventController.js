const calendarEvent = require('../models/calendarEvent')
const express = require('express')
const app = express();
const router = express.Router();
const User = require('../models/user')
const Event = require('../models/event')


router.post('/event/:uniqueUrl', async (req, res) => {
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


router.get('/event/:uniqueUrl', async (req, res) => {
    const {uniqueUrl} = req.params
  try {
    const calendarEvents = await CalendarEvent.find({uniqueUrl});
    res.json(calendarEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;





