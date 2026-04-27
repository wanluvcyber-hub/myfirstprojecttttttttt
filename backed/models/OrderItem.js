const {DataTypes} = require("sequelize")
const sequelize =  require('../config/db')
const OrderItem = sequelize.define("OrderItem",{
    quantity:{
        type:DataTypes.INTEGER,allowNull:false},
    pirce:{
        type:DataTypes.FLOAT,allowNullL:false}
})
module.exports = OrderItem