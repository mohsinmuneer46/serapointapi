const mongoose = require('mongoose');

const adminHistorySchema = mongoose.Schema({
    AdminId:{
        type: String,
        required: true
    },
    UserId:{
        type: String
    },
    Action:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AdminHistory', adminHistorySchema)