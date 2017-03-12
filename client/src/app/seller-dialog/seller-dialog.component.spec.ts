/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgModule } from '@angular/core';
import { SellerDialogComponent } from './seller-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('SellerDialogComponent', () => {
	let component: SellerDialogComponent;
	let fixture: ComponentFixture<SellerDialogComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SellerDialogComponent ],
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
