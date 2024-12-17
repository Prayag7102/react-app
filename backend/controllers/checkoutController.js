const Product = require("../models/Product");
const Checkout = require('../models/checkoutmodel');

// Create a new checkout
const createCheckout = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const { userId: requestUserId, products, address, paymentMethod } = req.body;

    if (userId !== requestUserId) {
      return res.status(403).json({ message: "User ID mismatch." });
    }

    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product: ${product.name}.` });
      }
      totalPrice += product.price * item.quantity;
    }

    const checkout = await Checkout.create({
      userId,
      products,
      totalPrice,
      address,
      paymentMethod,
    });

    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    return res.status(201).json({ message: "Checkout successful.", checkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
// Get checkout details
const getCheckoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await Checkout.findById(id).populate("userId").populate("items.productId");
    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }
    res.status(200).json({ checkout });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve checkout details", details: error.message });
  }
};


module.exports = {getCheckoutById,createCheckout }