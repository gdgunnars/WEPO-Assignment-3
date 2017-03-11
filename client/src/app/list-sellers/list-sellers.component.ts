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

	sellers: Seller[];
	private finishedLoading = false;
	noSellers = true;

	constructor(private router: Router,
				private service: SellersService,
				private modalService: NgbModal) {}

	ngOnInit() {
		this.getSellers();
	}

	GoToSellertDtl(id) {
		if (id && id !== 0) {
			this.router.navigate([`/sellers/details/${id}`]);
		} else {
			console.log('ID was not valid, should show an error');
		}
	}

	getSellers() {
		this.service.getSellers().subscribe( result => {
			this.sellers = result;
			this.finishedLoading = true;
			if (this.sellers.length > 0) {
				this.noSellers = false;
			}
		}, err => {
			console.log('I was not able to get Sellers');
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDialogComponent);
		// modalInstance.componentInstance.sellerName =
		modalInstance.result.then(obj => {
			this.service.addSeller(obj).subscribe( result => {
				console.log('The seller was added successfully');
				this.sellers.push(result);
			}, err => {
				console.log('there was some error while adding the seller');
			});
			console.log(obj);
		}).catch( err => {
			console.log('Seller modal was closed');
			console.log(err);
		});
	}
}