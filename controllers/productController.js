const Product=require('../models/Product');
const Firm=require('../models/Firm');
const multer=require('multer');

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/');

    },
    filename: function (req,file,cb){
        cb(null,Date.now()+Path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addProduct= async(req,res)=>{
    
try {
    const {productName,price,category,bestseller,description}=req.body;
    const image=req.file?req.file.filename:undefined;
    const firmId=req.params.firmid;
    const firm=await Firm.findById(firmId);
    if(!firm)
    {
        return res.status(404).json({message:"firm not found"});
    }
    const product=new Product({
        productName,price,category,bestseller,description,image,firm:firm._id
    })
    const savedProduct=await product.save();
     firm.products.push(savedProduct);
    await firm.save();
    console.log("added");
    return res.status(200).json({message:"product added",savedProduct})
    
} catch (error) {
    console.log(error);
    res.status(400).json({message:"internal server error"})
}
}
const getProductByFirm=async(req,res)=>{
    try{
    const firmId=req.params.idd;
    const firm=await Firm.findById(firmId);
    console.log(`firm is ${firm}`);
    if(!firm){
        return res.status(400).json({message:"no firm found"})
    }
    const restaurantName=firm.firmName;
    const products=await Product.find({firm:firmId});
    res.status(200).json({restaurantName,products});
}
catch(error){
    console.log(error);
    res.status(400).json({message:"internal server error"})
}
}
const deleteProductById=async(req,res)=>{
    try {
        const productId=req.params.productId;
        const deletedProduct=await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({error:"no product found"})
        }

    } catch (error) {
        console.log(error);
    res.status(400).json({message:"internal server error"})
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};

