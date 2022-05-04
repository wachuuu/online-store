import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CartService } from './services/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
