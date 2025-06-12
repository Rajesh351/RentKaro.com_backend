const mongoose = require("mongoose");
const UserLikes = require("../model/Like");
const User = require("../model/User");
const Post = require("../model/PostProduct");

exports.LikedOrDisLiked = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if already liked
    const index = user.liked.indexOf(productId);

    if (index === -1) {
      // Not liked yet → Like it
      user.liked.push(productId);
      await user.save();

      const likedPosts = await Post.find({ _id: { $in: user.liked } });

      return res.status(200).json({
        success: true,
        likedProducts: likedPosts,
        message: "Liked the product",
      });
    } else {
      // Already liked → Dislike it
      user.liked.splice(index, 1);
      await user.save();

      const likedPosts = await Post.find({ _id: { $in: user.liked } });

      return res.status(200).json({
        success: true,
        likedProducts: likedPosts,
        message: "Disliked the product",
      });
    }
  } catch (err) {

    res.status(500).json({ error: "Server error" });
  }
};


exports.getUserLikes = async (req, res) => {

    const userId = req.user.id;

    try {
        const userLikes = await UserLikes.findOne({ userId }).populate('likedProducts');

        if (!userLikes) {
            return res.json({ likedProducts: [] });
        }

        res.json({ likedProducts: userLikes.likedProducts });
    } catch (err) {
    
        res.status(500).json({ error: 'Server error' });
    }
}





exports.getUserLikes = async (req, res) => {
  const userId = req.user.id;

  try {
    // Get the liked product IDs
    const userLikes = await UserLikes.findOne({ userId });

    if (!userLikes || userLikes.likedProducts.length === 0) {
      return res.json({ likedProducts: [] });
    }

    // Fetch full Post documents based on liked product IDs
    const likedPosts = await Post.find({
      _id: { $in: userLikes.likedProducts }
    });

    res.json({ likedProducts: likedPosts });
  } catch (err) {
   
    res.status(500).json({ error: 'Server error' });
  }
};
