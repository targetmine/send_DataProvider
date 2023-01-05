import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { ModelDisplayComponent } from './model-display.component';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';
import { AppModule } from 'src/app/app.module';

describe('ModelDisplayComponent: integration test', () => {
  let component: ModelDisplayComponent;
  let fixture: ComponentFixture<ModelDisplayComponent>;
	let service: ShareModelService;
	let e: Element;
	let a: Attribute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [AppModule],
      declarations: [ ModelDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDisplayComponent);
		service = TestBed.inject(ShareModelService);
    component = fixture.componentInstance;
    
		e = new Element('ele1');
		a = new Attribute('number');
		e.addAtribute('attr1', a);
		service.addElement('ele1', e);

		fixture.detectChanges();
  });

	it('should get the starting model from the service', () => {
		expect(component.model).toEqual(service.dataModel.getValue());
	});

	it('should rename an element from the model', ()=>{
		service.renameElement('ele1', 'newName');
		fixture.detectChanges();
		expect(component.model).toEqual(jasmine.objectContaining({'newName': e}));
		expect(component.model).not.toEqual(jasmine.objectContaining({'ele1': e}));
	});

	it('should not rename an element with the name of an existing element from the model', ()=>{
		let nn = 'newName';
		let ne = new Element(nn);
		ne.addAtribute('attr1', a);
		service.addElement(nn, ne);
		fixture.detectChanges();
		expect(component.model).toEqual(jasmine.objectContaining({'newName': ne}));
		expect(component.model).toEqual(jasmine.objectContaining({'ele1': e}));

		service.renameElement('ele1', nn);
		fixture.detectChanges();
		expect(component.model[nn]).toEqual(ne);
		expect(component.model['ele1']).toEqual(e);
	});

	it('should remove an element from the model', ()=>{
		service.removeElement('ele1');
		fixture.detectChanges();
		expect(component.model).toEqual({});
	});

	it('should allow the addition of attributes to an Element', ()=>{
		a = new Attribute('string');
		service.addAttribute('ele1', 'newattr', a);
		fixture.detectChanges();
		expect(component.model['ele1'].attributes).toEqual(jasmine.objectContaining({'newattr': a}));
	});

	it('should rename an attribute from an element in the model', ()=>{
		service.renameAttribute('ele1', 'attr1', 'newName');
		fixture.detectChanges();
		expect(component.model['ele1'].attributes).toEqual(jasmine.objectContaining({'newName': a}));
		expect(component.model['ele1'].attributes).not.toEqual(jasmine.objectContaining({'attr1': a}));
	});

	it('should update an attribute from an element in the model', ()=>{
		let b = new Attribute('string', true);
		service.updateAttribute('ele1', 'attr1', b);
		fixture.detectChanges();
		expect(component.model['ele1'].attributes).toEqual(jasmine.objectContaining({'attr1': b}));
		expect(component.model['ele1'].attributes).not.toEqual(jasmine.objectContaining({'attr1': a}));
	});

	it('should remove an attribute from an element in the model', ()=>{
		service.removeAttribute('ele1', 'attr1');
		fixture.detectChanges();
		console.log(component.model);
		expect(component.model['ele1'].attributes).toEqual({});
	});
});

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { MatHeaderCellHarness, MatTableHarness } from '@angular/material/table/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { BehaviorSubject, Subject } from 'rxjs';

fdescribe('ModelDisplayComponent: unit test', ()=>{
	let component: ModelDisplayComponent;
	let fixture: ComponentFixture<ModelDisplayComponent>;
	let loader: HarnessLoader;
	let service: ShareModelService;
	let elements: Record<string, Element>;
	
	beforeEach(async()=>{
		await TestBed.configureTestingModule({
			imports: [AppModule],
			declarations: [ ModelDisplayComponent ]
		})
		.compileComponents();
		
		fixture = TestBed.createComponent(ModelDisplayComponent);
		service = TestBed.inject(ShareModelService);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);

		elements = {
			gene: <Element><unknown>{
				name: 'gene',
				attributes: {
					id: <Attribute>{ type: 'string', unique: true },
					other: <Attribute>{ type: 'number', unique: false }
				}
			},
			protein: <Element><unknown>{
				name: 'protein',
				attributes: {
					id: <Attribute>{ type: 'string', unique: true },
					other: <Attribute>{ type: 'number', unique: false }
				}
			}
		};

		// spyOnProperty(component, 'model', 'get').and.returnValue(elements);
		// spyOnProperty(service.dataModel, 'value', 'get').and.returnValue(elements);
		// service.dataModel.next(testmodel);
	});

	afterEach(()=>fixture.destroy());

	it('should create', ()=>{
		expect(component).toBeTruthy();
	});

	it('should display the columns specified in _displayedColumns', async()=>{
		let headers = await loader.getAllHarnesses(MatHeaderCellHarness);
		let colNames = await parallel(() => headers.map(row => row.getColumnName()));
		expect(colNames).toEqual(component.displayedColumns);
	});

	it('should display all elements in the `Elements` column', async()=>{
		service.dataModel.next(elements);
		let table = await loader.getHarness(MatTableHarness);
		let cols = await table.getCellTextByColumnName();
		let testElements = Object.keys(elements);
		testElements.forEach((e)=>{
			expect(cols['elements'].text).toContain(e);
		});
	});

	it('should try to delete the element when the `remove` button is pressed', async()=>{
		service.dataModel.next(elements);
		let removeSpy = spyOn(component, 'onRemoveElement');
		//click remove
		let testElements = Object.keys(elements);
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.remove-element'}));
		expect(buttons.length).toEqual(testElements.length);
		let i = 0;
		for (const b of buttons){
		 	await b.click();
			expect(removeSpy).toHaveBeenCalledWith(testElements[i]);
			++i;
		};
	});

	it('should display the rename dialog when the `edit` button for an element is pressed', async()=>{
		service.dataModel.next(elements);
		let displaySpy = spyOn(component, 'onDisplayRenameElement');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.edit-element'}));
		let testElements = Object.keys(elements);
		let i = 0;
		for (const b of buttons){
			await b.click();
			expect(displaySpy).toHaveBeenCalledWith(testElements[i]);
			i++;
		}
	});

	it('should display the list of attributes of each element');
});