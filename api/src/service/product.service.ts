import { DocumentDefinition } from 'mongoose';
import Product, { IProduct } from '../models/product.model';

export async function createProduct(input: DocumentDefinition<IProduct>) {
  const newProduct  = new Product(input);
  const result = Product.create(newProduct);
  return result;
}

export async function deleteProduct(id: string) {
  const result = await Product.findOneAndDelete({_id: id}, {lean: true})
  return result;
}

export async function updateProduct(input:DocumentDefinition<IProduct>) {
  let {_id, ...body} = input;
  const result = await Product.findOneAndUpdate({_id: input._id}, {$set: body}, {lean: true} )
  return result;
}

export async function getProducts() {
  const result = await Product.find();
  return result;
}
