// const calendarEvent = require('../models/calendarEvent')
// const express = require('express')
// const app = express();
// const router = express.Router();
// const User = require('../models/user')
// const Event = require('../models/event')


// router.post('/:uniqueUrl', async (req, res) => {
//     const { uniqueUrl } = req.params;
//     const { title, start, end } = req.body;

//     const userId = req.session.userid;
  
//     try {
//       const newCalendarEvent = new CalendarEvent({
//         title,
//         start,
//         end,
//         user: userId,
//         uniqueUrl,
//       });
//       const savedCalendarEvent = await newCalendarEvent.save();
//       res.json(savedCalendarEvent);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   router.get('/:uniqueUrl', async (req, res) => {
//     const { uniqueUrl } = req.params;
//     const userId = req.session.userid;
  
//     try {
//       const calendarEvents = await CalendarEvent.find({ uniqueUrl, user: userId });
//       res.json(calendarEvents);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   module.exports = router;




