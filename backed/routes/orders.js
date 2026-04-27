const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

// 📦 get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: OrderItem,
        include: { model: Product }
      }
    })

    if (!order) {
      return res.status(404).json({ message: 'ไม่พบออร์เดอร์' })
    }

    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'error' })
  }
})

module.exports = router
