const {Router}=require("express");
const {ProductModel}=require("../model/product.model");

// const jwt=require("jsonwebtoken");

const productRouter=Router();

productRouter.get("/",async(req,res)=>{
    const {q,sort}=req.query;
    try{
        if(sort=="asc"){
            const data= await ProductModel.find({catagory:q}).sort({price:1}); 
            res.status(200).send({"data":data});
 
        }else if(sort=="desc"){
            const data= await ProductModel.find({catagory:q}).sort({price:-1}); 
            res.status(200).send({"data":data});

        }else{
            const data= await ProductModel.find();
            res.status(200).send({"data":data});
        }

    }catch(err){
        res.status(400).send({"err":err.message});

    }
});

productRouter.post("/add",async(req,res)=>{
    try{
        const product= new ProductModel(req.body);
        //console.log(product);
        await product.save();
        res.status(200).send({"msg":"product added..."});

    }catch(err){
        res.status(400).send({"err":err.message});

    }
})



module.exports={productRouter};


// productRouter.get("/suits",async(req,res)=>{
//     try{
//          const data= await ProductModel.find({catagory:"suits"});
//          res.status(200).send({"data":data});

//     }catch(err){
//         res.status(400).send({"err":err.message});

//     }
// });

// productRouter.get("/pants",async(req,res)=>{
//     try{
//          const data= await ProductModel.find({catagory:"pants"});
//          res.status(200).send({"data":data});

//     }catch(err){
//         res.status(400).send({"err":err.message});

//     }
// });

