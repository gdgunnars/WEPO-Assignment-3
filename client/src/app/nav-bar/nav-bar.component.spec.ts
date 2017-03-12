import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {Router} from "@angular/router";
import { RouterLinkStubDirective } from '../router-stubs';
import {RouterOutletStubComponent} from '../router-stubs';
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('NavBarComponent', () => {
	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;


	const mockRouter = {
		navigate: jasmine.createSpy('navigate')
	};


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ 
				NavBarComponent,
				RouterLinkStubDirective, 
				RouterOutletStubComponent 
				],
				schemas: [ NO_ERRORS_SCHEMA ], 
			providers: [{
				provide: Router,
				useValue: mockRouter
			}]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).not.toBeNull();
	});
});
