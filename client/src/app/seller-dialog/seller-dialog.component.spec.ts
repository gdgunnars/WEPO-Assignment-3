/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgModule } from '@angular/core';
import { SellerDialogComponent } from './seller-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr/toastr';

describe('SellerDialogComponent', () => {
	let component: SellerDialogComponent;
	let fixture: ComponentFixture<SellerDialogComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	const mockToastrService = {
		warning: jasmine.createSpy('warning')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SellerDialogComponent ],
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
		fixture = TestBed.createComponent(SellerDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when seller-dialogs seller is undefined', () => {
		it('should create an empty seller with default values', () => {
			// Arrange:
			component.seller = undefined;

			// Act:
			component.initalizeEmptySeller();
			expect(component.seller.id).toBe(0);
		});
	});

	describe('when seller-dialogs seller is not undefined', () => {
		it('should not initialize seller', () => {
			// Arrange:
			const seller = {
				id: 1,
				name: 'Jónína',
				category: 'Saumavörur',
				imagePath: ''
			};
			component.seller = seller;

			// Act:
			component.initalizeEmptySeller();
			expect(component.seller).toBe(seller);
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
		it('should call close function when name and category has been filled in', () => {
			// Arrange:
			component.activeModal = mockModal;
			component.seller = {
				id: 0,
				name: 'Kalli',
				category: 'Hestar',
				imagePath: ''
			};
			mockModal.close.calls.reset();

			// Act:
			component.onOk();
			expect(mockModal.close).toHaveBeenCalled();
		});

		it('should not call close function when name and category have not been filled in', () => {
			// Arrange:
			component.activeModal = mockModal;
			component.seller = {
				id: 0,
				name: 'Jón',
				category: '',
				imagePath: ''
			};
			mockModal.close.calls.reset();
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();
			// Arrange:
			component.seller = {
				id: 0,
				name: '',
				category: 'Húsgögn',
				imagePath: ''
			};
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();
			// Arrange:
			component.seller = {
				id: 0,
				name: '',
				category: '',
				imagePath: ''
			};
			// Act:
			component.onOk();
			expect(mockModal.close).not.toHaveBeenCalled();
		});

		it('should display a toastr warning when form hasnt been filled', () => {
			// Arrange:
			component.seller = {
				id: 0,
				name: '',
				category: '',
				imagePath: ''
			};
			mockToastrService.warning.calls.reset();

			// Act:
			component.onOk();
			expect(mockToastrService.warning).toHaveBeenCalled();
		});
	});
});
