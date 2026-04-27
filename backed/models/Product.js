// sequelize.define() คือการบอกว่า "ตาราง Users ใน MySQL มีคอลัมน์อะไรบ้าง" Sequelize จะสร้างตารางให้เองอัตโนมัติตอน sync
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Product = sequelize.define('Product',{
    name:     { type: DataTypes.STRING, allowNull: false },
    price:     { type: DataTypes.FLOAT, allowNull:false},
    stock:     { type: DataTypes.INTEGER, defaultValue:0 },
    image:     { type: DataTypes.STRING},
    category :{type:DataTypes.STRING}
})

// ทำให้ไฟล์อื่นออกไปใช้ได้
module.exports = Product