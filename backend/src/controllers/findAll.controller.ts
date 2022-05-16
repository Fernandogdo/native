import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt.helpers";
import Category from '../models/Category';
import Product from '../models/Product';


export async function getAll(req: any, res: Response): Promise<Response> {
    // const users = await User.find();

    console.log("reqLALA", req.params.name)
    const find = req.params.name; 
    const regex = new RegExp( find , 'i');

    const [users, categories, products] = await Promise.all([
        User.find({name: regex}),
        Category.find({title: regex}),
        Product.find({title: regex}),
    ])


    return res.json({
        ok: true,
        users,
        categories,
        products
    })
}




