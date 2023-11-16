const express = require('express')
const app = express();
const router = express.Router();
const User = require('../models/user')
const Event = require('../models/event')
const {customAlphabet} = require('nanoid');


// router.get('/', async (req, res) => {
//      let events = await Event.find()
//      res.render('events/index', {
//         events
//      })
// })

router.get('/new', async (req, res) => {
    let events = await Event.find();
    res.render('events/new.ejs', {
        events
    })
})

router.get('/edit/:eventId', async (req,res) => {
    const event = await Event.findOne({ uniqueUrl: req.params.eventId})
    res.render('events/edit', {event})
})

router.get('/userEvents', async (req, res) => {
    const userId = req.session.userId;
    const userEvents = await Event.find({ user: req.session.userId });
    res.render('events/userEvents', { userEvents })
})

router.post('/new', async (req, res) => {

    const {eventName, calendarDuration} = req.body
    const durationMonths = parseInt(calendarDuration)
    
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
        user: req.session.userId
    });

    await newEvent.save();


    res.redirect(`/events/${eventId}?calendarDuration=${durationMonths}&eventName=${eventName}`)
});

router.get('/delete/:eventId', async (req, res) => {
    const eventIdDelete = req.params.eventId;

    const eventToDelete = await Event.findByIdAndDelete(eventIdDelete)

    res.redirect('/events/userEvents')
})

router.post('/edit/:eventId', async (req, res) => {
    const event = await Event.findOne({ uniqueUrl: req.params.eventId})
    if (!event){
        return res.send('no good')
    }
    
    event.eventName = req.body.eventName;
    event.calendarDuration = req.body.calendarDuration

    await event.save();
    res.redirect(`/events/${event.eventId}?calendarDuration=${event.calendarDuration}&eventName=${event.eventName}`)
})


router.get('/:eventId', async (req, res) => {
    let events = await Event.find();
    // const eventId = req.params.eventId;
    const calendarDuration = req.query.eventId;
    const eventName = req.query.eventName;
    console.log(eventName)
    res.render('events/index', {
        calendarDuration,
        eventName,
        events
    })
})

module.exports = router;





