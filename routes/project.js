const { response } = require('express');
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const AdminHistory = require('../models/AdminHistory');
const UserHistory = require('../models/UserHistory');
const path = require('path');
const multer = require('multer');
var fs = require('fs');
var shell = require('shelljs');
const allowedFileTypes = [ '.mp4', '.mov', '.wmv', '.avi', '.jpeg', '.jpg', '.png', '.gif', '.mp3', '.wav'];

//storage engine
const storage = multer.diskStorage({
    destination: './upload/post_media',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); 
    }
});
const upload = multer({
   storage
})



router.get('/:start/:count', async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const project = await Project.find().limit(parseInt(count)).skip(parseInt(start));
        let count1 = await Project.estimatedDocumentCount();
        res.json({Data: project, Count: count1});
    }
    catch (err) {
        res.json({ message: err });
    }
})

router.get('/:id', async (req, res) => {
    const project = await Project.find({ _id: req.params.id });

    if (project != null && project != "") {
        res.json(project);
    }
    else {
        res.json("Fail");
    }
})

router.get('/user/:start/:count/:userID', async (req, res) => {
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    const project = await Project.find({ sourceID: req.params.userID }).limit(parseInt(count)).skip(parseInt(start));

    if (project != null && project != "") {
        let count1 = await Project.estimatedDocumentCount();
        res.json({Data: project, Count: count1});
    }
    else {
        res.json(project);
    }
})


router.post('/createfolder', (req, res) => {

    try {
        
        let start = req.body.name;
        console.log(req.body.name)
        const dir = `/upload/${start}`;
        console.log(dir)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
             fs.mkdir(dir, (err) => {

            if(err){
              console.log(err);
            }
            console.log("dir is created");
        });
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    
        return   res.json('chal gaya');
    }
    catch (e){
        console.log(e)
        return res.json(e)
    }


});

router.post('/', (req, res) => {
    // console.log(req.body.FolderName);
    // const dir = "./upload/james";
    // try {
    //     fs.mkdir(dir, (err) => {

    //         if(err){
    //             throw err;
    //         }
    //         console.log("dir is created");
    //     });
        // let start = req.params;
       // console.log(fs)
        // const dir = `/upload/${req.body.FolderName}`;
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir, {
        //         recursive: true
        //     })
        // }
        // if (!fs.existsSync(dir)){
        //     fs.mkdirSync(dir);
        // }
        // fs.mkdirSync(dir);
      //  const targetPkgFile = Path.join("/upload/", req.body.FolderName);
        // shell.mkdir('-p', "/upload/abc1aas");
        //  console.log(targetPkgFile)
    //     return res.json();
    // }
    // catch (e){
    //     console.log(e)
    // }

    const project = new Project({
        sourceID: req.body.sourceID,
        ProjectName: req.body.ProjectName,
        userID: req.body.userID,
        cesiumionid: req.body.cesiumionid,
        description: req.body.description,
        defaultEnable: req.body.defaultEnable,
        type: req.body.type,
        status: req.body.status,
    })
    project.save()
        .then(data => {
            if (req.body.type == "Admin") {
                const adminHistory = new AdminHistory({
                    AdminId: req.body.sourceID,
                    Action: "Created Project " + req.body.ProjectName + ""
                })
                adminHistory.save();
            }
            else if (req.body.type == "User") {
                const userHistory = new UserHistory({
                    UserId: req.body.sourceID,
                    AdminId: req.body.AdminId,
                    Action: "Created Project " + req.body.ProjectName + ""
                })
                userHistory.save();
            }
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})


router.put('/:projectId', async (req, res) => {
    if (!req.body) {
        res.json({ status: "Fail", message: "Request body not found" });
    }

    const id = req.params.projectId;

    Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.json({ status: "Fail", message: "No such user found." });
            }
            else {
                if (req.body.type == "Admin") {
                    const adminHistory = new AdminHistory({
                        AdminId: req.body.sourceID,
                        Action: "Updated Project " + data.ProjectName + ""
                    })
                    adminHistory.save();
                }
                else if (req.body.type == "User") {
                    const userHistory = new UserHistory({
                        UserId: req.body.sourceID,
                        AdminId: req.body.AdminId,
                        Action: "Updated Project " + req.body.ProjectName + ""
                    })
                    userHistory.save();
                }
                res.json({ status: "Success", message: "Project updated successfully!" });
            }
        })
        .catch(err => {
            res.json({ status: "Fail", message: "Error inserting data" });
        });
});


router.delete('/admin/:id/:adminId', async (req, res) => {
    try {
        const adminHistory = new AdminHistory({
            AdminId: req.params.adminId,
            Action: "Removed Project " + req.params.id
        })
        adminHistory.save();
        const removedUser = await Project.deleteOne({ _id: req.params.id });
        res.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.delete('/user/:id/:userId/:adminId', async (req, res) => {
    try {
        const userHistory = new UserHistory({
            UserId: req.params.userId,
            AdminId: req.params.adminId,
            Action: "Removed Project " + req.params.id
        })
        userHistory.save();
        const removedUser = await Project.deleteOne({ _id: req.params.id });
        res.json("Removed Sucessfully");
    }
    catch (err) {
        res.json({ message: err })
    }
})


module.exports = router;




