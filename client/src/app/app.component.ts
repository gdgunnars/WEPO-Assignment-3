import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private sellers: Seller[];
  private seller: Seller;

  constructor(private service : SellersService,
              private modalService: NgbModal) {}

  addSeller() {
    const modalInstance = this.modalService.open(SellerDialogComponent);
    modalInstance.componentInstance.seller = {
        name: "Daníel",
        category: "Hannyrðir",
        imagePath: "http://example.com",
        id: 7
    };
    // passa að taka afrit af gögnunum þannig ef notandi ýtir á cancel þá breytast
    // ekki upprunalegu gögnin
    modalInstance.result.then(obj => {
        console.log('Dialog was closed using OK');
        console.log(obj);
    }).catch(err => {
        console.log('Dialog was cancelled');
        console.log(err);
    })
  }

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
