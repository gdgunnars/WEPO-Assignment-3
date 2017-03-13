import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Seller} from '../interfaces/seller';

@Component({
	selector: 'app-seller-dialog',
	templateUrl: './seller-dialog.component.html',
	styleUrls: ['./seller-dialog.component.css']
})

export class SellerDialogComponent implements OnInit {

	seller: Seller;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.initalizeEmptySeller();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.seller.name !== '' && this.seller.category !== '') {
			this.activeModal.close(this.seller);
		}
	}

	initalizeEmptySeller() {
		if (this.seller === undefined) {
			// No seller sent, initializing an empty seller
			this.seller = {
				id: 0,
				name: '',
				category: '',
				imagePath: ''
			};
		}
	}
}
