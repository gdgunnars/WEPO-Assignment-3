/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Seller } from './interfaces/seller';
import { SellerProduct } from './interfaces/sellerproduct';

describe('SellersService', () => {
	const sellersArray = [{
							id: 1,
							name: 'Gux',
							category: 'Knitting',
							imagePath: 'http://www.example.com'
						}, {
							id: 2,
							name: 'Lommi',
							category: 'Knitting',
							imagePath: 'http://www.example.com'
						}];

	const seller = 	{
						id: 2,
						name: 'Lommi',
						category: 'Knitting',
						imagePath: 'http://www.example.com'
					};

	const productsArray = [{
							id: 1,
							name: 'Leirtau',
							price: 1000,
							quantitySold: 500,
							quantityInStock: 5000,
							imagePath: 'http://www.example.com'
						}, {
							id: 2,
							name: 'Pottar',
							price: 500,
							quantitySold: 100,
							quantityInStock: 1000,
							imagePath: 'http://www.example2.com'
						}];

	const product = {
						id: 1,
						name: 'Leirtau',
						price: 1000,
						quantitySold: 500,
						quantityInStock: 5000,
						imagePath: 'http://www.example.com'
					};


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

	let subject: SellersService = null;
	let backend: MockBackend = null;
	beforeEach(inject([SellersService, MockBackend], (sellersService: SellersService, mockBackend: MockBackend) => {
		subject = sellersService;
		backend = mockBackend;
	}));


	it('should ...', inject([SellersService], (service: SellersService) => {
		expect(service).toBeTruthy();
	}));

	describe('SellersService get functions', () => {
		it('getSellers should return list of sellers', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(sellersArray)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			getSellers()
			.subscribe((response) => {
				expect(response.length).toBe(2);
				expect(response[0].id).toBe(1);
				expect(response[0].category).toEqual('Knitting');
				expect(response[0].name).toEqual('Gux');
				expect(response[1].name).toEqual('Lommi');
				done();
			});
		});
	});
		it('getSellerById should return the seller matching the ID', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(seller)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			getSellerById(2)
			.subscribe((response) => {
				expect(response.id).toBe(2);
				expect(response.category).toEqual('Knitting');
				expect(response.name).toEqual('Lommi');
				done();
			});
		});

		it('getSellerProducts should return the products matching the ID of the seller', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(productsArray)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			getSellerProducts(2)
			.subscribe((response) => {
				expect(response[0].id).toBe(1);
				expect(response[1].id).toBe(2);
				expect(response[0].name).toEqual('Leirtau');
				done();
			});
		});


	describe('SellersService add functions', () => {
		it('addSeller should return the seller matching the seller sent in as the function parameter', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(seller)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			addSeller(<Seller> seller)
			.subscribe((response) => {
				expect(response.id).toBe(2);
				expect(response.name).toEqual('Lommi');
				expect(response.category).toEqual('Knitting');
				done();
			});
		});

		it('addProduct should return the product matching the product sent in as the function parameter', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(product)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			addProduct(1, <SellerProduct> product)
			.subscribe((response) => {
				expect(response.id).toBe(1);
				expect(response.name).toEqual('Leirtau');
				expect(response.price).toBe(1000);
				expect(response.quantitySold).toBe(500);
				expect(response.quantityInStock).toBe(5000);
				done();
			});
		});
	});

	describe('SellersService edit functions', () => {
		it('editSeller should return the seller object matching the seller object sent in as the function parameter', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(seller)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject.
			editSeller(<Seller> seller)
			.subscribe((response) => {
				expect(response.id).toBe(2);
				expect(response.name).toEqual('Lommi');
				expect(response.category).toEqual('Knitting');
				done();
			});
		});

		it('editProduct should return the product object matching the product object sent in as the function parameter', (done) => {
			// Arrange
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({
					body: JSON.stringify(product)
				});
				connection.mockRespond(new Response(options));
			});

			// Act
			subject
			.editProduct(1, product)
			.subscribe((response) => {
				expect(response.id).toBe(1);
				expect(response.name).toEqual('Leirtau');
				expect(response.price).toBe(1000);
				expect(response.quantitySold).toBe(500);
				expect(response.quantityInStock).toBe(5000);
				done();
			});
		});
	});

});
