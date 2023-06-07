import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AddItemDialogComponent } from "./add-item-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelerModule } from '../modeler.module';
import { MatButtonHarness } from '@angular/material/button/testing';


describe('AddAttributeDialogComponent: Element addition', () => {
  let component: AddItemDialogComponent;
  let fixture: ComponentFixture<AddItemDialogComponent>;
	let loader: HarnessLoader;
	
	const MatDialogRefMock = {
		close: () => {}
	};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
      declarations: [ AddItemDialogComponent ],
			providers: [
				{ 
					provide: MatDialogRef, 
					useValue: MatDialogRefMock },
				{ 
					provide: MAT_DIALOG_DATA, 
					useValue: {
						type: 'Element'
				 	}
				}
			]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);
  });

	afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
		expect(component.itemType).toBe('Element');
  });

	it('should provide an input field for name', () => {
		const nameInput = fixture.nativeElement.querySelector('input');
		expect(nameInput).toBeTruthy();
	});

	it('should bind the input to the form control for name', () => {
		const nameInput = fixture.nativeElement.querySelector('input');
		const event = new Event('input');
		nameInput.value = 'test';
		nameInput.dispatchEvent(event);
		expect(component.elementForm.get('name')?.value).toEqual('test');
	});

	it('should enable submit only on valid name', async() => {
		let submit = await loader.getHarness(MatButtonHarness.with({selector:'button#elementSubmit'}));
		expect(await submit.isDisabled()).toBeTruthy();
		
		component.elementForm.setValue({name: 'validName'});
		component.elementForm.updateValueAndValidity();
		submit = await loader.getHarness(MatButtonHarness.with({selector:'button#elementSubmit'}));
		expect(await submit.isDisabled()).toBeFalsy();
	});

	it('should return unidentified on cancel', async() => {
		let cancelSpy = spyOn(component, 'onCancel').and.callThrough();
		let closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();
		let cancel = await loader.getHarness(MatButtonHarness.with({selector: 'button#cancel'}));
		await cancel.click();
		expect(cancelSpy).toHaveBeenCalledTimes(1);
		expect(closeSpy).toHaveBeenCalledOnceWith(undefined);
	});

	it('should return en element with name on submit', async() => {
		component.elementForm.setValue({name: 'validName'});
		component.elementForm.updateValueAndValidity();
		let submitSpy = spyOn(component, 'onSubmit').and.callThrough();
		let closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();
		let submit = await loader.getHarness(MatButtonHarness.with({selector: 'button#elementSubmit'}));
		await submit.click();
		expect(submitSpy).toHaveBeenCalledTimes(1);
		expect(closeSpy).toHaveBeenCalledOnceWith({ name: 'validName', attributes: [] });
	});

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
