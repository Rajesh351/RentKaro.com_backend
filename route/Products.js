const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudnary");
const upload = require("../utils/mutler");
const Post = require("../model/PostProduct");
const { auth } = require("../middlewares/Auth");
const User = require("../model/User");

// 🚀 Route: POST /upload
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const {
      brandName,
      purchaseYear,
      adTitle,
      description,
      setPrice,
      state,
      city,
      mobileNo
    } = req.body;

    const userId = req.user.id;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "car_ads",
      timeout: 60000
    });

    // ✅ Create New Post
    const newPost = await Post.create({
      brandName,
      purchaseYear,
      adTitle,
      description,
      setPrice,
      state,
      city,
      mobileNo,
      image: result.secure_url,
      userId
    });

    // ✅ Fetch All Posts After Creation
    const allPosts = await Post.find().sort({ createdAt: -1 }); // latest first

    res.status(201).json({
      success: true,
      message: "Uploaded successfully",
      newPost,
      allPosts,
    });

  } catch (err) {
  
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});
module.exports = router;
