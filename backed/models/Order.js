// sequelize.define() คือการบอกว่า "ตาราง Users ใน MySQL มีคอลัมน์อะไรบ้าง" Sequelize จะสร้างตารางให้เองอัตโนมัติตอน sync
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Order = sequelize.define('Order',{
    total:{type:DataTypes.FLOAT,
    allowNull:false},
    status:{type:DataTypes.STRING,defaultValue:'pending'}
})

module.exports = Order