import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ListSellersComponent } from './list-sellers/list-sellers.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerDialogComponent,
    ProductCardComponent,
    ListSellersComponent,
    SellerDetailsComponent,
    ProductsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [SellersService],
  bootstrap: [AppComponent],
  entryComponents: [SellerDialogComponent]
})
export class AppModule { }
