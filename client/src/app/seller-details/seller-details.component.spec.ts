/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SellerDetailsComponent} from './seller-details.component';
import {SellersService} from '../sellers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';

export class ActivatedRouteStub {
	// ActivatedRoute.params is Observable
	private subject = new BehaviorSubject(this.testParams);
	params = this.subject.asObservable();

	// Test parameters
	private _testParams: {};
	get testParams() { return this._testParams; }
	set testParams(params: {}) {
		this._testParams = params;
		this.subject.next(params);
	}
	// ActivatedRoute.snapshot.params
	get snapshot() {
		return { params: this.testParams };
	}
}

describe('SellerDetailsComponent', () => {
	let component: SellerDetailsComponent;
	let fixture: ComponentFixture<SellerDetailsComponent>;
	const activatedRoute = new ActivatedRouteStub();

	const  mockModal = {
		pressedOk: true,
		seller: {
			id: 2,
			name: 'Pattó',
			category: 'Batterý',
			imagePath: 'http://www.pattobatto.is'
		},
		open: function() {
			return {
				result: {
					then: function(fnOk, fnCancel) {
						if (mockModal.pressedOk === true) {
							fnOk(mockModal.seller);
						} else {
							fnCancel('error');
						}
					}
				},
				componentInstance: {
					seller: {
						id: 2,
						name: 'Pattó',
						category: 'Batterý',
						imagePath: 'http://www.pattobatto.is'
					}
				}
			};
		}
	};

	const mockService = {
		successGetProducts: true,
		successGetSeller: true,
		successEditSeller: true,
		successAddProduct: true,
		successEditProduct: true,
		product: {
			id: 1,
			name: 'Hanski',
			price: 1995,
			quantitySold: 500,
			quantityInStock: 100,
			imagePath: 'http://www.example.com/image.jpg'
		},
		updatedProduct: {
			id: 1,
			name: 'trefill',
			price: 1995,
			quantitySold: 500,
			quantityInStock: 100,
			imagePath: 'http://www.example.com/scarf.jpg'
		},
		products: [{
			id: 1,
			name: 'Hanski',
			price: 1995,
			quantitySold: 500,
			quantityInStock: 100,
			imagePath: 'http://www.example.com/image.jpg'
		}],
		seller: {
			id: 2,
			name: 'Pattó',
			category: 'Batterý',
			imagePath: 'http://www.pattobatto.is'
		},
		getSellerById: function(id: number) {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successGetSeller === true) {
						fnSuccess(mockService.seller);
					} else {
						fnError({statusText: 'Error 404: ID not found.'});
					}
				}
			};
		},
		getSellerProducts: function(id: number) {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successGetProducts === true) {
						fnSuccess(mockService.products);
					} else {
						fnError();
					}
				}
			};
		},
		editSeller: function(obj) {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successEditSeller === true) {
						fnSuccess(mockService.seller);
					} else {
						fnError({statusText: 'Error 404:'});
					}
				}
			};
		},
		addProduct: function(obj) {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successAddProduct === true) {
						fnSuccess({product: mockService.product});
					} else {
						fnError({statusText: 'Error'});
					}
				}
			};
		},
		editProduct: function(obj) {
			return {
				subscribe: function(fnSuccess, fnError) {
					if ( mockService.successEditProduct === true) {
						fnSuccess({product: mockService.updatedProduct});
					} else {
						fnError({statusText: 'Error'});
					}
				}
			};
		}
	};

	const mockToastrService = {
		error: jasmine.createSpy('error'),
		success: jasmine.createSpy('success'),
		warning: jasmine.createSpy('warning')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SellerDetailsComponent ],
			providers: [{
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: SellersService,
				useValue: mockService
			}, {
				provide: ActivatedRoute,
				useValue: activatedRoute
			}, {
				provide: ToastrService,
				useValue: mockToastrService
			}],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SellerDetailsComponent);
		component = fixture.componentInstance;
		activatedRoute.testParams = {
			id: 1
		};
		fixture.detectChanges();
	});


	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when successfully getting Seller by Id', () => {
		it('should get seller', () => {
			// Arrange:
			mockService.seller = {
				id: 2,
				name: 'Pattó',
				category: 'Batterý',
				imagePath: 'http://www.pattobatto.is'
			};
			mockService.successGetSeller = true;

			// Act:
			component.getSellerById(2);
			expect(component.seller).toBe(mockService.seller);
		});
	});

	describe('when getting seller by Id fails', () => {
		it('should display an error message', () => {
			// Arrange:
			mockService.successGetSeller = false;

			// Act:
			component.getSellerById(1);
			expect(mockToastrService.error).toHaveBeenCalled();
		});
	});

	describe('when successfully getting seller products', () => {
		it('should get products', () => {
			// Arrange:
			mockService.products = [{
				id: 1,
				name: 'Hanski',
				price: 1995,
				quantitySold: 500,
				quantityInStock: 100,
				imagePath: 'http://www.example.com/image.jpg'
			}];
			mockService.successGetProducts = true;

			// Act:
			component.getSellerProducts(1);
			expect(component.products).toBe(mockService.products);
		});
	});

	describe('when getting seller products fails', () => {
		it('should display an error message', () => {
			// Arrange:
			mockService.successGetProducts = false;

			// Act:
			component.getSellerProducts(1);
			expect(mockToastrService.error).toHaveBeenCalled();
		});
	});

	describe('when editing seller successfully', () => {
		it('should set seller equal to the edited seller', () => {
			// Arrange:
			component.seller = {
				id: 2,
				name: 'Kalli',
				category: 'Timbur',
				imagePath: ''
			};
			mockService.seller = {
				id: 2,
				name: 'Karl',
				category: 'Viður',
				imagePath: 'http://www.timbur.is/timbur.jpg'
			};
			mockService.successEditSeller = true;
			mockModal.pressedOk = true;

			// Act:
			component.editSeller();
			expect(component.seller).toBe(mockService.seller);
			expect(mockToastrService.success).toHaveBeenCalled();
		});
	});

	describe('when editing seller fails', () => {
		it('should not change seller if nothing has changed', () => {
			// Arrange:
			component.seller = {
				id: 2,
				name: 'Kalli',
				category: 'Timbur',
				imagePath: ''
			};
			mockModal.seller = {
				id: 2,
				name: 'Kalli',
				category: 'Timbur',
				imagePath: ''
			};
			mockService.successEditSeller = true;
			mockModal.pressedOk = true;

			// Act:
			component.editSeller();
			expect(component.seller).toBe(component.seller);
		});

		it('should  display an error message if service failed', () => {
			// Arrange:
			component.seller = {
				id: 2,
				name: 'Kalli',
				category: 'Timbur',
				imagePath: ''
			};
			mockModal.seller = {
				id: 2,
				name: 'Tommi',
				category: 'Viður',
				imagePath: ''
			};
			mockService.successEditSeller = false;

			// Act:
			component.editSeller();
			expect(mockToastrService.error).toHaveBeenCalled();
		});
	});

	describe('when sorting top 10 bought products', () => {
		it('should sort list', () => {
			// Arrange:
			const products = [{
				quantitySold: 500
			}, {
				quantitySold: 100
			}, {
				quantitySold: 400
			}, {
				quantitySold: 400
			}];

			const sortedProducts = [{
				quantitySold: 500
			}, {
				quantitySold: 400
			}, {
				quantitySold: 400
			}, {
				quantitySold: 100
			}];
			component.top10 = [];


			// Act:
			component.top10Bought(products);
			expect(component.top10).toEqual(sortedProducts);
		});
	});

	describe('when sorting top 10 spent on products', () => {
		it('should sort list', () => {
			// Arrange:
			const products = [{
				quantitySold: 500,
				price: 1
			}, {
				quantitySold: 100,
				price: 1
			}, {
				quantitySold: 400,
				price: 1
			}, {
				quantitySold: 400,
				price: 1
			}];

			const sortedProducts = [{
				quantitySold: 500,
				price: 1
			}, {
				quantitySold: 400,
				price: 1
			}, {
				quantitySold: 400,
				price: 1
			}, {
				quantitySold: 100,
				price: 1
			}];
			component.top10Spent = [];


			// Act:
			component.top10SpentOn(products);
			expect(component.top10Spent).toEqual(sortedProducts);
		});
	});

	describe('when adding a new product successfully', () => {
		it('should add the new product to the list of products', () => {
			// Arrange:
			mockService.product = {
				id: 2,
				name: 'Trefló',
				price: 1200,
				quantityInStock: 20,
				quantitySold: 0,
				imagePath: 'http://www.pattobatto.is'
			};
			component.products = [];
			mockModal.pressedOk = true;

			// Act:
			component.addProduct();
			expect(component.products[0]).toBe(mockService.product);
			expect(mockToastrService.success).toHaveBeenCalled();
		});
	});

	describe('when adding a new product failes', () => {
		it('should not add new product to the list of products', () => {
			// Arrange:
			mockService.product = {
				id: 2,
				name: 'Trefló',
				price: 1200,
				quantityInStock: 20,
				quantitySold: 0,
				imagePath: 'http://www.pattobatto.is'
			};
			component.products = [];
			mockModal.pressedOk = true;
			mockService.successAddProduct = false;

			// Act:
			component.addProduct();
			expect(component.products[0]).not.toBe(mockService.product);
			expect(mockToastrService.error).toHaveBeenCalled();
		});
	});

	describe('when editing a product successfully', () => {
		it('should edit the program in the list of products', () => {
			// Arrange:
			mockService.product = {
				id: 1,
				name: 'Hanski',
				price: 1995,
				quantitySold: 500,
				quantityInStock: 100,
				imagePath: 'http://www.example.com/image.jpg'
			};
			mockService.updatedProduct = {
				id: 1,
				name: 'trefill',
				price: 1995,
				quantitySold: 500,
				quantityInStock: 100,
				imagePath: 'http://www.example.com/scarf.jpg'
			};
			component.products = [];
			component.products.push(mockService.product);
			mockModal.pressedOk = true;

			// Act:
			component.onProductEdit(mockService.product);
			expect(component.products[0]).toBe(mockService.updatedProduct);
			expect(mockToastrService.success).toHaveBeenCalled();
		});
	});

	describe('when editing a product fails', () => {
		it('should not edit the program in the list of products', () => {
			// Arrange:
			mockService.product = {
				id: 1,
				name: 'Hanski',
				price: 1995,
				quantitySold: 500,
				quantityInStock: 100,
				imagePath: 'http://www.example.com/image.jpg'
			};
			mockService.updatedProduct = {
				id: 1,
				name: 'trefill',
				price: 1995,
				quantitySold: 500,
				quantityInStock: 100,
				imagePath: 'http://www.example.com/scarf.jpg'
			};
			component.products = [];
			component.products.push(mockService.product);
			mockService.successEditProduct = false;
			mockModal.pressedOk = true;

			// Act:
			component.onProductEdit(mockService.product);
			expect(component.products[0]).not.toBe(mockService.updatedProduct);
			expect(mockToastrService.error).toHaveBeenCalled();
		});
	});
});
