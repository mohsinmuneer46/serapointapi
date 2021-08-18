const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
    sourceID:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    ProjectName:{
        type: String,
        required: true
    },
    cesiumionid:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    defaultEnable:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ProjectsSchema', projectsSchema)