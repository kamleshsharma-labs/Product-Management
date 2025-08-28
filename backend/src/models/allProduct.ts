import mongoose, { Document, Schema } from "mongoose";

export interface IProducts extends Document {
  name: string;
  price:number;
  description:string;
  imagePath?: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: false },
  imagePath: { type: String, required: false },
}, { timestamps: true });

export default mongoose.model<IProducts>('Products', ProductSchema, 'products');
