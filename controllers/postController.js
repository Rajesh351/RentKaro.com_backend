const Post=require("../model/PostProduct")


exports.getProductsdeatils= async (req, res) => {
  try {
    //const file = req.files.photo;
    const post=await Post.find({}).populate("userId")
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }
    res.status(200).json({
      success: true,
      post:post,
    });

  } catch (err) {
  
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
