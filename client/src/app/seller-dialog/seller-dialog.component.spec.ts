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
		open: jasmine.createSpy('open')
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

	describe('when seller-dialogs seller is undefined upon ngOninit', () => {
		it('should create an empty seller with default values', () => {
			component.seller = undefined;
			component.initalizeEmptySeller();
			expect(component.seller.id).toBe(0);
		});
	});
});
