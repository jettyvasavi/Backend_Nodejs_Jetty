const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');
router.post('/add-product/:firmid',productController.addProduct);
router.get('/:idd/products',productController.getProductByFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:productId',productController.deleteProductById);

module.exports=router;

