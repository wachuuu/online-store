import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = []
  total: number = 0;
  constructor(readonly cartService: CartService) {
    cartService.cart$.subscribe(data => {
      this.cartItems = data;
      this.total = data.map(item => item.product.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
    })
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.cart;
  }

  finalize() {
    this.cartService.finalize();
  }

  clear() {
    this.cartService.clear(null);
  }
}
