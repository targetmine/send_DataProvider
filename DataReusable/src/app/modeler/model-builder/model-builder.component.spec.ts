import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ModelBuilderComponent } from './model-builder.component';
import { ShareModelService } from '../../shared/services/share-model.service';
import { AppModule } from 'src/app/app.module';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute } from 'src/app/shared/models/attribute';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModelBuilderComponent: integration test', () => {
  let component: ModelBuilderComponent;
  let fixture: ComponentFixture<ModelBuilderComponent>;
	let service: ShareModelService;
	let e: Element;
	let a: Attribute;
	
  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports:[
				AppModule
			],
      declarations: [
				ModelBuilderComponent,
			]
    })
		.compileComponents();
    
    fixture = TestBed.createComponent(ModelBuilderComponent);
		service = TestBed.inject(ShareModelService);
    component = fixture.componentInstance;

		e = new Element();
		a = new Attribute('number');
		e.addAtribute('attr1', a);
		service.addElement('ele1', e);

    fixture.detectChanges();
	});

	it('should get the starting model from the service', () => {
		expect(component.model).toEqual(service.dataModel.getValue());
	});

	it('should add an element to the model', () => {
		e = new Element();
		service.addElement('ele2', e);
		fixture.detectChanges();
		expect(component.model).toEqual(service.dataModel.getValue());
	});

	it('should add an attribute to an element in the model', ()=>{
		a = new Attribute('string', true);
		service.addAttribute('ele1', 'attr2', a);
		fixture.detectChanges();
		expect(component.model).toEqual(service.dataModel.getValue());
	});
});

fdescribe('ModelBuilderComponent: unit test', () => {
  let component: ModelBuilderComponent;
  let fixture: ComponentFixture<ModelBuilderComponent>;
	let service: ShareModelService;
	let e1: Element = new Element(), e2: Element = new Element();
	let a1: Attribute = new Attribute('number', true), a2: Attribute = new Attribute('string', true);
	e1.addAtribute('id', a1);
	e2.addAtribute('name', a2);

	beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports:[ AppModule	],
      declarations: [	ModelBuilderComponent	]
    })
		.compileComponents();
    
    fixture = TestBed.createComponent(ModelBuilderComponent);
		service = TestBed.inject(ShareModelService);
    component = fixture.componentInstance;
		component.ngOnInit();

		spyOnProperty(service, 'dataModel', 'get')
			.and
			.returnValue(new BehaviorSubject<{[key:string]: Element}>({'ele1': e1,	'ele2': e2}));
    
		fixture.detectChanges();
	});

	it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('actionType invalid only when empty', ()=>{
		expect(component.actionType.valid).toBeFalsy();
		component.actionType.setValue('add-element',{emitEvent: true});
		fixture.detectChanges();
		expect(component.actionType.valid).toBeTruthy();
	})

	it('actionType value is binded to select element on template', fakeAsync(()=>{
		expect(component.actionType.value).toBe('');
		component.actionType.setValue('add-element', {emitEvent: true});
		expect(component.actionType.value).toBe('add-element');

		fixture.detectChanges();
		let select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
		console.log(select.selected);
		// expect(select.value).toBeFalsy();
		// expect(component.actionType.value).toBeFalsy();

		// select.value = 'add-element';
		// select.dispatchEvent(new Event('change'));
		// fixture.detectChanges();
		// tick();
		
		// expect(select.value).toEqual(component.actionType.value);
		// select.triggerEventHandler('selectionChange', {value: 'add-element'});
		
		
		


	// 	console.log(el.nativeElement);
	}));
	
});


// spy = spyOnProperty(service, 'dataModel', 'get').and.callThrough();
// 			// .returnValue(new BehaviorSubject<{[key: string]: Element}>({}));
// 		expect(spy).toHaveBeenCalled();


