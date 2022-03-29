const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = {
  // status: {
  //   type: String,
  //   required: true,
  // },
  // activate_key: {
  //   type: String,
  //   required: false,
  // },
  name: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  nickname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
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
  friends_groups: {
    type: Array,
    required: false
  },
  block_list: {
    type: Array,
    required: false
  },
  posts_id: {
    type: Array,
    required: false
  },
  bio: {
    type: String,
    required: false
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
