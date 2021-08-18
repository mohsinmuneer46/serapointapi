const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AdminHistory = require('../models/AdminHistory');

router.get('/:start/:count', async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const user = await User.find().limit(parseInt(count)).skip(parseInt(start));
        let count1 = await User.estimatedDocumentCount();
        res.json({Data: user, Count: count1});
    }
    catch (err) {
        res.json({ message: "111" });
    }
})

router.get('/login/:Email/:Password', async (req, res) => {
    const user = await User.find({ Email: req.params.Email, Password: req.params.Password });

    if (user != null && user != "") {
        const user1 = await User.findOneAndUpdate({ Email: req.params.Email }, { $set: { LoginStatus: "1" } }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        });
        res.json(user1);
    }
    else {
        res.json("Fail");
    }
})

router.get('/users/:start/:count/:AdminId', async (req, res) => {
    
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    
    const user = await User.find({ AdminId: req.params.AdminId }).limit(parseInt(count)).skip(parseInt(start));

    if (user != null && user != "") {
        let count1 = await User.estimatedDocumentCount();
        res.json({Data: user, Count: count1});
    }
    else {
        res.json("Fail");
    }
})

router.get('/specific/:UserId', async (req, res) => {
    const user = await User.find({ _id: req.params.UserId });

    if (user != null && user != "") {
        res.json(user);
    }
    else {
        res.json("Fail");
    }
})

router.get('/logout/:Username', (req, res) => {
    User.findOneAndUpdate({ Username: req.params.Username }, { $set: { LoginStatus: "0" } }, { new: true }, (err, doc) => {
        if (err) {
            res.send("Something wrong when updating data!");
        }
        else {
            res.send("success");
        }
    });
})


router.post('/', (req, res) => {
    const user = new User({
        Name: req.body.Name,
        Surname: req.body.Surname,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        LoginStatus: req.body.LoginStatus,
        AdminId: req.body.AdminId,
        Permissions: req.body.Permissions
    })
    user.save()
        .then(data => {
            console.log(data);
            console.log(data.AdminId);
            const adminHistory = new AdminHistory({
                AdminId: data.AdminId,
                UserId: data._id,
                Action: "Added"
            })
            adminHistory.save();
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})

router.put('/:userId', async (req, res) => {
    if (!req.body) {
        res.json({ status: "Fail", message: "Request body not found" });
    }

    const id = req.params.userId;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.json({ status: "Fail", message: "No such user found." });
            }
            else {
                const adminHistory = new AdminHistory({
                    AdminId: data.AdminId,
                    UserId: data._id,
                    Action: "Updated"
                })
                adminHistory.save();
                res.json({ status: "Success", message: "user updated successfully!" });
            }
        })
        .catch(err => {
            res.json({ status: "Fail", message: "Error inserting data" });
        });
});


router.delete('/:userId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    try {
        const adminHistory = new AdminHistory({
            AdminId: user.AdminId,
            UserId: user._id,
            Action: "Removed"
        })
        adminHistory.save();
        const removedUser = await User.deleteOne({ _id: req.params.userId });
        res.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.get('/active/:userId/:value', (req, res) => {
    User
        .findById(req.params.userId)
        .then((data) => {
            if (!data) {
                res.json({
                    status: "failed",
                    message: "the user has not been found",
                });
            }

            data.active = req.params.value;
            data.save().then((saved) => {
                res.json({
                    status: "success",
                    message: "Active status updated successfully",
                    Data: saved,
                });
            });
        })
        .catch((err) => {
            res.json({
                status: "failed",
                message: err,
            });
        });
});

module.exports = router;