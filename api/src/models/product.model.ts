import mongoose from 'mongoose';


export interface IProduct {
  _id: string,
  name: string,
  description?: string,
  thumbnail?: string,
  price: number,
  quantity: number,
};

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: String,
  thumbnail: String
}, {
  versionKey: false
});

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product
