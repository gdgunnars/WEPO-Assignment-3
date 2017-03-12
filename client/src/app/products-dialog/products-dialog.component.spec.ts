/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {ProductsDialogComponent} from './products-dialog.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

describe('ProductsDialogComponent', () => {
	let component: ProductsDialogComponent;
	let fixture: ComponentFixture<ProductsDialogComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductsDialogComponent ],
			providers: [ {
				provide: NgbActiveModal,
				usevalue: mockModal
			}],
			imports: [
				FormsModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductsDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when product-dialogs seller is undefined', () => {
		it('should create an empty seller with default values', () => {
			// Arrange:
			component.product = undefined;

			// Act:
			component.initalizeEmptyProduct();
			expect(component.product.id).toBe(0);
		});
	});

	describe('when seller-dialogs seller is not undefined', () => {
		it('should not initialize seller', () => {
			// Arrange:
			const product = {
				id: 1,
				name: 'Hanskar',
				price: 2495,
				quantitySold: 50,
				quantityInStock: 60,
				imagePath: ''
			};
			component.product = product;

			// Act:
			component.initalizeEmptyProduct();
			expect(component.product).toBe(product);
		});
	});

	describe('when modal window is dismissed', () => {
		it('should call dismiss function', () => {
			// Arrange:
			component.activeModal = mockModal;

			// Act:
			component.onCancel();
			expect(mockModal.dismiss).toHaveBeenCalled();
		});
	});

	describe('when modal window is closed with OK button', () => {
		it('should call close function', () => {
			// Arrange:
			component.activeModal = mockModal;

			// Act:
			component.onOk();
			expect(mockModal.close).toHaveBeenCalled();
		});
	});
});
