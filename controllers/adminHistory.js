const UserHistory = require("../models/AdminHistory");
const mongoose = require("mongoose");

exports.getHistory = async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const user = await UserHistory.find().limit(parseInt(count)).skip(parseInt(start));
        UserHistory.estimatedDocumentCount().then((result) => {
            res.json({status: "success", Data: user, Count: result});
        })
    }
    catch (err) {
        res.json({status: "success", Data: [], Count: 0});
    }
}

exports.getHistoryById = (req, res) => {
    UserHistory.find({_id: req.params.id})
        .then((history) => {
            if (!history) {
                res.json({status: "success", Data: [], Count: 0});
            }
            UserHistory.estimatedDocumentCount().then((result) => {
                res.json({status: "success", Data: history, Count: result});
            })  
        })
        .catch((err) => {
            res.json({ status: "failed", message: err });
        });
};

exports.getHistoryByAdminId = async (req, res) => {
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    UserHistory.find({AdminId: req.params.id}).limit(parseInt(count)).skip(parseInt(start))
        .then((history) => {
            if (!history) {
                res.json({ status: "success", message: "no record" });
            }
            UserHistory.estimatedDocumentCount().then((result) => {
                res.json({status: "success", Data: history, Count: result});
            })
        })
        .catch((err) => {
            res.json({ status: "failed", message: err });
        });
};
