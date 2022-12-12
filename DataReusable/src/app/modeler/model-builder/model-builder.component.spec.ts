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

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

fdescribe('ModelBuilderComponent: unit test', () => {
  let component: ModelBuilderComponent;
  let fixture: ComponentFixture<ModelBuilderComponent>;
	let service: ShareModelService;
	let loader: HarnessLoader;

	let e1: Element = new Element(), e2: Element = new Element();
	let a1: Attribute = new Attribute('number', true), a2: Attribute = new Attribute('string', true);
	e1.addAtribute('id', a1);
	e2.addAtribute('name', a2);

	beforeEach(async() => {
    await TestBed.configureTestingModule({
			imports:[
				AppModule,
			],
      declarations: [	ModelBuilderComponent	]
    })
		.compileComponents();
    
    fixture = TestBed.createComponent(ModelBuilderComponent);
		service = TestBed.inject(ShareModelService);
    component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);
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

	it('actionType value is binded to select action on template', async() => {
		expect(component.actionType.value).toBe('');
		component.actionType.patchValue('add-element');
		expect(component.actionType.value).toBe('add-element');
		
		const select = await loader.getHarness(MatSelectHarness);
		let value = await select.getValueText();
		expect(value).toEqual('Add new Element');
	});

	it('should display elementName input only when corresponding action is selected', async()=>{
		let ff = await loader.getHarnessOrNull(MatFormFieldHarness.with({selector: '#elementName'}));
		expect(ff).toBeFalsy();

		component.actionType.patchValue('add-element');
		ff = await loader.getHarnessOrNull(MatFormFieldHarness.with({selector: '#elementName'}));
		expect(ff).toBeTruthy();
	});

	it('should display element submit button only when corresponding action is selected', ()=>{
		let button = fixture.debugElement.query(By.css('button#elementSubmit'));
		expect(button).toBeFalsy();
		component.actionType.patchValue('add-element');
		fixture.detectChanges();
		button = fixture.debugElement.query(By.css('button#elementSubmit'));
		expect(button).toBeTruthy();
	});

	it('element submit button should be available only on a valid element name', async()=>{
		let button = await loader.getHarnessOrNull(MatButtonHarness.with({selector: 'button#elementSubmit'}));
		expect(button).toBeNull();
		component.actionType.patchValue('add-element', {emitEvent: true});
		spyOnProperty(component.elementName, 'valid','get').and.returnValue(true);
		
		button = await loader.getHarness(MatButtonHarness.with({selector: 'button#elementSubmit'}));
		let disabled = await button.isDisabled();
		expect(disabled).toBeFalse();
	})

	it('should display source element input only when add relation action is selected', async()=>{
		let select = await loader.getHarnessOrNull(MatSelectHarness.with({selector: '#sourceElement'}));
		expect(select).toBeFalsy();
		component.actionType.patchValue('add-relation');
		select = await loader.getHarness(MatSelectHarness.with({selector: '#sourceElement'}));
		expect(select).toBeTruthy();
	});

	it('should display target element input only when add relation action is selected', async()=>{
		let select = await loader.getHarnessOrNull(MatSelectHarness.with({selector: '#targetElement'}));
		expect(select).toBeFalsy();
		component.actionType.patchValue('add-relation');
		select = await loader.getHarness(MatSelectHarness.with({selector: '#targetElement'}));
		expect(select).toBeTruthy();
	});

	it('should display relation submit button only add relation action is selected', ()=>{
		let button = fixture.debugElement.query(By.css('button#relationSubmit'));
		expect(button).toBeFalsy();
		component.actionType.patchValue('add-relation');
		fixture.detectChanges();
		button = fixture.debugElement.query(By.css('button#relationSubmit'));
		expect(button).toBeTruthy();
	});

	it('relation submit button should be available when valid source and target are selected', async()=>{
		component.actionType.patchValue('add-relation', {emitEvent: true});
		let button = await loader.getHarness(MatButtonHarness.with({selector: 'button#relationSubmit'}));
		let disabled = await button.isDisabled();
		expect(disabled).toBeTrue();
		
		spyOnProperty(component.sourceElement, 'valid', 'get').and.returnValue(true);
		spyOnProperty(component.targetElement, 'valid', 'get').and.returnValue(true);
		button = await loader.getHarness(MatButtonHarness.with({selector: 'button#relationSubmit'}));
		disabled = await button.isDisabled();
		expect(disabled).toBeFalse();
	})
});
