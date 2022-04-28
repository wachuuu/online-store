import { DocumentDefinition } from 'mongoose';
import Product, { IProduct } from '../models/product.model';

export async function createProduct(input: DocumentDefinition<IProduct>) {
}

export async function deleteProduct(input: DocumentDefinition<IProduct>) {
}

export async function getProducts() {
  const result = await Product.find()
  return result
}
