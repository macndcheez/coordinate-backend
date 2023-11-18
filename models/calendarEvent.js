const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  uniqueUrl: {type: String, required: true}
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;