/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductsDialogComponent } from './products-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr/toastr';

describe('ProductsDialogComponent', () => {
	let component: ProductsDialogComponent;
	let fixture: ComponentFixture<ProductsDialogComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	const mockToastrService = {
		warning: jasmine.createSpy('warning')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductsDialogComponent ],
			providers: [ {
				provide: NgbActiveModal,
				usevalue: mockModal
			}, {
				provide: ToastrService,
				useValue: mockToastrService
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
			mockModal.dismiss.calls.reset();

			// Act:
			component.onCancel();
			expect(mockModal.dismiss).toHaveBeenCalled();
		});
	});

	describe('when modal window is closed with OK button', () => {
		it('should call close function when name, price and quantitySold has been filled in', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: 'Sokkar',
				price: 990,
				quantitySold: 3250,
				quantityInStock: 0,
				imagePath: ''
			};
			component.activeModal = mockModal;
			mockModal.close.calls.reset();

			// Act:
			component.onOk();
			expect(mockModal.close).toHaveBeenCalled();
		});

		it('should not call close function when name, price and quantitySold have not been filled in', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: '',
				price: 990,
				quantitySold: 3250,
				quantityInStock: 0,
				imagePath: ''
			};
			component.activeModal = mockModal;
			mockModal.close.calls.reset();
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();

			// Arrange:
			component.product = {
				id: 0,
				name: 'Sokkar',
				price: undefined,
				quantitySold: 3250,
				quantityInStock: 0,
				imagePath: ''
			};
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();

			// Arrange:
			component.product = {
				id: 0,
				name: 'Sokkar',
				price: 990,
				quantitySold: undefined,
				quantityInStock: 0,
				imagePath: ''
			};
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();

			// Arrange:
			component.product = {
				id: 0,
				name: '',
				price: undefined,
				quantitySold: undefined,
				quantityInStock: 0,
				imagePath: ''
			};
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();
		});

		// TODO: find out why I keep getting undefined for ToastrService in component
		it('should display a toastr warning when form hasnt been filled', () => {
			// Arrange:
			component.product = {
				id: 0,
				name: '',
				price: undefined,
				quantitySold: undefined,
				quantityInStock: 0,
				imagePath: ''
			};
			mockToastrService.warning.calls.reset();

			// Act:
			component.onOk();
			expect(mockToastrService.warning).toHaveBeenCalled();
		});
	});
});
