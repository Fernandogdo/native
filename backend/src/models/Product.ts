import { Schema, model, Document, Types } from "mongoose";
import Category from "./Category";

// type ID = Types.ObjectId

const ProductSchema = new Schema({
    title: String,
    category: {type: String, required: true},
    description: String,
    price: Number,
    stock: Number,
    imagePath: String
});

// interface IProduct extends Document {
//     title: string;
//     category: ID;
//     descriptions: string;
//     imagePath: string;
//     price: number;
// }



export default model("Product", ProductSchema)