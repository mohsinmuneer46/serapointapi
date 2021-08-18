const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    adminId:{
        type: String,
        required: true
    },
    links:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RolesSchema', rolesSchema)