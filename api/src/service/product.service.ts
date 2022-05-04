import { DocumentDefinition } from 'mongoose';
import Product, { IProduct } from '../models/product.model';

export async function createProduct(input: DocumentDefinition<IProduct>) {
  const newProduct = new Product(input);
  return await Product.create(newProduct);

}

export async function deleteProduct(id: string) {
  return await Product.findOneAndDelete({ _id: id }, { lean: true })
}

export async function updateProduct(input: DocumentDefinition<IProduct>) {
  let { _id, ...body } = input;
  return await Product.findOneAndUpdate({ _id: input._id }, { $set: body }, { lean: true, new: true })
}

export async function decrementProductQunatity(id: string, decrement: number) {
  return new Promise((resolve, reject) => {
    Product.findOne({ _id: id }).then((data) => {
      if (data?.quantity != null) {
        if (data.quantity >= decrement && decrement > 0) {
          let newQuantity = data.quantity - decrement;
          Product.findOneAndUpdate({ _id: id }, { $set: { quantity: newQuantity } }, { lean: true, new: true }).then((afterUpdate) => {
            resolve(afterUpdate);
          }, (err) => reject(err))
        } else {
          reject({ message: 'Not enough product' });
        }
      } else {
        reject({ message: 'Invalid document' });
      }
    }, () => {
      reject({ message: 'No document found' });
    })
  })
}

export async function getProducts() {
  return await Product.find();
}
