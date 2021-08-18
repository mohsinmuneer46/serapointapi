const User = require("../models/User");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

exports.signint = async (req, res) => {
    const user = await User.find({ Email: req.body.Email, Password: req.body.Password });

    if (user != null && user != "") {
        if(user[0].active == 1)
        {
            const user1 = await User.findOneAndUpdate({ Email: req.body.Email }, { $set: { LoginStatus: "1" } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            });
            res.json({ status: "Success", message: user1, role: "User" });
        }
        else
        {
            res.json({ status: "Success", message: "User is not active contact admin" });
        }
        
    }
    else {
        const admin = await Admin.find({ Email: req.body.Email, Password: req.body.Password });
        if (admin != null && admin != "") {
            const admin1 = await Admin.findOneAndUpdate({ Email: req.body.Email }, { $set: { LoginStatus: "1" } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            });
            res.json({ status: "Success", message: admin1, role: "Admin" });
        }
        else{
            if(req.body.Email == "Superadmin@serapoint.com" && req.body.Password == "12345678")
            {
                res.json({ status: "Success", message:{ _id: "60874b886175a70021e760", Name: "Super", Surname: "Admin", Username: "SUperAdmin", Email: "SupaerAdmin@serapoint.com", Password: 12345678, LoginStatus: "1" } , role: "Super Admin" });
            }
            else
            {
                res.json({ status: "Fail", message: user});
            }
        }
    }
};
