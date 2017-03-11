import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SellersService} from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';

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

	constructor(private router: Router, private service: SellersService,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.sellerId = +this.route.snapshot.params['id'];
		this.service.getSellerById(this.sellerId).subscribe( result => {
			this.seller = result;
		}, err => {
			console.log("Was unable to retrieve seller information");
			}
		);

		this.service.getSellerProducts(this.sellerId).subscribe( result => {
			this.products = result;
			this.top10Bought(this.products.slice());
			this.top10SpentOn(this.products.slice());

		}, err => {
			console.log("Was not able to get Products for seller id: " + this.sellerId);
		});

	}

	top10Bought(products) {
		this.top10 = products.sort((n1, n2) => {
			if(n1.quantitySold > n2.quantitySold) {
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
			if((n1.quantitySold * n1.price) > (n2.quantitySold * n2.price)) {
				return -1;
			}
			if ( (n1.quantitySold * n1.price)  < (n2.quantitySold * n2.price)) {
				return 1;
			}
			return 0;
		});
		this.top10Spent = this.top10Spent.slice(0, 10);
	}
}
