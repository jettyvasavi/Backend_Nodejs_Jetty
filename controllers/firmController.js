const Firm=require('../models/Firm');
const Vendor = require('../models/Vendor');
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

const addFirm= async(req,res)=>{
    
    try{
        const {firmName,area,category,region,offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    const vendor=await Vendor.findById(req.vendorId);
    if (!vendor){
       return res.status(404).json({message:"vendor not found"})
    }
    let existingFirm = await Firm.findOne({ firmName });
    if (existingFirm) {
      return res.status(400).json({ message: "Firm already exists" });
    }
    const firm=new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor:vendor._id

    })
//  const savedFirm=await firm.save();
// vendor.firm.push(savedFirm)
// await vendor.save()
const savedFirm = await firm.save();

    // Ensure vendor.firm is an array before pushing
    if (!Array.isArray(vendor.firm)) {
      vendor.firm = []; // Initialize if undefined
    }

    // Push only the Firm's ObjectId
    vendor.firm.push(savedFirm._id);
    await vendor.save();

return res.status(200).json({message:"firm added successfully"})
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"internal server error"})
    }

    
}
const deleteFirmById=async(req,res)=>{
    try{
    const firmId=req.params.firmId;
    const deletedFirm=await Firm.findByIdAndDelete(firmId);
    if(!deletedFirm){
        return res.status(404).json({error:"no firm found"})
    }

    }
    catch (error) {
        console.log(error);
    res.status(400).json({message:"internal server error"})
    }
}
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById};