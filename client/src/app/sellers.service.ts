import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';

import { Seller } from './interfaces/seller';
import { SellerProduct } from './interfaces/sellerproduct';


@Injectable()
export class SellersService {

	constructor(private http: Http) { }

	getSellers(): Observable<Seller[]> {
        // Möppum JSON gögnunum yfir í Seller object til að hjúpa
        // JSON gögnin frá þeim sem kallar á þetta fall
		return this.http.get('http://localhost:5000/api/sellers')
		.map(response => {
			return <Seller[]> response.json();
		});
	}

	getSellerById(id: number): Observable<Seller> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}`)
		.map(response => {
			return <Seller> response.json();
		});
	}

	getSellerProducts(id: number): Observable<SellerProduct[]> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
		.map(response => {
			return <SellerProduct[]> response.json();
		});
	}

	addSeller(seller: Seller): Observable<Seller> {
		let body = {
			name: seller.name,
			category: seller.category,
			imagePath: seller.imagePath
		}
		return this.http.post('http://localhost:5000/api/sellers', body)
			.map(response => {
			return <Seller> response.json();
		});
	}

	editSeller(seller: Seller): Observable<Seller> {
		return this.http.put(`http://localhost:5000/api/sellers/${seller.id}`, seller)
			.map(response => {
			return <Seller> response.json();
		});
	}
}
