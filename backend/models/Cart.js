const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      color: {
        type: String,
        required: false,
        default: function() {
          return this.product.colors[0];
        }
      },
      size: {
        type: String,
        required: false,
        default: function() {
          return this.product.sizes[0];
        }
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CartSchema.virtual('totalPrice').get(function () {
  return this.products.reduce((total, item) => {
    const product = item.product; 
    const productPrice = product.discountedPrice || product.price;
    return total + (productPrice * item.quantity);
  }, 0);
});

module.exports = mongoose.model('cart', CartSchema);
