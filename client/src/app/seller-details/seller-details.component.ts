import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SellersService} from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';

@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	sellerId: number;
	seller: Seller;
	products: SellerProduct[];
	top10: SellerProduct[];
	top10Spent: SellerProduct[];

	constructor(private router: Router,
				private service: SellersService,
				private route: ActivatedRoute,
				private modalService: NgbModal) { }

	ngOnInit() {
		this.sellerId = +this.route.snapshot.params['id'];
		this.service.getSellerById(this.sellerId).subscribe( result => {
			this.seller = result;
		}, err => {
			console.log('Was unable to retrieve seller information');
			}
		);

		this.service.getSellerProducts(this.sellerId).subscribe( result => {
			this.products = result;
			this.top10Bought(this.products.slice());
			this.top10SpentOn(this.products.slice());

		}, err => {
			console.log('Was not able to get Products for seller id: ' + this.sellerId);
		});

	}

	top10Bought(products) {
		this.top10 = products.sort( (n1, n2) => {
			if (n1.quantitySold > n2.quantitySold) {
				return -1;
			}
			if ( n1.quantitySold < n2.quantitySold) {
				return 1;
			}
			return 0;
		});
		this.top10 = this.top10.slice(0, 10);
	}

	top10SpentOn(products) {
		this.top10Spent = products.sort((n1, n2) => {
			if ( (n1.quantitySold * n1.price) > (n2.quantitySold * n2.price)) {
				return -1;
			}
			if ( (n1.quantitySold * n1.price)  < (n2.quantitySold * n2.price)) {
				return 1;
			}
			return 0;
		});
		this.top10Spent = this.top10Spent.slice(0, 10);
	}

	onProductEdted(p: SellerProduct) {
		console.log('ID :' + p.id +  'with name: ' + p.name);
	}

	editSeller() {
		const modalInstance = this.modalService.open(SellerDialogComponent);
		modalInstance.componentInstance.seller = Object.assign({}, this.seller);
		modalInstance.result.then(obj => {
			if (!this.sellerEquals(obj)) {
				this.service.editSeller(obj).subscribe( result => {
					// The seller was updated successfully
					this.seller = result;
				}, err => {
					console.log('The service returned an error, something went wrong in the http.put');
					console.log(err);
				});
			}
		}).catch( err => {
			// Someone closed the modal window using cancel or by clicking outside of it
		});
	}

	sellerEquals(obj: Seller) {
		return (this.seller.name === obj.name &&
			this.seller.category === obj.category &&
			this.seller.imagePath === obj.imagePath);
	}

}
