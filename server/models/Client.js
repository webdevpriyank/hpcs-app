const mongoose = require('mongoose');

const clientShema = new mongoose.Schema({

    clientName: {
        type: String,
        required: 'This field is required.'
    },
    clientAddress: {
        type: String,
        required: 'This field is required.'
    },
    clientEmail: {
        type: String,
        required: 'This field is required.'
    },
    clientMobile: {
        type: String,
        // required: 'This field is required.'
    }
});

// clientShema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//clientShema.index({ "$**" : 'text' });

module.exports = mongoose.model('Client', clientShema);