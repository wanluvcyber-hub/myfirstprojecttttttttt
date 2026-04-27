const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { canTreatArrayAsAnd } = require('sequelize/lib/utils')
const upload = require('../middleware/upload')

router.post('/',upload.single('image'),async(req,res)=>{
    try{
        const {name,price,stock} = req.body

        const product = await Product.create({
            name,
            price,
            stock,
            image: req.file ? `uploads/${req.file.filename}` : null
        })
        res.json(product)
    } catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }
})

router.get('/getProducts',async(req,res)=>{
    try{
        const product = await Product.findAll()
        res.json(product)
    }catch{
        res.status(500).json({message:'error'})
    }
})

router.get('/getProductsById/:id',async(req,res)=>{
    try{
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({message:'ไม่พบสินค้า'})
            res.json(product)
    }catch{
        res.status(500).json({message:'error'})
    }
})

router.put('/updateProduct/:id',async(req,res)=>{
    try{
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({message:'ไม่พบสินค้า'})
        await product.update(req.body)
        res.json(product)
    }catch{
        res.status(500).json({message:'error'})
    }
})

router.delete('/deleteProduct/:id',async(req,res)=>{
    try{
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({message:'ไม่พบสินค้า'})
        await product.destroy()
        res.json({message:"ลบสำเร็จ"})
    }catch{
        res.status(500).json({message:'error'})
    }
})

module.exports = router