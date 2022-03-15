const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = {
  name: {
    type: String,
    required: true
  },
  users_id: {
    type: Array,
    required: true
  }
};

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
