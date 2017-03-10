import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SellersService} from '../sellers.service';
import {Seller} from '../interfaces/seller';

@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	sellerId: number;
	seller: Seller;

	constructor(private router: Router, private service: SellersService,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.sellerId = +this.route.snapshot.params['id'];
		this.service.getSellerById(this.sellerId).subscribe( result => {
			console.log(result);
			this.seller = result;
		}, err => {
			console.log("Was unable to retrieve seller information");
			}
		);
	}
}
