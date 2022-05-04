import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()
  product!: Product

  constructor(private readonly cartService: CartService, private readonly router: Router) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigate(['cart'])
  }

}
