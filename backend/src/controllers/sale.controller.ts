import {Request, Response} from 'express'
import  Sale  from '../models/Sale'
import path  from 'path'; 
import fs from 'fs-extra';

export async function getSales(req:Request, res:Response): Promise<Response>{
    const sales = await Sale.find();
    return res.json(sales)
}

export async function getSale(req:Request, res:Response): Promise<Response>{
    const { id } = req.params
    const sale = await Sale.findById(id)
    // console.log(req.params.id)
    return res.json(sale)
}

export async function createSale(req:Request, res:Response): Promise<Response>{
    const { title, description, date, month, total, products} = req.body
    console.log(req.body.products)
    const newPhoto = {
        title: title,
        description: description,
        date: date,
        month: month,
        total: total,
        products: products
        // imagePath: req.file?.path
    };

    // console.log("products", products)
    console.log("SALES", newPhoto)

    const sale = new Sale(newPhoto);
    console.log("sale", sale)
    await sale.save()

    return res.json({
        message: 'Photo created successfully',
        sale
    })
}


export async function deleteSale(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const sale = await Sale.findByIdAndRemove(id);
    // if (sale){
    //     fs.unlink(path.resolve(sale.imagePath))
    // }
    return res.json({
        message: "Sale deleted",
        sale
    })
}


export async function updatedSale(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {title, description, month} = req.body;
    console.log(req.body)
    const updatedSale = await Sale.findByIdAndUpdate(id, {
        title,
        description,
        month
    }, {new: true});

    return res.json({
        message: "Update susccesfully",
        updatedSale
    })

}