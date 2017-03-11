import { Component, OnInit } from '@angular/core';
import { SellersService } from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})

export class ListSellersComponent implements OnInit {
	
	private sellers: Seller[];

	constructor(private router: Router,
				private service: SellersService,
				private modalService: NgbModal) {}

	ngOnInit() {
		this.service.getSellers().subscribe( result => {
			this.sellers = result;
		}, err => {
			console.log('I was not able to get Sellers')
		});
	}

	GoToSellertDtl(id) {
		if(id && id != 0){
			this.router.navigateByUrl('/sellers/details/' + id);
		}
		else {
			console.log("ID was not valid, should show an error");
		}
	}

}