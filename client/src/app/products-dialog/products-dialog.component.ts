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
	nameError: string;
	priceError: string;
	quantityInStockError: string;
	pathError: string;

	constructor(public activeModal: NgbActiveModal,
				public toastrService: ToastrService) { }

	ngOnInit() {
		this.initalizeEmptyProduct();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.inputIsValid()) {
			this.activeModal.close(this.product);
		} else {
			this.toastrService.warning('Þú verður að fylla inn allar nauðsynlegar upplýsingar', 'Viðvörun');
		}
	}

	initalizeEmptyProduct() {
		if (this.product === undefined) {
			this.product = {
				id: 0,
				name: '',
				price: undefined,
				quantitySold: undefined,
				quantityInStock: undefined,
				imagePath: ''
			};
		}
	}

	inputIsValid() {
		this.nameError = '';
		this.priceError = '';
		this.quantityInStockError = '';
		this.pathError = '';
		let isValid = true;
		let price = '';
		let quantityInStock = '';
		const pathRegExp = new RegExp ('^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$');
		const numRegExp = new RegExp ('^[0-9]+$');

		// Check name validation
		if (this.product.name === '') {
			this.nameError = 'Þú verður að gefa vörunni nafn!';
			isValid = false;
		}

		// Check price validation
		if (this.product.price !== undefined) {
			price = this.product.price.toString();
		}
		if (this.product.price !== undefined && !numRegExp.test(price)) {
			this.priceError = 'Eingöngu má slá inn jákvæða tölustafi';
			isValid = false;
		}
		if (this.product.price === undefined || (
			this.product.price !== undefined &&
			this.product.price.toString() === ''
		)) {
			this.priceError = 'Þú verður að gefa vörunni verð!';
			isValid = false;
		}

		// Check quantityInStock validation
		if (this.product.quantityInStock !== undefined) {
			quantityInStock = this.product.quantityInStock.toString();
		}
		if (this.product.quantityInStock !== undefined && !numRegExp.test(quantityInStock)) {
			this.quantityInStockError = 'Eingöngu má slá inn jákvæða tölustafi';
			isValid = false;
		}
		if (this.product.quantityInStock === undefined || (
			this.product.quantityInStock !== undefined &&
			this.product.quantityInStock.toString() === ''
		)) {
			this.quantityInStockError = 'Þú verður að gefa magn vöru á lager!';
			isValid = false;
		}

		if (this.product.imagePath !== '' && !pathRegExp.test(this.product.imagePath)) {
			this.pathError = 'Slóðin þín verður að vera lögleg URI slóð';
			isValid = false;
		}

		return isValid;
	}

}
