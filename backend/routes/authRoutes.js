const express = require('express');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  toggleWishlist
} = require('../controllers/authController');

const router = express.Router();


// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protected user routes
router.get('/profile', protect, getUserProfile);
router.delete('/profile', protect, deleteUser);
router.put('/profile/wishlist', protect, toggleWishlist);

module.exports = router;
