const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = {
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: Object,
    required: true
  },
  post_id: {
    type: Object,
    required: true
  },
  users_like: {
    type: Object,
    required: false
  },
  date: {
    type: Date,
    required: true
  }
};

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
