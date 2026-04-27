const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const OrderItem = require('../models/OrderItem')

const auth = require('../middleware/auth')


// 🛒 checkout
router.post('/checkout',auth, async (req, res) => {
  try {
    const userId = req.user.id

    const cartItem = await Cart.findAll({
      where: { UserId: userId },
      include: {model:Product}
    })

    if (cartItem.length === 0) {
      return res.status(400).json({ message: 'ไม่มีสินค้าในตะกร้า' })
    }

    let total = 0
    cartItem.forEach(item => {
      total += item.Product.price * item.quantity
    })

    // สร้าง Order
    const order = await Order.create({
      UserId: userId,
      total
    })

  // สร้าง OrderItem ทีละตัว
  for(let item of cartItem){
    await OrderItem.create({
      OrderId:order.id,
      ProductId:item.ProductId,
      quantity:item.quantity,
      price:item.Product.price
    })
  }

    await Cart.destroy({ where: { UserId: userId } })

    res.json({
      message: "สั่งซื้อสำเร็จ",
      orderId:order.id,
      total
    })
  } catch (err) {
    res.status(500).json({ message: 'error' })
  }
})

// ➕ add to cart
router.post('/add', auth,async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user.id

    const exist = await Cart.findOne({
      where: { UserId: userId, ProductId: productId }
    })

    if (exist) {
      await exist.update({
        quantity: exist.quantity + quantity
      })
      return res.json(exist)
    }

    const item = await Cart.create({
      UserId: userId,
      ProductId: productId,
      quantity
    })

    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "error" })
  }
})

// 📦 get cart
router.get('/',auth, async (req, res) => {
  try {
    const userId = req.user.id

    const cartItem = await Cart.findAll({
      where: { UserId: userId },
      include: {model:Product}
    })

    res.json(cartItem)
  } catch (error) {
    res.status(500).json({ message: "error" })
  }
})


// ❌ delete item
/router.delete('/:id',auth, async (req, res) => {
  try {
    await Cart.destroy({
      where: { id: req.params.id }
    })

    res.json({ message: "ลบสำเร็จ" })
  } catch {
    res.status(500).json({ message: 'error' })
  }
})

// เเก้ไข้สินค้าในตะกร้า
// เพิ่มจำนวน
router.put('/increase/:id',auth,async(req,res)=>{
  const item = await Cart.findByPk(req.params.id)
  item.quantity += 1
  await item.save()
  res.json(item)
})

// ลดจำนวน
router.put('/decrease/:id', auth, async (req,res)=>{
  const item = await Cart.findByPk(req.params.id)

  if(item.quantity > 1){
    item.quantity -= 1
    await item.save()
  }else{
    await item.destroy() // เหลือ 1 แล้วลบเลย
  }

  res.json({message:'updated'})
})
module.exports = router