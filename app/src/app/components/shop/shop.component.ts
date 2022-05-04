import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items: Product[] = []
  constructor(readonly productsService: ProductsService) {
    this.productsService.products$.subscribe((data) => {
      this.items = data;
    })
  }

  ngOnInit(): void {
    this.productsService.getProducts()
  }
}
