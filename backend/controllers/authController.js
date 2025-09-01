const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // We don't want to reveal if a user exists or not
      return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // 1. Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token and save it to the user document
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. Set an expiry for the token (e.g., 10 minutes)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 4. Create the reset URL and simulate sending an email
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    console.log('--- PASSWORD RESET ---');
    console.log('Simulating email sending...');
    console.log(`Reset URL: ${resetURL}`);
    console.log('----------------------');

    res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });

  } catch (error) {
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // 1. Get user based on the hashed token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() } // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    // 2. Set the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      // Note: A password update would typically require the current password for security.
      // This is kept simple to only update the name for now.

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id), // Re-issue token
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    const index = user.wishlist.indexOf(productId);

    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};