const UserHistory = require("../models/UserHistory");
const mongoose = require("mongoose");

exports.getHistory = async (req, res) => {
    try {
        let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
        const user = await UserHistory.find().limit(parseInt(count)).skip(parseInt(start));
        let count1 = await UserHistory.estimatedDocumentCount();
        res.json({status: "success", Data: user, Count: count1});
    }
    catch (err) {
        res.json({ status: "success", message: "no record" });
    }
}

exports.getHistoryById = (req, res) => {
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    UserHistory.find({UserId: req.params.id}).limit(parseInt(count)).skip(parseInt(start))
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

exports.getHistoryByAdmin = (req, res) => {
    let start = req.params.start;
        let count = req.params.count;
        start = (start - 1) * count;
    UserHistory.find({AdminId: req.params.adminId}).limit(parseInt(count)).skip(parseInt(start))
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