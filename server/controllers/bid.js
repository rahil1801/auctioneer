const Bid = require("../models/Bid.js");
const Product = require("../models/Product.js");

// 1️⃣ Place a bid
export const placeBid = async (req, res) => {
  try {
    const { productId, amount } = req.body;

    if (!productId || !amount) {
      return res.status(400).json({ message: "Product ID and amount are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if bid is higher than current highest bid
    const highestBid = await Bid.findOne({ product: productId }).sort({ amount: -1 });
    if (highestBid && amount <= highestBid.amount) {
      return res.status(400).json({ message: `Your bid must be higher than ${highestBid.amount}` });
    }

    const newBid = await Bid.create({
      product: productId,
      bidder: req.user.id,
      amount
    });

    return res.status(201).json({ message: "Bid placed successfully", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Edit a bid
export const editBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Bid amount is required" });
    }

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Ensure only the bidder can edit their bid
    if (bid.bidder.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own bids" });
    }

    // Check if new amount is higher than current highest bid
    const highestBid = await Bid.findOne({ product: bid.product }).sort({ amount: -1 });
    if (highestBid && amount <= highestBid.amount && highestBid._id.toString() !== bidId) {
      return res.status(400).json({ message: `Your new bid must be higher than ${highestBid.amount}` });
    }

    bid.amount = amount;
    await bid.save();

    return res.status(200).json({ message: "Bid updated successfully", bid });
  } catch (error) {
    console.error("Error editing bid:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Delete a bid
export const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Ensure only the bidder can delete their bid
    if (bid.bidder.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own bids" });
    }

    await bid.deleteOne();

    return res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    console.error("Error deleting bid:", error);
    res.status(500).json({ message: "Server error" });
  }
};
