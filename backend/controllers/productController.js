const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { brand, category, search, limit } = req.query;
  const filter = {};

  if (brand) filter.brand = brand;
  if (category) filter.category = category;
  if (search) {
    filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
  }

  try {
    let query = Product.find(filter);
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    const products = await query.exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};