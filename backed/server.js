const express = require("express")
const cors = require('cors')
require('dotenv').config({path:'../.env'})

const sequelize = require('./config/db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const Cart = require('./models/Cart')
const OrderItem = require('./models/OrderItem')

// Relation)
User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)

User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)


const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const CartRoutes = require('./routes/cart')
const ordersRoutes = require('./routes/orders')

const app = express()
app.use(cors())
app.use(express.json())

sequelize.sync().then(()=>{
    console.log("Database connected & tables synced!")
})

app.get('/',(req,res)=>{
    res.json({message:'MyShop API runing!'})
})

app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',CartRoutes)
app.use('/api/orders',ordersRoutes)
app.use('/uploads',express.static('uploads'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Server runing on port ${PORT}`))
 