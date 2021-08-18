const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    receiverId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatsSchema', chatsSchema)