//Loading router module
const router = require('express').Router();
//Loading model for bookings
let bookings = require('../database_models/booking.model');

router.route('/load_bookings').get((req, res) => { 
    bookings.find() 
        .then(bookings => res.json(bookings))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/make_booking').post((req, res) => {
    const serviceSelected = req.body.service; 
    const dateSelected = req.body.date; 
    const timeSelected = req.body.time; 
    const nameGiven = req.body.name;
    const emailGiven = req.body.email;
    const telephoneGiven = req.body.telephone;

    const booking = {
        service : serviceSelected,
        date: dateSelected,
        time: timeSelected, 
        name: nameGiven,
        email: emailGiven,
        telephone: telephoneGiven
    };

    const newBooking = new bookings(booking);

    newBooking.save()
        .then(() => res.json('Booking complete!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
