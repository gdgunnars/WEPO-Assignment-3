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
	nameError: string;
	categoryError: string;
	pathError: string;

	constructor(public activeModal: NgbActiveModal,
				private toastrService: ToastrService) { }

	ngOnInit() {
		this.initalizeEmptySeller();
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.inputIsValid()) {
			this.activeModal.close(this.seller);
		} else {
			this.toastrService.warning('Þú verður að fylla inn allar nauðsynlegar upplýsingar', 'Viðvörun');
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

	inputIsValid() {
		// Cleaning previous errors
		this.nameError = '';
		this.categoryError = '';
		this.pathError = '';
		let isValid = true;
		const regexp = new RegExp ('^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$');

		if (this.seller.name === '') {
			this.nameError = 'Þú verður að gefa söluaðila nafn';
			isValid = false;
		}
		if (this.seller.category === '') {
			this.categoryError = 'Þú verður að skilgreina flokk';
			isValid = false;
		}

		if (this.seller.imagePath !== '' && !regexp.test(this.seller.imagePath)) {
			this.pathError = 'Slóðin þín verður að vera lögleg URL slóð';
			isValid = false;
		}

		return isValid;
	}

}
