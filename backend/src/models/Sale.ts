import { Schema, model, Document } from "mongoose";
import Product from "./Product";



const SaleSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    month: {type:String, default: 'Enero'},
    total: {type:Number, default: 0},
    products: [
        { 
            title: { type:String, required: true},
            price: { type:Number, required: true},
            quantity: {type: Number, required: true},
        }
    ]
    // imagePath: String
});

export default model("Sale", SaleSchema)
// export default model<ISale>("Sale", SaleSchema)