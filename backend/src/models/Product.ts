import { Schema, model, Document, Types } from "mongoose";
import Category from "./Category";

// type ID = Types.ObjectId

const ProductSchema = new Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref:'Category', required: true},
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


ProductSchema.method('toJSON', function(){
    const { __v,  ...object} = this.toObject();
    // object.uid = _id;
    return object;
})


export default model("Product", ProductSchema)