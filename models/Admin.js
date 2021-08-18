const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Admin', adminSchema)