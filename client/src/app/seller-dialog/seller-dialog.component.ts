import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Seller} from '../interfaces/seller';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-seller-dialog',
	templateUrl: './seller-dialog.component.html',
	styleUrls: ['./seller-dialog.component.css']
})

export class SellerDialogComponent implements OnInit {

	seller: Seller;

	constructor(public activeModal: NgbActiveModal,
				private toastrService: ToastrService) { }

	ngOnInit() {
		this.initalizeEmptySeller();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.seller.name !== '' && this.seller.category !== '') {
			this.activeModal.close(this.seller);
		} else {
			this.toastrService.warning('Vinsamlegast fylltu út í allar viðeigandi upplýsingar', 'Viðvörun');
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
