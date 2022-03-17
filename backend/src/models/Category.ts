import { Schema, model, Document } from "mongoose";

const CategorySchema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

interface ICategory extends Document {
    title: string;
    descriptions: string;
    imagePath: string;
}

export default model<ICategory>("Category", CategorySchema)