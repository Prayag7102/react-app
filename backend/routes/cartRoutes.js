const express = require('express');
const { addToCart,getCartItems, removeFromCart, updateCartItem  } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Add product to cart
router.post('/cart',verifyToken, addToCart);
router.get('/getCartItem',verifyToken, getCartItems);
router.delete('/remove/:productId',verifyToken, removeFromCart);
router.patch('/update/:productId',verifyToken, updateCartItem);


module.exports = router;