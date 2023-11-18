const express = require('express')
const app = express();
const router = express.Router();
const User = require('../models/user')
const Event = require('../models/event')
const {customAlphabet} = require('nanoid');


router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

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

router.delete('/:uniqueUrl', async (req, res) => {
    const uniqueUrl = req.params.uniqueUrl;
    try {
        const eventToDelete = await Event.findOne({ uniqueUrl });
        if (!eventToDelete) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await eventToDelete.deleteOne();
        console.log('Event deleted successfully!!!! wahooo');
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/edit/:uniqueUrl', async (req, res) => {
    const event = await Event.findOne({ uniqueUrl: req.params.uniqueUrl})
    if (!event){
        return res.send('no good')
    }
    
    event.eventName = req.body.eventName;
    event.calendarDuration = req.body.calendarDuration

    await event.save();
    res.json(`/event/${event.uniqueUrl}`)
})


router.get('/:uniqueUrl', async (req, res) => {
    const uniqueUrl = req.params.uniqueUrl;
    try {
        const event = await Event.findOne({ uniqueUrl });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const eventName = event.eventName; 
        res.json({ event, eventName });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;





