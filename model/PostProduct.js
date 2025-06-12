const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  purchaseYear: { type: String, required: true },
  adTitle: { type: String, required: true },
  description: { type: String, required: true },
  setPrice: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  mobileNo: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
module.exports=mongoose.model("Post", postSchema);
