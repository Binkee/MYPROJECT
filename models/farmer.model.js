const mongoose = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const farmerSchema = new mongoose.Schema({
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

const farmerModel = mongoose.model("farmer", farmerSchema);

module.exports = farmerModel