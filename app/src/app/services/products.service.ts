import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly url: string = `${environment.apiUrl}/products`

  private readonly _products$ = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products$.asObservable();
  get products() { return this._products$.getValue() };
  set products(value) { this._products$.next(value) }
  
  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router,
    private readonly status: StatusService,
    ) {
    this.getProducts()
  }

  public getProducts() {
    this.http.get<Product[]>(this.url, {observe: 'response'}).subscribe((response) => {
      if (response.ok && response.body) this.products = response.body;
    })
  }

  public addProduct(product: Product) {
    this.http.post<Product>(this.url, product, {observe: 'response'}).subscribe((response) => {
      if (response.ok && response.body) this.products = [...this.products, response.body];
    })
  }

  public updateProduct(product: Product) {
    this.http.put<Product>(`${this.url}/${product._id}`, product, {observe: 'response'}).subscribe((response) => {
      if (response.ok && response.body) {
        const index = this.products.findIndex((item) => item._id === response.body?._id);
        if (index > -1) {
          this.products[index] = response.body;
          this._products$.next(this.products);
        }
      }
    })
  }

  public deleteProduct(product: Product) {
    this.http.delete<Product>(`${this.url}/${product._id}`, {observe: 'response'}).subscribe((response) => {
      if (response.ok) {
        const index = this.products.findIndex((item) => item._id === product._id);
        this.products.splice(index, 1);
        this._products$.next(this.products);
      }
    })
  }

  public buyProducts(products: CartItem[]) {
    this.http.post(`${this.url}/buy`, products, { observe: 'response' }).subscribe((response) => {
      if (response.ok) {
        this.router.navigate(['thank-you']);
        this.status.setPendingStatus('We\'re transferring your order');
        setTimeout(() => {
          this.status.setCompletedStatus('All completed')
        }, 1000)
      } else {
        this.router.navigate(['thank-you']);
        this.status.setPendingStatus('We\'re transferring your order');
        setTimeout(() => {
          this.status.setFailedStatus(response.statusText)
        }, 1000)
      }
    })
  }
}
