import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ModelBuilderComponent } from './model-builder.component';
import { ShareModelService } from '../../shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element'; 
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelerModule } from '../modeler.module';

import { MatSelectHarness } from '@angular/material/select/testing';

@Injectable()
class mockShareModelService extends ShareModelService{
	protected override _dataModel$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
}

describe('ModelBuilderComponent: unit test', () => {
  let component: ModelBuilderComponent;
  let fixture: ComponentFixture<ModelBuilderComponent>;
	let service: mockShareModelService;
	let loader: HarnessLoader;
	
	beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports:[ ModelerModule	],
      declarations: [ ModelBuilderComponent ],
			providers: [ mockShareModelService ]
    })
		.compileComponents();
    fixture = TestBed.createComponent(ModelBuilderComponent);
		service = TestBed.inject(mockShareModelService);
    component = fixture.componentInstance;
		service.dataModel.subscribe(data => {
			component.model = data;
		});
    fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);
	});

	afterEach(() => fixture.destroy());

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have as model the current state of the service', () => {

	});

	it('should bind actionType to select action on template', async() => {
		const select = await loader.getHarness(MatSelectHarness);
		await select.open();
		let text = await select.getValueText();
		expect(text).toEqual('');
		
		let opts = await select.getOptions();
		expect(opts.length).toBe(3);
		await opts[0].click();
		text = await select.getValueText();
		expect(component.actionType.value).toEqual(text);
	});
	

	// it('actionType invalid only when empty', ()=>{
	// 	expect(component.actionType.valid).toBeFalsy();
	// 	component.actionType.setValue('add-element',{emitEvent: true});
	// 	fixture.detectChanges();
	// 	expect(component.actionType.valid).toBeTruthy();
	// })



// 	it('should get the starting model from the service', () => {
// 		expect(component.model).toEqual(service.dataModel.getValue());
// 	});

// 	it('should add an element to the model', () => {
// 		e = new Element('ele2');
// 		service.addElement('ele2', e);
// 		fixture.detectChanges();
// 		expect(component.model).toEqual(service.dataModel.getValue());
// 	});

// 	it('should add an attribute to an element in the model', ()=>{
// 		a = new Attribute('string', true);
// 		service.addAttribute('ele1', 'attr2', a);
// 		fixture.detectChanges();
// 		expect(component.model).toEqual(service.dataModel.getValue());
// 	});
// });


// describe('ModelBuilderComponent: unit test', () => {
//   let component: ModelBuilderComponent;
//   let fixture: ComponentFixture<ModelBuilderComponent>;
// 	let service: ShareModelService;
// 	let loader: HarnessLoader;

// 	let e1: Element = new Element('ele1'), e2: Element = new Element('ele2');
// 	let a1: Attribute = new Attribute('number', true), a2: Attribute = new Attribute('string', true);
// 	e1.addAtribute('id', a1);
// 	e2.addAtribute('name', a2);

// 	beforeEach(async() => {
//     await TestBed.configureTestingModule({
// 			imports:[
// 				AppModule,
// 			],
//       declarations: [	ModelBuilderComponent	]
//     })
// 		.compileComponents();
    
//     fixture = TestBed.createComponent(ModelBuilderComponent);
// 		service = TestBed.inject(ShareModelService);
//     component = fixture.componentInstance;
// 		component.ngOnInit();
// 		fixture.detectChanges();
// 		loader = TestbedHarnessEnvironment.loader(fixture);
// 	});

	// it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


		


	// it('should display elementName input only when corresponding action is selected', async()=>{
	// 	let ff = await loader.getHarnessOrNull(MatFormFieldHarness.with({selector: '#elementName'}));
	// 	expect(ff).toBeFalsy();

	// 	component.actionType.patchValue('add-element');
	// 	ff = await loader.getHarnessOrNull(MatFormFieldHarness.with({selector: '#elementName'}));
	// 	expect(ff).toBeTruthy();
	// });

	// it('should display element submit button only when corresponding action is selected', ()=>{
	// 	let button = fixture.debugElement.query(By.css('button#elementSubmit'));
	// 	expect(button).toBeFalsy();
	// 	component.actionType.patchValue('add-element');
	// 	fixture.detectChanges();
	// 	button = fixture.debugElement.query(By.css('button#elementSubmit'));
	// 	expect(button).toBeTruthy();
	// });

	// it('element submit button should be available only on a valid element name', async()=>{
	// 	let button = await loader.getHarnessOrNull(MatButtonHarness.with({selector: 'button#elementSubmit'}));
	// 	expect(button).toBeNull();
	// 	component.actionType.patchValue('add-element', {emitEvent: true});
	// 	spyOnProperty(component.elementName, 'valid','get').and.returnValue(true);
		
	// 	button = await loader.getHarness(MatButtonHarness.with({selector: 'button#elementSubmit'}));
	// 	let disabled = await button.isDisabled();
	// 	expect(disabled).toBeFalse();
	// })

	// it('should display source element input only when add relation action is selected', async()=>{
	// 	let select = await loader.getHarnessOrNull(MatSelectHarness.with({selector: '#sourceElement'}));
	// 	expect(select).toBeFalsy();
	// 	component.actionType.patchValue('add-relation');
	// 	select = await loader.getHarness(MatSelectHarness.with({selector: '#sourceElement'}));
	// 	expect(select).toBeTruthy();
	// });

	// it('should display target element input only when add relation action is selected', async()=>{
	// 	let select = await loader.getHarnessOrNull(MatSelectHarness.with({selector: '#targetElement'}));
	// 	expect(select).toBeFalsy();
	// 	component.actionType.patchValue('add-relation');
	// 	select = await loader.getHarness(MatSelectHarness.with({selector: '#targetElement'}));
	// 	expect(select).toBeTruthy();
	// });

	// it('should display relation submit button only add relation action is selected', ()=>{
	// 	let button = fixture.debugElement.query(By.css('button#relationSubmit'));
	// 	expect(button).toBeFalsy();
	// 	component.actionType.patchValue('add-relation');
	// 	fixture.detectChanges();
	// 	button = fixture.debugElement.query(By.css('button#relationSubmit'));
	// 	expect(button).toBeTruthy();
	// });

	// it('relation submit button should be available when valid source and target are selected', async()=>{
	// 	component.actionType.patchValue('add-relation', {emitEvent: true});
	// 	let button = await loader.getHarness(MatButtonHarness.with({selector: 'button#relationSubmit'}));
	// 	let disabled = await button.isDisabled();
	// 	expect(disabled).toBeTrue();
		
	// 	spyOnProperty(component.sourceElement, 'valid', 'get').and.returnValue(true);
	// 	spyOnProperty(component.targetElement, 'valid', 'get').and.returnValue(true);
	// 	button = await loader.getHarness(MatButtonHarness.with({selector: 'button#relationSubmit'}));
	// 	disabled = await button.isDisabled();
	// 	expect(disabled).toBeFalse();
	// })
});
