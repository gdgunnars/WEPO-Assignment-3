/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
	let component: ProductCardComponent;
	let fixture: ComponentFixture<ProductCardComponent>;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductCardComponent ]
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
});
