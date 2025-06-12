
const { login, signup, logout } = require('../controllers/auth')
const { auth } = require("../middlewares/Auth");
const { createPost}  = require("../controllers/postController")
const upload = require("../utils/mutler");
const express = require("express");
const router = express.Router();
const  {getProductsdeatils}=require("../controllers/postController")
const { LikedOrDisLiked,getUserLikes } = require("../controllers/Likescontroller")
const Message=require("../model/Message")

// Route to handle form + image upload


router.post('/signup', signup);

router.post('/login', login);
router.get('/logout', auth, logout)
//http://localhost:5000/api/v1/login
router.get('/getProducts',getProductsdeatils); 


router.post("/likeordislike",auth,LikedOrDisLiked);
router.get("/getUserLike",auth,getUserLikes)
//http://localhost:5000/api/v1/likeordislike

router.get('/chat/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
