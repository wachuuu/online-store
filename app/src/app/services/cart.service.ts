import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _cart$ = new BehaviorSubject<CartItem[]>([]);
  readonly cart$ = this._cart$.asObservable();
  get cart() { return this._cart$.getValue() };
  set cart(value) { this._cart$.next(value) }
  
  constructor(private readonly productsService: ProductsService) { }

  addToCart(product: Product) {
    let index = this.cart.findIndex(item => item.product._id === product._id)
    if (index > -1) {
      this.cart[index].quantity = Math.min(this.cart[index].quantity + 1, this.cart[index].product.quantity);
      this._cart$.next(this.cart)
    } else {
      let newItem: CartItem = {
        product: product,
        quantity: 1,
      };
      this.cart = [newItem, ...this.cart];
    }
  }

  finalize() {
    this.cart.forEach((item) => {
      let product: Product = {...item.product, quantity: Math.max(item.product.quantity - item.quantity, 0)};
      console.log(product)
    })
  }

  clear(id: string | null) {
    if(!id) {
      this.cart = [];
    } else {
      this.cart.findIndex(item => item.product._id === id);
    }
  }
}
