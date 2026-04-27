const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const hashed = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashed})
        
        res.json({message:'สมัครสมาชิกสำเร็จ',useID:user.id})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"อีเมลนี้ถูกใช้เเล้ว"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) return res.status(404).json({message:"ไม่พบผู้ใช้"})

        const match = await bcrypt.compare(password,user.password)
        if (!match) return res.status(404).json({message:"รหัสผ่านไม่ถูกต้อง"})
        

    // สร้าง JWT token อายุ 7 วัน เก็บ id และ role ของ user ไว้ใน token

        const token = jwt.sign(
            {id:user.id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        console.log(token)
        res.json({
            message:"เข้าสู่ระบบได้สำเร็จ",
            token
        })
    }catch(err){
        res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
})

module.exports = router