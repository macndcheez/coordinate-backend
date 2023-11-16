const mongoose = require('../db/connection')

const eventSchema = new mongoose.Schema ({
    eventName: {type: String, required: true},
    calendarDuration: {type: Number, required: true},
    eventCreatedAt: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    uniqueUrl: {type: String, required: true}
})

const Event = new mongoose.model('Event', eventSchema);
module.exports = Event;