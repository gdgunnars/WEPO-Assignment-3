import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ListSellersComponent } from './list-sellers/list-sellers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
		ListSellersComponent,
		ProductCardComponent,
		ProductsDialogComponent,
		SellerDetailsComponent,
		SellerDialogComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	NgbModule.forRoot()
	],
	providers: [SellersService],
	bootstrap: [AppComponent],
	entryComponents: [SellerDialogComponent, ProductsDialogComponent]
})

export class AppModule { }
