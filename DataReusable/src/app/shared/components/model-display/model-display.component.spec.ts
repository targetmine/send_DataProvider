import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { ModelDisplayComponent } from './model-display.component';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';
import { ModelerModule } from '../../../modeler/modeler.module';
import { MatHeaderCellHarness, MatTableHarness } from '@angular/material/table/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonHarness } from '@angular/material/button/testing';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
class mockShareModelService extends ShareModelService{
	protected override _elements$ = new BehaviorSubject<Element[]>([]);
}

describe('ModelDisplayComponent: unit test', () => {
	let component: ModelDisplayComponent;
	let fixture: ComponentFixture<ModelDisplayComponent>;
	let service: mockShareModelService;
	let loader: HarnessLoader;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
			declarations: [ ModelDisplayComponent ],
			providers: [ mockShareModelService ]
		}).compileComponents();
		fixture = TestBed.createComponent(ModelDisplayComponent);
		service = TestBed.inject(mockShareModelService);
		component = fixture.componentInstance;
		service.elements.subscribe(data => {
			component.elements = data;
		});
		fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);
	});

	afterEach(() => fixture.destroy());

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should reflect on the model the current state of the service', () => {

	});

	it('should display the columns specified in _displayedColumns', async() => {
		loader = TestbedHarnessEnvironment.loader(fixture);
		let headers = await loader.getAllHarnesses(MatHeaderCellHarness);
		let colNames = await parallel(() => headers.map(row => row.getColumnName()));
		expect(colNames).toEqual(component.displayedColumns);
	});

	it('should display elements from the model in the `Elements` column', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		service.elements.next(test);
		let table = await loader.getHarness(MatTableHarness);
		let cols = await table.getCellTextByColumnName();
		test.forEach((t: Element) => {
			expect(cols['elements'].text).toContain(t.name);
		});
	});

	it('should call onRenameElement when the option is clicked', async()=>{
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		service.elements.next(test);
		let renameSpy = spyOn(component, 'onRenameElement');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.rename-element'}));
		for (const [i, b] of buttons.entries()){
		 	await b.click();
			expect(renameSpy).toHaveBeenCalledWith(test[i].name);	
		};
	});

	it('should call onAddAttribute when the option is clicked', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		service.elements.next(test);
		let addSpy = spyOn(component, 'onAddAttribute');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.add-attribute'}));
		for (const [i, b] of buttons.entries()){
		 	await b.click();
			expect(addSpy).toHaveBeenCalledWith(test[i].name);	
		};
	});

	it('should call onRemoveElement when the option is clicked', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		service.elements.next(test);
		let delSpy = spyOn(component, 'onRemoveElement');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.remove-element'}));
		for (const [i, b] of buttons.entries()){
		 	await b.click();
			expect(delSpy).toHaveBeenCalledWith(test[i].name);	
		};
	});

	it('should display the list of attributes of each element', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		test[0].attributes = [
			{ name: 'id', type: 'string', unique: true } as unknown as Attribute,
			{ name: 'other', type: 'number', unique: false } as unknown as Attribute
		];
		test[1].attributes = [
			{ name: 'acession', type: 'number', unique: true } as unknown as Attribute,
		];
		service.elements.next(test);
		let table = await loader.getHarness(MatTableHarness);
		let cols = await table.getCellTextByColumnName(); 
		// all attribute names get fused for the text of a single cell
		for( const[i, t] of test.entries()) {
			t.attributes.forEach((a: Attribute) => {
				expect(cols['attributes'].text[i].indexOf(a.name)).toBeGreaterThanOrEqual(0);
			});
		}
	});

	it('should call onRenameAttribute when the button is clicked', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		test[0].attributes = [
			{ name: 'id', type: 'string', unique: true } as unknown as  Attribute,
			{ name: 'other', type: 'number', unique: false } as unknown as  Attribute
		];
		service.elements.next(test);
		let renameSpy = spyOn(component, 'onRenameAttribute');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.rename-attribute'}));
		expect(buttons.length).toBe(test[0].attributes.length);
		for (const [i, b] of buttons.entries()){
			await b.click();
			expect(renameSpy).toHaveBeenCalledWith(test[0].name, test[0].attributes[i].name);	
		};
	});

	it('should call onRemoveAttribute when the button is clicked', async() => {
		let test: Element[] = [
			{ name: 'gene', attributes: [] },
			{ name: 'protein', attributes: [] }
		];
		test[0].attributes = [
			{ name: 'id', type: 'string', unique: true } as unknown as Attribute,
			{ name: 'other', type: 'number', unique: false } as unknown as Attribute
		];
		service.elements.next(test);
		let delSpy = spyOn(component, 'onRemoveAttribute');
		let buttons = await loader.getAllHarnesses(MatButtonHarness.with({selector: '.remove-attribute'}));
		expect(buttons.length).toBe(test[0].attributes.length);
		for (const [i, b] of buttons.entries()){
		 	await b.click();
			expect(delSpy).toHaveBeenCalledWith(test[0].name, test[0].attributes[i].name);	
		};
	});

});