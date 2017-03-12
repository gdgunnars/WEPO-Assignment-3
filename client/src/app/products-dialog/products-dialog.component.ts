import { Component, OnInit } from '@angular/core';
import { SellerProduct } from '../interfaces/sellerproduct';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-products-dialog',
	templateUrl: './products-dialog.component.html',
	styleUrls: ['./products-dialog.component.css']
})
export class ProductsDialogComponent implements OnInit {

	product: SellerProduct;
	editing = false;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.initalizeEmptyProduct();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		this.activeModal.close(this.product);
	}

	initalizeEmptyProduct() {
		if (this.product === undefined) {
			this.product = {
				id: 0,
				name: '',
				price: 0,
				quantitySold: 0,
				quantityInStock: 0,
				imagePath: ''
			};
		}
	}

}
