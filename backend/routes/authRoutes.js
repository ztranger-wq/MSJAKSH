const express = require('express');
const router = express.Router();
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
const { protect } = require('../middleware/authMiddleware');

// Public auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protected Profile routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);

// Protected Wishlist route
router.put('/profile/wishlist', protect, toggleWishlist);

module.exports = router;