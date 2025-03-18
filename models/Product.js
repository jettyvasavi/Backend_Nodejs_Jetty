const mongoose=require('mongoose');

const productSchema=new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        price :{
            type:String
        },
        category :{
            type:String
        },
        image:{
            type:String
        },
        bestseller:{
            type:String,
        },
        description:{
            type:String,
        },
        firm:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Firm'

            }
        ]
    }
)
const Product=mongoose.model('Product',productSchema);
module.exports=Product;