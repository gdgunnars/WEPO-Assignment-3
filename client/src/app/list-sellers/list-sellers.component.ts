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

	editSeller(seller: Seller) {
		const index = this.sellers.indexOf(seller);
		const modalInstance = this.modalService.open(SellerDialogComponent);
		modalInstance.componentInstance.seller = Object.assign({}, seller);
		modalInstance.result.then(obj => {
			if (!this.sellerEquals(index, obj)) {
				this.service.editSeller(obj).subscribe( result => {
					// The seller was updated successfully
					this.sellers[index] = result;
					const msg = 'Söluaðili ' + result.name + ' var uppfærður';
					this.toastrService.success(msg, 'Aðgerð tókst');
				}, err => {
					this.toastrService.error(err.statusText, 'Ekki tókst að uppfæra söluaðila');
				});
			}
		}).catch( err => {
			this.toastrService.warning('Hætt við að breyta söluaðila', 'Viðvörun');
		});
	}

	sellerEquals(index: number, obj: Seller) {
		return (this.sellers[index].name === obj.name &&
			this.sellers[index].category === obj.category &&
			this.sellers[index].imagePath === obj.imagePath);
	}
}
