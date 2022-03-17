import {Request, Response} from 'express'
import  Category  from '../models/Category'
import path  from 'path'; 
import fs from 'fs-extra';

export async function getCategories(req:Request, res:Response): Promise<Response>{
    const categories = await Category.find();
    return res.json(categories)
}

export async function getCategory(req:Request, res:Response): Promise<Response>{
    const { id } = req.params
    const category = await Category.findById(id)
    // console.log(req.params.id)
    return res.json(category)
}

export async function createCategory(req:Request, res:Response): Promise<Response>{
    const { title, description} = req.body
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    };

    const category = new Category(newPhoto);
    await category.save()

    return res.json({
        message: 'Photo created successfully',
        category
    })
}


export async function deleteCategory(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const category = await Category.findByIdAndRemove(id);
    if (category){
        fs.unlink(path.resolve(category.imagePath))
    }
    return res.json({
        message: "Category deleted",
        category
    })
}


export async function updatedCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {title, description } = req.body;
    console.log(req.body)
    const updatedCategory = await Category.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});

    return res.json({
        message: "Update susccesfully",
        updatedCategory
    })

}