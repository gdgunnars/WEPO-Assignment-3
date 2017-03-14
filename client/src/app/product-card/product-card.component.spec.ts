/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {ProductCardComponent} from './product-card.component';
import {ToastrService} from "ngx-toastr/toastr";

describe('ProductCardComponent', () => {
	let component: ProductCardComponent;
	let fixture: ComponentFixture<ProductCardComponent>;

	const mockToastrService = {
		success: jasmine.createSpy('success'),
		warning: jasmine.createSpy('warning')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductCardComponent ],
			providers: [{
				provide: ToastrService,
				useValue: mockToastrService
			}]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when onedit sends information out from the dialog', () => {
		it('should send correct product out', () => {
			// Arrange:
			const sellerProduct = {
				id: 0,
				name: '',
				price: undefined,
				quantitySold: undefined,
				quantityInStock: 0,
				imagePath: ''
			};
			component.product = sellerProduct;

			// Act
			component.productUpdate.subscribe(response => {
				expect(response).toEqual(sellerProduct);
			});
			component.onEdit();
			fixture.detectChanges();
		});
	});

	describe('when clicking buy button', () => {
		it('should decrement quantityInStock and increment quantitySold if item is in stock', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: 'Hanskar',
				price: 1990,
				quantitySold: 100,
				quantityInStock: 100,
				imagePath: ''
			};

			// Act:
			component.onBuy();
			expect(component.product.quantityInStock).toBe(99);
			expect(component.product.quantitySold).toBe(101);
		});

		it('should display a success toastr if item is in stock', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: 'Hanskar',
				price: 1990,
				quantitySold: 100,
				quantityInStock: 100,
				imagePath: ''
			};
			mockToastrService.success.calls.reset();

			// Act:
			component.onBuy();
			expect(mockToastrService.success).toHaveBeenCalled();
		});

		it('should not decrement quantityInStock or increment quantitySold if item is not in stock', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: 'Hanskar',
				price: 1990,
				quantitySold: 100,
				quantityInStock: 0,
				imagePath: ''
			};

			// Act:
			component.onBuy();
			expect(component.product.quantityInStock).toBe(0);
			expect(component.product.quantitySold).toBe(100);
		});

		it('should display a warning toastr if item is not in stock', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: 'Hanskar',
				price: 1990,
				quantitySold: 100,
				quantityInStock: 0,
				imagePath: ''
			};
			mockToastrService.warning.calls.reset();

			// Act:
			component.onBuy();
			expect(mockToastrService.warning).toHaveBeenCalled();
		});
	});
});
