/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {SellersService} from './sellers.service';
import {Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Seller} from './interfaces/seller';

describe('SellersService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SellersService,
				MockBackend,
				BaseRequestOptions,
				{
					provide: Http,
					deps: [MockBackend, BaseRequestOptions],
					useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
						return new Http(backendInstance, defaultOptions);
					}
				}
				]
		});
	});

	it('should ...', inject([SellersService], (service: SellersService) => {
		expect(service).toBeTruthy();
	}));

	describe('SellersServiceTests', () => {
		let subject: SellersService = null;
		let backend: MockBackend = null;

		beforeEach(inject([SellersService, MockBackend], (sellersService: SellersService, mockBackend: MockBackend) => {
			subject = sellersService;
			backend = mockBackend;
		}));

		it('getSellers should return list of sellers', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(
						[{
							id: 1,
							name: 'Gux',
							category: 'Knitting',
							imagePath: 'http://www.example.com'
						}, {
							id: 2,
							name: 'Lommi',
							category: 'Knitting',
							imagePath: 'http://www.example.com'
						} 
						])
				});
				connection.mockRespond(new Response(options));
			});

			subject.
			getSellers()
			.subscribe((response) => {
				expect(response.length).toBe(2);
				expect(response[0].id).toBe(1);
				expect(response[0].category).toEqual('Knitting')
				expect(response[0].name).toEqual('Gux');
				expect(response[1].name).toEqual('Lommi');
				done();
			});
		});

		it('getSellerById should return the seller matching the ID', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(
						{
							id: 2,
							name: 'Lommi',
							category: 'Knitting',
							imagePath: 'http://www.example.com'
						})
				});
				connection.mockRespond(new Response(options));
			});

			subject.
			getSellerById(2)
			.subscribe((response) => {
				expect(response.id).toBe(2);
				expect(response.category).toEqual('Knitting')
				expect(response.name).toEqual('Lommi');
				done();
			});
		});

		it('getSellerProducts should return the products matching the ID of the seller', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(
						[{
							id: 1,
							name: 'Leirtau',
							price: 1000,
							quantitySold: 500,
							quantityInStock: 5000,
							imagePath: 'http://www.example.com'
						},{
							id: 2,
							name: 'Pottar',
							price: 500,
							quantitySold: 100,
							quantityInStock: 1000,
							imagePath: 'http://www.example2.com'
						}])
				});
				connection.mockRespond(new Response(options));
			});

			subject.
			getSellerProducts(2)
			.subscribe((response) => {
				expect(response[0].id).toBe(1);
				expect(response[1].id).toBe(2);
				expect(response[0].name).toEqual('Leirtau');
				done();
			});
		});
	});
});
