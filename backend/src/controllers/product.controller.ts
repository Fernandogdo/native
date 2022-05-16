import {Request, Response} from 'express'
import  Product  from '../models/Product'
import path  from 'path'; 
import fs from 'fs-extra';
// import { setTokenSourceMapRange } from 'typescript';

export async function getProducts(req:Request, res:Response): Promise<Response>{
    const products = await Product.find()
                                    .populate('category', 'title')
    return res.json(products)
}

export async function getProduct(req:Request, res:Response): Promise<Response>{
    const { id } = req.params
    const product = await Product.findById(id).populate('category', 'title')
    // console.log(req.params.id)
    return res.json(product)
}

export async function createProduct(req:Request, res:Response){
    
    const { title, category, description, price, stock } = req.body
    
    // console.log("category", category)
    const newPhoto = {
        title: title,
        category: category,
        description: description,
        price: price,
        stock: stock,
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
    const {title, category, description, price, stock } = req.body;
    // console.log("editado", req.body)
    const updatedProduct = await Product.findByIdAndUpdate(id, {
        title,
        category,
        description,
        price,
        stock
    }, {new: true});

    console.log("updatedProduct", updatedProduct)

    return res.json({
        message: "Update susccesfully",
        updatedProduct
    })

}