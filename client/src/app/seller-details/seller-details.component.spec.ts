/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SellerDetailsComponent} from './seller-details.component';
import {SellersService} from '../sellers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Rx';
// import {ActivatedRouteStub} from '../router-stubs';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
				}
			};
		}
	};

	const mockService = {
		successGetProducts: true,
		successGetSeller: true,
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
						fnError();
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
		}
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
			// TODO: add test for toastr
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
			// TODO: add test for toastr
		});
	});
});
