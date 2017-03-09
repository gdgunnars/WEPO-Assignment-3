import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/rx';

// yfirlýsing um það hvernig gögnin koma frá server
// ATH getur lýst þessu yfir í sér skrá, eflaust hreinlegra og importa svo þar sem við á.
export interface Seller {
    id: number;
    name: string;
    category: string;
    imagePath: string;
}

@Injectable()
export class SellersService {

	constructor(private http: Http) { }

	getSellers(): Observable<Seller[]> {
        // Möppum JSON gögnunum yfir í Seller object til að hjúpa
        // JSON gögnin frá þeim sem kallar á þetta fall
		return this.http.get("http://localhost:5000/api/sellers")
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
}
