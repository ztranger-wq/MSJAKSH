const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, updateUserProfile, deleteUser, getWishlist, toggleWishlist } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.route('/profile')
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);

router.route('/profile/wishlist')
  .get(protect, getWishlist)
  .put(protect, toggleWishlist);

module.exports = router;