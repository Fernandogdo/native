import { Schema, model, Document } from "mongoose";
import Product from "./Product";



const UserSchema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true, },
    role: {type: String, required: true, default: 'USER_ROLE'}
    // imagePath: String
});



UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

export default model("User", UserSchema)
// export default model<IUser>("User", UserSchema)