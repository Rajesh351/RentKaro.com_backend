const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Message = require("../model/Message");
require("dotenv").config();

// Signup Controller
exports.signup = async (req, res) => {
    try {
        const {name,email,password}= req.body;
      
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        return res.status(201).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again.",
        });
    }
};



exports.logout = async (req, res) => {
    try {
      
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: "Logout failed. Please try again.",
        });
    }
}






exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).populate("liked");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // ✅ Get all messages where current user is the receiver and populate sender's _id and name
    const messages = await Message.find({ receiver: user._id }).populate("sender", "_id name");

    // ✅ Extract unique sender IDs and names
    const senderMap = new Map();
    messages.forEach(msg => {
      if (msg.sender && msg.sender._id) {
        senderMap.set(msg.sender._id.toString(), msg.sender.name);
      }
    });

    // ✅ Format as array of objects: { _id, name }
    const senderIds = Array.from(senderMap.entries()).map(([id, name]) => ({ _id: id, name }));

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      senderIds, // ✅ Now includes name too
      message: "User Login Success",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
      error: error.message,
    });
  }
};

