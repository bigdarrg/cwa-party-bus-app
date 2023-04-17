//Loading modules
const mongooseModule = require('mongoose');
const schema = mongooseModule.Schema;

//Creating schema for a booking
const bookingSchema = new schema({
    service: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true,
    },
    telephone: {
        type: String,
        requires: true,
    }
});

const booking = mongooseModule.model('bookings', bookingSchema);

//Exporting new model
module.exports = booking;
