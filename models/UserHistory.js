const mongoose = require('mongoose');

const userHistorySchema = mongoose.Schema({
    UserId:{
        type: String,
        required: true
    },
    AdminId:{
        type: String,
        required: true
    },
    Action:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserHistory', userHistorySchema)