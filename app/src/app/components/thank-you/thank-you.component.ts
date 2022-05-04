import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Status, StatusCode, StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {

  codes = StatusCode;
  status: Status;
  constructor(
    private readonly statusService: StatusService,
    private readonly router: Router,
    private readonly cartService: CartService
    ) {
    this.status = { code: this.codes.NONE };
    this.statusService.orderStatus$.subscribe((data) => {
      this.status = data;
    })
  }

  backtoShop() {
    this.cartService.clear(null);
    this.router.navigate(['/']);
  }
}
