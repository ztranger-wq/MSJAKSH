const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrderById, getMyOrders, updateOrderToPaid, cancelOrder, getOrderStats } = require('../controllers/orderController');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/stats', protect, getOrderStats);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
