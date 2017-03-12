import { Component, OnInit } from '@angular/core';
import { SellersService } from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})

export class ListSellersComponent implements OnInit {

	sellers: Seller[];
	finishedLoading = false;
	noSellers = true;

	constructor(private router: Router,
				private service: SellersService,
				private modalService: NgbModal,
				private toastrService: ToastrService) {}

	ngOnInit() {
		this.getSellers();
	}

	GoToSellertDtl(id) {
		if (id && id !== 0) {
			this.router.navigate([`/sellers/details/${id}`]);
		} else {
			this.toastrService.warning('Þessi seljandi er ekki til', 'Obbs');
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
			this.finishedLoading = true;
			this.toastrService.warning('Ekki tókst að sækja seljendur', 'VILLA');
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDialogComponent);
		modalInstance.result.then(obj => {
			this.service.addSeller(obj).subscribe( result => {
				// The seller was added successfully
				this.sellers.push(result);
				this.toastrService.success('Seljandinn var skráður', 'Æði');
			}, err => {
				this.toastrService.error('Seljandanum var ekki bætt við', 'Villa kom upp');
			});
		});
	}
}
