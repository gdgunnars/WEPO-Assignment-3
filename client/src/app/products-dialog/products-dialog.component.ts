import { Component, OnInit } from '@angular/core';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-products-dialog',
	templateUrl: './products-dialog.component.html',
	styleUrls: ['./products-dialog.component.css']
})

export class ProductsDialogComponent implements OnInit {

	product: SellerProduct;
	editing = false;

	constructor(public activeModal: NgbActiveModal, private toastrService: ToastrService) { }

	ngOnInit() {
		this.initalizeEmptyProduct();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.product.name !== ''
		&& this.product.price !== undefined
		&& this.product.quantitySold !== undefined) {
			this.activeModal.close(this.product);
		} else {
			// TODO: find out why this is undefined during testing...
			// this.toastrService.warning('Vinsamlegast fylltu út í allar viðeigandi upplýsingar', 'Viðvörun');
		}
	}

	initalizeEmptyProduct() {
		if (this.product === undefined) {
			this.product = {
				id: 0,
				name: '',
				price: undefined,
				quantitySold: undefined,
				quantityInStock: 0,
				imagePath: ''
			};
		}
	}

}
