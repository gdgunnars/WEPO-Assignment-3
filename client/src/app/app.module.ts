import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SellersService } from './sellers.service';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
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
  entryComponents: [SellerDialogComponent]
})
export class AppModule { }
