const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    store: {
        type: String,
        required: [true, "Store is required"],
        minlength: [3, "Store must contain 3 characters!"]
    },
    number: {
        type: Number, index : { unique: [true, "no duplicate numbers"] },
        required: [true, "store number is required"],
        min: [1, "Must be a unique number greater than 0!"]
        
    },
    isOpen: {
        type: Boolean,
        default: false,
    }

}, {timestamps:true})

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;