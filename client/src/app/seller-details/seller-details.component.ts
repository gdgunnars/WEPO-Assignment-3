import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	sellerId: number;

	constructor(private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.sellerId = +this.route.snapshot.params['id'];
	}

}
