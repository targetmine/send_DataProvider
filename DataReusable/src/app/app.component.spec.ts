import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderModule } from './loader/loader.module';
import { ModelerModule } from './modeler/modeler.module';
import { DatabaseService } from './shared/services/database.service';
import { ShareModelService } from './shared/services/share-model.service';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {}

describe('AppComponent', () => {
	let app: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let shareService: ShareModelService;
	let dockerService: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
				HttpClientModule,
				BrowserModule,
				AppRoutingModule,
				ModelerModule,
				LoaderModule,
				MatTabsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
				RouterOutletStubComponent,
      ],
    }).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		shareService = TestBed.inject(ShareModelService);
		dockerService = TestBed.inject(DatabaseService);
		app = fixture.componentInstance;
		fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

	it(`should include a 'router-outlet' element`, () => {
		const ro = fixture.nativeElement.querySelector('router-outlet');
		expect(ro).toBeTruthy();
	})
});

