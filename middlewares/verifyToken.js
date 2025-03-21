const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');
dotEnv.config();
const secretKey=process.env.whatismyname;

const verifyToken=async (req,res,next)=>{
   const token=req.headers.token;
   if(!token)
   {
    return res.status(400).json({error:"token is required"})
   }
   try {
    const decoded=jwt.verify(token,secretKey)
    const vendor=await Vendor.findById(decoded.vendorId);
    if(!vendor)
    {
        return res.status(400).json({error:"vendor not found"});
    }
    req.vendorId=vendor._id;
    next()
   } catch (error) {
    console.log(error)
    res.status(400).json({error:"internal token"});
   }
}
module.exports=verifyToken