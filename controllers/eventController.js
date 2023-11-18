const express = require('express')
const app = express();
const router = express.Router();
const User = require('../models/user')
const Event = require('../models/event')
const {customAlphabet} = require('nanoid');



router.get('/new', async (req, res) => {
    let events = await Event.find();
    res.render('new')
})

router.get('/edit/:id', async (req,res) => {
    const event = await Event.findOne({ uniqueUrl: req.params.eventId})
    res.render('event/edit', {event})
})


router.post('/new', async (req, res) => {

    const {eventName, calendarDuration} = req.body
    const durationMonths = parseInt(calendarDuration)

    if (!eventName) {
        return res.status(400).send('event name is required')
    }

    if (isNaN(durationMonths) || durationMonths <= 0) {
        return res.status(400).send('invalid duration')
    }

    
    const nanoid = customAlphabet(
        '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 
        5
    );
    const eventId = nanoid();

    const newEvent = new Event({
        eventName, 
        calendarDuration: durationMonths,
        eventCreatedAt: new Date(),
        uniqueUrl: eventId,
        user: req.session.userid
    });

    await newEvent.save();


    res.json(newEvent)
});

router.get('/delete/:eventId', async (req, res) => {
    const eventIdDelete = req.params.eventId;

    const eventToDelete = await Event.findByIdAndDelete(eventIdDelete)

    res.json('/home')
})

router.post('/edit/:eventId', async (req, res) => {
    const event = await Event.findOne({ uniqueUrl: req.params.eventId})
    if (!event){
        return res.send('no good')
    }
    
    event.eventName = req.body.eventName;
    event.calendarDuration = req.body.calendarDuration

    await event.save();
    res.json(`/event/${event.eventId}?calendarDuration=${event.calendarDuration}&eventName=${event.eventName}`)
})


router.get('/:uniqueUrl', async (req, res) => {
    let events = await Event.find();
    // const eventId = req.params.eventId;
    const eventName = req.query.eventName;
    console.log(eventName)
    res.json('')
})

module.exports = router;





