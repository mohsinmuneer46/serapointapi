const { response } = require('express');
const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

router.get('/:start/:count', async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const role = await Role.find().limit(parseInt(count)).skip(parseInt(start));
        let count1 = await Role.estimatedDocumentCount();
        res.json({Data: role, Count: count1});
    }
    catch (err) {
        res.json({ message: err });
    }
})

router.get('/classify/:Name', async (req, res) => {
    const role = await Role.find({Name:req.params.Name});

    if(role != null && role != "")
    {
        res.json(role);
    }
    else{
        res.json("Fail");
    }
})

router.get('/:start/:count/:adminId', async (req, res) => {
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    const role = await Role.find({adminId:req.params.adminId}).limit(parseInt(count)).skip(parseInt(start));

    if(role != null && role != "")
    {
        let count1 = await Role.estimatedDocumentCount();
        res.json({Data: role, Count: count1});
    }
    else{
        res.json("Fail");
    }
})

router.get('/specific/:roleId', async (req, res) => {
    const role = await Role.find({_id:req.params.roleId});

    if(role != null && role != "")
    {
        res.json(role);
    }
    else{
        res.json("Fail");
    }
})

router.post('/', (req, res) => {
    const role = new Role({
        Name: req.body.Name,
        adminId: req.body.adminId,
        links: req.body.links
    })
    role.save()
        .then(data => {              
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})

router.delete('/:RoleId', async (req,res) => {
    try {
        const removedRole = await Role.remove({_id: req.params.RoleId});
        response.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.patch('/:RoleId', async (req,res) => {
    try{
        const role = Role.updateOne({_id: req.params.RoleId}, 
            {$set: { Name: req.body.Name, adminId: req.body.adminId, links: req.params.links }
        });
        response.json(role);        
    }
    catch (err){
        res.json({ message: err })
    }
})

module.exports = router;