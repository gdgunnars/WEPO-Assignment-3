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

	constructor(public activeModal: NgbActiveModal) {}

	ngOnInit() {
		if (this.seller === undefined) {
			this.initalizeEmptySeller();
		}
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		this.activeModal.close(this.seller);
	}

	initalizeEmptySeller() {
		console.log('No seller sent, initializing an empty seller');
		this.seller = {
			id: 0,
			name: '',
			category: '',
			imagePath: ''
		};
	}
}
