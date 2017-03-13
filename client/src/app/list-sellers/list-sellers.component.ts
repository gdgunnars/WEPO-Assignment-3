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
	errorGettingSellers = false;

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
			this.toastrService.warning('Þessi söluaðili er ekki til', 'Viðvörun');
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
			this.errorGettingSellers = true;
			this.toastrService.warning('Ekki tókst að sækja söluaðila', 'Viðvörun');
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDialogComponent);
		modalInstance.result.then(obj => {
			this.service.addSeller(obj).subscribe( result => {
				// The seller was added successfully
				this.sellers.push(result);
				this.toastrService.success('Söluaðili var skráður', 'Aðgerð tókst');
			}, err => {
				this.toastrService.error('Söluaðila var ekki bætt við', 'Villa kom upp');
			});
		}).catch( err => {
			this.toastrService.warning('Hætt við að bæta við söluaðila', 'Viðvörun');
		});
	}
}
