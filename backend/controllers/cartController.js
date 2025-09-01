const User = require('../models/User');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const itemIndex = user.cart.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    const populatedUser = await User.findById(req.user._id).populate('cart.product');
    res.status(201).json(populatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(p => p.product.toString() !== productId);

    await user.save();
    const populatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(populatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.mergeCart = async (req, res) => {
    const { guestCart } = req.body; // guestCart is an array of { product: {_id, ...}, quantity }

    if (!guestCart || guestCart.length === 0) {
        return res.status(200).json({ message: "No guest cart to merge." });
    }

    try {
        const user = await User.findById(req.user._id);

        guestCart.forEach(guestItem => {
            const itemIndex = user.cart.findIndex(
                userItem => userItem.product.toString() === guestItem.product._id
            );

            if (itemIndex > -1) {
                // If item exists, update quantity (e.g., sum them up, or take the max)
                // Here we'll just update to the guest's quantity if it's higher
                if (guestItem.quantity > user.cart[itemIndex].quantity) {
                    user.cart[itemIndex].quantity = guestItem.quantity;
                }
            } else {
                // If item doesn't exist, add it
                user.cart.push({ product: guestItem.product._id, quantity: guestItem.quantity });
            }
        });

        await user.save();
        const populatedUser = await User.findById(req.user._id).populate('cart.product');
        res.json(populatedUser.cart);

    } catch (error) {
        console.error("Merge cart error:", error);
        res.status(500).json({ message: 'Server Error during cart merge' });
    }
};
