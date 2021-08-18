const { response } = require('express');
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.get('/:userId/:receiverId', async (req, res) => {
    try {
        const chat = await Chat.find({$or: [{userId:req.params.userId,receiverId:req.params.receiverId},{userId:req.params.receiverId,receiverId:req.params.userId}]}).sort('Date');
        res.json(chat);
    }
    catch (err) {
        res.json({ message: err });
    }
})

router.post('/', (req, res) => {
    const chat = new Chat({
        userId: req.body.userId,
        receiverId: req.body.receiverId,
        message: req.body.message
    })
    chat.save()
        .then(data => {              
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})

router.delete('/:RoleId', async (req,res) => {
    try {
        const removedRole = await Role.deleteOne({_id: req.params.RoleId});
        response.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;