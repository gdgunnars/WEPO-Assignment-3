/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListSellersComponent } from './list-sellers.component';
import {NgbModal, NgbAlert, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { SellersService } from '../sellers.service';

describe('ListSellersComponent', () => {
	let component: ListSellersComponent;
	let fixture: ComponentFixture<ListSellersComponent>;

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

	const mockRouter = {
		navigate: jasmine.createSpy('navigate')
	};

	const mockService = {
		successGetSellers: true,
		successAddSeller: true,
		sellers: [{
			id: 1,
			name: 'Dabs',
			category: 'Rauðrófusafar',
			imagePath: 'http://example.com'
		}],
		seller: {
			id: 2,
			name: 'Pattó',
			category: 'Batterý',
			imagePath: 'http://www.pattobatto.is'
		},
		getSellers: function() {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successGetSellers === true) {
						fnSuccess(mockService.sellers);
					} else {
						fnError();
					}
				}
			};
		},
		addSeller: function() {
			return {
				subscribe: function(fnSuccess, fnError) {
					if (mockService.successAddSeller === true) {
						fnSuccess(mockService.seller);
					} else {
						fnError();
					}
				}
			};
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListSellersComponent],
			providers: [{
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: Router,
				useValue: mockRouter
			}, {
				provide: SellersService,
				useValue: mockService
			}],
			imports: [
				NgbAlertModule.forRoot()
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListSellersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when SellersService returns non empty list of sellers', () => {

		it('should set noSellers to false', () => {
			// Arrange:
			mockService.sellers = [{
				id: 1,
				name: 'Dabs',
				category: 'Treflar',
				imagePath: 'http://example.com'
			}];

			// Act:
			component.getSellers();
			expect(component.noSellers).toBe(false);
		});
	});

	describe('when SellersService returns empty list of sellers', () => {

		it('should not change noSellers to false', () => {
			// Arrange:
			component.noSellers = true;
			mockService.sellers = [];

			// Act:
			component.getSellers();
			expect(component.noSellers).toBe(true);
		});
	});

	describe('when navigating to seller details', () => {
		it('should navigate to sellers/details/id', () => {
			// Arrange:
			mockRouter.navigate.calls.reset();

			// Act:
			component.GoToSellertDtl(1);
			expect(mockRouter.navigate).toHaveBeenCalledWith(['/sellers/details/1']);
		});

		it('should not navigate anywhere', () => {
			// Arrange:
			mockRouter.navigate.calls.reset();

			// Act:
			component.GoToSellertDtl(0);
			expect(mockRouter.navigate).not.toHaveBeenCalled();
		});
	});

	describe('when SellerService fails to get list of sellers', () => {
		it('should display an error message', () => {
			// Arrange:
			mockService.successGetSellers = false;

			// Act:
			component.getSellers();
			// TODO: add test for toastr when toastr has been added
		});
	});

	describe('when adding a new seller successfully', () => {
		it('should add the new seller to the list of sellers', () => {
			// Arrange:
			mockService.seller = {
				id: 2,
				name: 'Pattó',
				category: 'Batterý',
				imagePath: 'http://www.pattobatto.is'
			};
			component.sellers = [];
			mockModal.pressedOk = true;

			// Act:
			component.addSeller();
			expect(component.sellers[0]).toEqual(mockService.seller);
		});
	});

	describe('when adding a new seller fails', () => {
		it('should display an error message', () => {
			// Arrange:
			mockService.successAddSeller = false;

			// Act:
			component.addSeller();
			// TODO: add test for toastr when toastr has been added
		});
	});
});
