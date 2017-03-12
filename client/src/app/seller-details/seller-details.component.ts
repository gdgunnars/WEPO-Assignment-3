import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService} from '../sellers.service';
import { Seller } from '../interfaces/seller';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';
import { ProductsDialogComponent } from '../products-dialog/products-dialog.component';
import { ToastrService } from 'ngx-toastr';

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

	constructor(private service: SellersService,
				private route: ActivatedRoute,
				private modalService: NgbModal,
				private toastrService: ToastrService) { }

	ngOnInit() {
		this.sellerId = +this.route.snapshot.params['id'];
		this.getSellerById(this.sellerId);
		this.getSellerProducts(this.sellerId);
	}

	getSellerById(id: number) {
		this.service.getSellerById(id).subscribe( result => {
			this.seller = result;
		}, err => {
			this.toastrService.error(err.statusText, 'Ekki náðist að sækja notanda');
			}
		);
	}

	getSellerProducts(id: number) {
		this.service.getSellerProducts(id).subscribe( result => {
			this.products = result;
			this.top10Bought(this.products.slice());
			this.top10SpentOn(this.products.slice());
		}, err => {
			// Was not able to get Products for seller id
			// Show message in html
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
					const msg = 'Seljandi ' + result.name + ' var uppfærður';
					this.toastrService.success('', msg);
				}, err => {
					this.toastrService.error(err.statusText, 'Villa, ekki tókst að uppfæra');
				});
			}
		});
	}

	sellerEquals(obj: Seller) {
		return (this.seller.name === obj.name &&
			this.seller.category === obj.category &&
			this.seller.imagePath === obj.imagePath);
	}

	addProduct() {
		const modalInstance = this.modalService.open(ProductsDialogComponent);
		modalInstance.result.then(obj => {
			this.service.addProduct(this.sellerId, obj).subscribe( result => {
				this.products.push(result['product']);
				this.top10Bought(this.products.slice());
				this.top10SpentOn(this.products.slice());
				this.toastrService.success(result.name, 'Vöru bætt við');
			}, err => {
				this.toastrService.error(err.statusText, 'Obbs, einhvað fór úrskeiðis');
			});
		});
	}

}
