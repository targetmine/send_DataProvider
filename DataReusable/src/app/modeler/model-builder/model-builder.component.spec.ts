import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModelBuilderComponent } from './model-builder.component';
import { ShareModelService } from '../../shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element'; 
import { Relation } from 'src/app/shared/models/relation';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelerModule } from '../modeler.module';
import { DockerService } from 'src/app/shared/services/docker.service';

import { MatMenuHarness, MatMenuItemHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

@Injectable()
class mockShareModelService extends ShareModelService{
	protected override _elements$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
	protected override _relations$: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
}

@Injectable()
class mockDockerService extends DockerService{}

fdescribe('ModelBuilderComponent:', () => {

	beforeEach(async () => {
    TestBed.configureTestingModule({
			imports:[ 
				HttpClientTestingModule,
				ModelerModule	
			],
      declarations: [ ModelBuilderComponent ],
    });
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(ModelBuilderComponent);
		const component = fixture.componentInstance;
		expect(component).toBeTruthy();
	});

	// describe('Integration tests:', () => {
		// httpClient = TestBed.inject(HttpClient);
		// httpTestingController = TestBed.inject(HttpTestingController);
		// modelService = TestBed.inject(mockShareModelService);
		// dockerService = TestBed.inject(mockDockerService);
		// modelService.elements.subscribe(data => { component.elements = data;	});
		// modelService.relations.subscribe(data => { component.relations = data; });
    // fixture.detectChanges();
		// loader = TestbedHarnessEnvironment.loader(fixture);
    
		// afterEach(() => {
		// 	httpTestingController.verify(); // assert there are no pending requests
		// });

	// });

	describe('Component tests:', () => {
		let loader: HarnessLoader;
		let component: ModelBuilderComponent;
		beforeEach( async () => {
			TestBed.configureTestingModule({
				imports:[]
			})
			.compileComponents();
			const fixture = TestBed.createComponent(ModelBuilderComponent);
			component = fixture.componentInstance;
			loader = TestbedHarnessEnvironment.loader(fixture);
		});

		it('should display model menu on request', async() => {
			let menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
			expect(await menu.isOpen()).toBeFalsy();
			const button = await loader.getHarness(MatButtonHarness.with({selector: 'button#modelMenu'}));
			await button.click();
			menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
			expect(await menu.isOpen()).toBeTruthy();
		});

		it('makes load model option available only on an empty model', async()=>{
			let menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
			await menu.open();
			let item = await menu.getHarness(MatMenuItemHarness.with({selector: '#loadModelMenuItem'}));
			expect(await item.isDisabled()).toBeFalsy();
			
			component.elements = [{} as Element];
			item = await menu.getHarness(MatMenuItemHarness.with({selector: '#loadModelMenuItem'}));
			expect(await item.isDisabled()).toBeTruthy();
		});

		it('should display element menu on request', async() => {
			let menu = await loader.getHarness(MatMenuHarness.with({selector: '#elementMenu'}));
			expect(await menu.isOpen()).toBeFalsy();
			const button = await loader.getHarness(MatButtonHarness.with({selector: 'button#elementMenu'}));
			await button.click();
			menu = await loader.getHarness(MatMenuHarness.with({selector: '#elementMenu'}));
			expect(await menu.isOpen()).toBeTruthy();
		});

	})


	// it('should bind actionType to select action on template', async() => {
	// 	const select = await loader.getHarness(MatSelectHarness);
	// 	await select.open();
	// 	let text = await select.getValueText();
	// 	expect(text).toEqual('');
		
	// 	let opts = await select.getOptions();
	// 	expect(opts.length).toBe(3);
	// 	await opts[0].click();
	// 	text = await select.getValueText();
	// 	expect(component.actionType.value).toEqual(text);
	// });
	

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
