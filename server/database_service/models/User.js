const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = {
  name: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  google_id: {
    type: String,
    required: false
  },
  facebook_id: {
    type: String,
    required: false
  },
  friends_id: {
    type: Array,
    required: false
  },
  friends_group_id: {
    type: Array,
    required: false
  },
  block_list: {
    type: Array,
    required: false
  },
  posts: {
    type: Array,
    required: false
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
