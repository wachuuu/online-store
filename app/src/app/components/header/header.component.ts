import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartLength: number = 0;
  constructor(private readonly cartService: CartService) {
    this.cartService.cart$.subscribe(data => {
      this.cartLength = data.length;
    })
  }
}
