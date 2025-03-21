const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes');
// const cors=require('cors');
const path=require('path');
const app=express()
const PORT=process.env.PORT||4000;
require("dotenv").config();
// app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});
app.use('/home',(req,res)=>{
    res.send("<h1>welcome");
})
       