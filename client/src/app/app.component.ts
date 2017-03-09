import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private sellers: Seller[];
  private seller: Seller;

  constructor(private service : SellersService) {}

  ngOnInit() {
      // Kallað í þennan handler ef allt gekk upp
      var successHandler = (result) => {
          this.seller = result;
      };

      // Kallað í þennan handler ef eitthvað klikkar
      var errorHandler = (err) => {
          // TODO: display toastr!
          console.log("Something failed");
      }

      this.service.getSellerById(2).subscribe(successHandler, errorHandler);

      // NOTE: Líka hægt að gera þetta svona:
      /*
      this.service.getSellerById(1337).subscribe((result) => {
          this.seller = result;
      }, (err) => {
          // TODO: display toastr!
          console.log("Something failed");
      });
      */

      /*
      this.service.getSellers().subscribe(result => {
          this.sellers = result;
      });
      */
  }
}
