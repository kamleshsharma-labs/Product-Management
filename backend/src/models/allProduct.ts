import mongoose, { Document, Schema } from "mongoose";

export interface UserInProduct {
  name:string,
  _id:string,
  _ref:string
}

const UserInProductSchema = new Schema<UserInProduct>({
  name: { type: String, required: true },
  _id: { type: String, required: true },
  _ref: { type: String, required: true },
});

export interface IProducts extends Document {
  name: string;
  price:number;
  description:string;
  imagePath?: string;
  users:UserInProduct
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: false },
  users: {type : UserInProductSchema, require:true},
  imagePath: { type: String, required: false },
}, { timestamps: true });

export default mongoose.model<IProducts>('Products', ProductSchema, 'products');
