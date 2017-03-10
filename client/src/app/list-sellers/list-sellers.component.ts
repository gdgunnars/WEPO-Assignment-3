import { Component, OnInit } from '@angular/core';
import { SellersService } from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';

@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})

export class ListSellersComponent implements OnInit {
	private sellers: Seller[];

	constructor(private service: SellersService,
				private modalService: NgbModal) {}

	ngOnInit() {
		this.service.getSellers().subscribe( result => {
			this.sellers = result;
		}, err => {
			console.log('I was not able to get Sellers')
		});
	}

}