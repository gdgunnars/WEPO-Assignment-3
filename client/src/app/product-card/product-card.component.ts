import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SellerProduct} from '../interfaces/sellerproduct';
import {ToastrService} from 'ngx-toastr/toastr';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

	@Input()
	product: SellerProduct;

	@Output()
	productUpdate = new EventEmitter();

	constructor(private toastrService: ToastrService) { }

	ngOnInit() {
	}

	onEdit() {
		this.productUpdate.emit(this.product);
	}

	onBuy() {
		if (this.product.quantityInStock > 0) {
			this.product.quantityInStock--;
			this.product.quantitySold++;
			this.toastrService.success('Þú hefur keypt ' + this.product.name + ' fyrir ' + this.product.price + 'kr!', 'Kaupa');
		} else {
			this.toastrService.warning(this.product.name + ' er ekki lengur til á lager!', 'Aðvörun');
		}
	}

}
