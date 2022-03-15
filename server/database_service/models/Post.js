const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = {
  image_url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user_id: {
    type: Object,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: false
  },
  users_tag: {
    type: Array,
    required: false
  },
  users_like: {
    type: Array,
    required: false
  },
  comments: {
    type: Array,
    required: false
  }
};

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
