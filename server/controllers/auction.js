const Product = require('../models/Product');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const Category = require('../models/Category');

//create auction
exports.createAuction = async (req, res) => {
    try{
        const { title, description, category, tag, startingPrice, auctionDate } = req.body;
        
        const seller = req.user.id;

        console.log("REQ BODY", req.body);
        console.log("REQ FILES", req.file);

        if(!title || !description || !category || !startingPrice || !auctionDate){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const endTime = new Date(auctionDate);

        if (isNaN(endTime.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid auction end time format"
            });
        }

        if (endTime <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Auction end time must be in the future"
            });
        }

        // Check if the category is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        //image
        if(req.file){
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newProduct = new Product({
            title,
            description,
            category: category,
            tag: tag ? tag.split(",") : [],
            images:imageUrl,
            seller:seller,
            startingPrice,
            auctionEndTime:endTime
        });

        await newProduct.save();

        //add auction to user
        await User.findByIdAndUpdate(
            { _id:  seller },
            { $push: { products:  newProduct._id } },
            { new: true }
        );

        //add auction to category
        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            { $push: { products: newProduct._id } },
            { new: true }
        );

        return res.status(200).json({
            success:true,
            message:"Product Auctioned Successfully and is Live",
            product:newProduct
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating an auction"
        })
    }
}

//fetch all user auctions
exports.fetchAllAuctions = async (req, res) => {
    try{    
        const userId = req.user.id;
        //console.log("USERID", req.user.id);
        
        const auctions = await Product.find({ seller: userId })
            .select("title description images startingPrice currentBid auctionEndTime status")
            .populate("category", "name")
            //.populate("bids", "_id")
            .sort({ createdAt: -1 });

        //console.log("AUCTIONS", auctions)

        // if(!auctions.length){
        //     return res.status(400).json({
        //         success:false,
        //         message:"No auctions found for this user"
        //     });
        // }

        return res.status(200).json({
            success:true,
            message:"All auctions fetched",
            auctions
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching auctions"
        })
    }
}

//delete auction
exports.deleteAuction = async (req, res) => {
    try{
        const { auctionId } = req.params;
        const userId = req.user.id;

        const auction = await Product.findById(auctionId);
        if(!auction){
            return res.status(404).json({
                success:false,
                message:"Auction not found"
            })
        }

        // remove from category schema too
        await Category.updateMany(
            { products: auctionId },
            { $pull: { products: auctionId } }
        );

        // remove from user schema too
        await User.updateMany(
            { products: auctionId },
            { $pull: { products: auctionId } }
        );

        if(auction.seller.toString() !== userId.toString()){
            return res.status(403).json({
                success:false,
                message:"Not Authenticated to delete auction"
            });
        }

        // Delete single image
        if (auction.images) { // ✅ Check if image exists
            try {
                const imagePath = path.join(__dirname, "..", "uploads", path.basename(auction.images));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (err) {
                console.error("Error deleting image:", err);
            }
        }

        await Product.findByIdAndDelete(auctionId);

        return res.status(200).json({
            success: true,
            message: "Auction deleted successfully",
        });
    }
    catch(error){
        console.error("Error deleting auction:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the auction",
        });
    }
}