import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ListSellersComponent } from './list-sellers/list-sellers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		ListSellersComponent,
		ProductCardComponent,
		ProductsDialogComponent,
		SellerDetailsComponent,
		SellerDialogComponent,
		NavBarComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		NgbModule.forRoot(),
		RouterModule.forRoot([{
			path: '',
			redirectTo: 'sellers',
			pathMatch: 'full'
		}, {
			path: 'sellers',
			component: ListSellersComponent
		}, {
			path: 'sellers/details/:id',
			component: SellerDetailsComponent
		}])
	],
	providers: [SellersService],
	bootstrap: [AppComponent],
	entryComponents: [SellerDialogComponent, ProductsDialogComponent]
})

export class AppModule { }
