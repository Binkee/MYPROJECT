const mongoose = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const costumerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const costumerModel = mongoose.model("costumer", costumerSchema);

module.exports = costumerModel;
