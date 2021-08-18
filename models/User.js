const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Surname:{
        type: String,
        required: true
    },
    Username:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    LoginStatus:{
        type: String,
        required: true
    },
    AdminId:{
        type: String,
        required: true
    },
    Permissions:{
        type: String,
        required: true
    },
    active:{
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('User', userSchema)