const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password, confirmPassword, role} = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        };

        //hash pass
        const hashedPassword = await bcrypt.hash(password, 10);

        //check for image
        let imageUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`;

        console.log("REQ FILE", req.file);  

        if(req.file){
            imageUrl = `/uploads/${req.file.filename}`;
        }

        //create entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            image:imageUrl,
            role,
        });

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Signup"
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not registered"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            });
        }

        //generate jwt token
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"24h"
        });

        //send cookie
        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge: 24*60*60*1000,
        });

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                id:user._id,
                name: user.firstName,
                email: user.email,
                image: user.image
            }
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Login"
        })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("token", { 
        httpOnly: true, 
        sameSite: "Strict", 
        secure: true 
    });
    res.json({ 
        message: "Logged out" 
    });
}