const mongoose = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new mongoose.Schema({
  product:{
    type: String,
    enum: ['Vegetables', 'AnimalProducts']
  },
  farmerID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "farmer"
  },
  name: String,
  quantity: Number,
  price: Number
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;