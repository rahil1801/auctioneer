const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:null
    },
    role:{
        type:String,
        enum:["User", "Admin"],
        default:"User"
    },
    bids:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bid"
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    watchList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    winnings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);