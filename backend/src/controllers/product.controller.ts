import {Request, Response} from 'express'
import  Product  from '../models/Product'
import path  from 'path'; 
import fs from 'fs-extra';

export async function getProducts(req:Request, res:Response): Promise<Response>{
    const categories = await Product.find();
    return res.json(categories)
}

export async function getProduct(req:Request, res:Response): Promise<Response>{
    const { id } = req.params
    const product = await Product.findById(id)
    // console.log(req.params.id)
    return res.json(product)
}

export async function createProduct(req:Request, res:Response){
    
    const { title, category, description, price } = req.body
    
    // console.log("category", category)
    const newPhoto = {
        title: title,
        category: category,
        description: description,
        price: price,
        imagePath: req.file?.path
    }
    const product = new Product(newPhoto);

    await product.save();

    return res.json({
        message: "creado correcto",
        product
    })
}


export async function deleteProduct(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id);
    if (product){
        fs.unlink(path.resolve(product.imagePath))
    }
    return res.json({
        message: "Product deleted",
        product
    })
}


export async function updatedProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {title, description, price } = req.body;
    console.log("editado", req.body)
    const updatedProduct = await Product.findByIdAndUpdate(id, {
        title,
        description,
        price
    }, {new: true});

    return res.json({
        message: "Update susccesfully",
        updatedProduct
    })

}