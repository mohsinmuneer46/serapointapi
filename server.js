const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());



const usersRoute = require('./routes/user');
const adminsRoute = require('./routes/admin');
const rolesRoute = require('./routes/role');
const chatsRoute = require('./routes/chat');
const projectsRoute = require('./routes/project');
const loginRoute = require('./routes/login');
const adminHistoryRoute = require('./routes/adminHistory');
const userHistoryRoute = require('./routes/userHistory');

app.use('/user',usersRoute);

app.use('/admin',adminsRoute);

app.use('/role',rolesRoute);

app.use('/chat',chatsRoute);

app.use('/project',projectsRoute);

app.use('/login',loginRoute);

app.use('/adminHistory',adminHistoryRoute);

app.use('/userHistory',userHistoryRoute);


// Routes

app.get('/',(req, res) => {
    res.send("we are at home.");
})

app.get('/post',(req, res) => {
    res.send("we are at post");
})

// connect to database
//mongodb+srv://np:Denver78600@cluster0.2hpsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://ghall1:Denver78600@cluster0.2hpsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},(error) => {
    if(!error)
    {
        console.log("Success");
    }
    else
    {
        console.log(error);
    }
});


var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});