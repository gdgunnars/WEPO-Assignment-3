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
	let de:      DebugElement;
	let el:      HTMLElement;

	const mockModal = {
		open: jasmine.createSpy('open')
	};

	const mockRouter = {
		navigate: jasmine.createSpy('navigate')
	};

	const mockService = {
		successGetSellers: true,
		sellers: [{
			id: 1,
			name: 'Dabs',
			category: 'Treflar',
			imagePath: 'http://example.com'
		}],
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

		de = fixture.debugElement.query(By.css('#list-sellers'));
		el = de.nativeElement;
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
			fixture.detectChanges();
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
			fixture.detectChanges();
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
			// TODO: fix this test to test if error message is displayed
			// Arrange:
			mockService.successGetSellers = false;

			// Act:
			component.getSellers();
			// expect?
		})
	});
});
