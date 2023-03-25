const shop = require("../models/shop.model");

module.exports.getAll = (req,res) => {
    shop.find({})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({...err, message: err.message}))
}
module.exports.getOne = (req,res) => {
    shop.findOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({...err, message: err.message}))
}
module.exports.create = (req,res) => {
    shop.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json({...err, message: err.message}))
}
module.exports.deleteOne = (req,res) => {
    shop.findOneAndDelete({_id: req.params._id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json({...err, message: err.message}))
}

module.exports.updateOne = (req,res) => {
    shop.findOneAndUpdate({_id:req.params._id},req.body,{runValidators:true})
        .then(result => res.json(result))
        .catch(err => res.status(400).json({...err, message: err.message}))
}

