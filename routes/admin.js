const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/:start/:count', async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const admin = await Admin.find().limit(parseInt(count)).skip(parseInt(start));
        let count1 = await Admin.estimatedDocumentCount();
        res.json({Data: admin, Count: count1});
    }
    catch (err) {
        res.json({ message: err });
    }
})

router.get('/:AdminId', async (req, res) => {
    const admin = await Admin.findOne({ _id: req.params.AdminId });

    if (admin != null && admin != "") {
        res.json(admin);
    }
    else {
        res.json(admin);
    }
})


router.get('/login/:Email/:Password', async (req, res) => {
    const admin = await Admin.find({Email:req.params.Email,Password:req.params.Password});

    if(admin != null && admin != "")
    {
        const admin1 =  await Admin.findOneAndUpdate({Email: req.params.Email}, {$set:{LoginStatus:"1"}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        });
        res.json(admin1);
    }
    else{
        res.json("Fail");
    }
})

router.get('/logout/:Username', (req, res) => {
    Admin.findOneAndUpdate({Username: req.params.Username}, {$set:{LoginStatus:"0"}}, {new: true}, (err, doc) => {
        if (err) {
            res.send("Something wrong when updating data!");
        }
        else{
            res.send("success");
        }
    });
})


router.post('/', (req, res) => {
    const admin = new Admin({
        Name: req.body.Name,
        Surname: req.body.Surname,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        LoginStatus: req.body.LoginStatus
    })
    admin.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})

router.delete('/:AdminId', async (req,res) => {
    try {
        const removedAdmin = await Admin.remove({_id: req.params.AdminId});
        response.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})


router.put('/:adminId', async (req, res) => {
    if (!req.body) {
        res.json({ status: "Fail", message: "Request body not found" });
    }

    const id = req.params.adminId;

    Admin.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.json({ status: "Fail", message: "No such user found." });
            }
            else {
                res.json({ status: "Success", message: "Admin updated successfully!" });
            }
        })
        .catch(err => {
            res.json({ status: "Fail", message: "Error inserting data" });
        });
});


module.exports = router;