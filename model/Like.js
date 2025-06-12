// models/UserLikes.js
const mongoose = require('mongoose');

const UserLikesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

module.exports = mongoose.model('UserLikes', UserLikesSchema);
