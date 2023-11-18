const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;