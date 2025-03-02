const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bidAmount:{
        type:Number,
        required:true,
    },
    bidTime:{
        type:Date,
        default:Date.now()
    }
}, {timestamps:true});

module.exports = mongoose.model("Bid", bidSchema);