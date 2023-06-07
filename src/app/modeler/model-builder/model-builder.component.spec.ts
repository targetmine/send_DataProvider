import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ModelBuilderComponent } from './model-builder.component';

import { ModelerModule } from 'src/app/modeler/modeler.module';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Element } from 'src/app/shared/models/element'; 
import { Relation } from 'src/app/shared/models/relation';
import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatMenuHarness, MatMenuItemHarness } from '@angular/material/menu/testing';

@Injectable()
class mockShareModelService extends ShareModelService{
	protected override _elements$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
	protected override _relations$: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
}

@Injectable()
class mockDatabaseService extends DatabaseService {}

@Injectable()
class mockNavigationService extends NavigationService {}

fdescribe('ModelBuilderComponent:', () => {
	let component: ModelBuilderComponent;
	let fixture: ComponentFixture<ModelBuilderComponent>;

	beforeEach(async () => {
    TestBed.configureTestingModule({
			imports:[ 
				HttpClientTestingModule,
				ModelerModule	
			],
      declarations: [ 
				ModelBuilderComponent 
			],
			providers: [
				mockShareModelService,
				mockDatabaseService,
				mockNavigationService
			]
    }).compileComponents();
		fixture = TestBed.createComponent(ModelBuilderComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('Template tests:', () => {
		let loader: HarnessLoader;
		let menu: MatMenuHarness;
		beforeEach(async() => {
			loader = TestbedHarnessEnvironment.loader(fixture);
		});

		it('should display a toolbar with Model and Element options', async() => {
			const tb = await loader.getAllHarnesses(MatToolbarHarness);
			expect(tb.length).toBe(1);
			const opts = await tb[0].getAllHarnesses(MatMenuHarness);
			expect(opts.length).toBe(2);
			expect(await tb[0].getHarness(MatMenuHarness.with({selector: '#modelMenu'}))).toBeTruthy();
			expect(await tb[0].getHarness(MatMenuHarness.with({selector: '#elementMenu'}))).toBeTruthy();
		});
		it('should not display the menu on start', async()=>{
			menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
			expect(await menu.isOpen()).toBeFalsy();
		});
		it('onLoadModel should display the modelFileInput', ()=>{
			fixture.detectChanges();
			const input = fixture.debugElement.query(By.css('#modelFileInput'));
			component.modelFileInput = new ElementRef(input.nativeElement);
			const spy = spyOn(component.modelFileInput.nativeElement, 'click');
			const event = new Event('click');
			component.onLoadModel(event);
			expect(spy).toHaveBeenCalled();
		});
		
		describe('Menu #modelMenu tests:', ()=>{
			beforeEach(async()=>{
				menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
				await menu.open();
			});
			it('load model available on an empty model', async()=>{
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#loadModelMenuItem'}));
				expect(await item.isDisabled()).toBeFalsy();
			});
			it('load module un-available on non-empty model', async()=>{
				component.elements = [{} as Element];
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#loadModelMenuItem'}));
				expect(await item.isDisabled()).toBeTruthy();
			});
			it('export model un-available on an empty model', async ()=>{
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#exportModelMenuItem'}));
				expect(await item.isDisabled()).toBeTruthy();
			});
			it('export model option available on non-empty model', async()=>{
				component.elements = [{} as Element];
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#exportModelMenuItem'}));
				expect(await item.isDisabled()).toBeFalsy();
			});
			it('finish model option un-available on an empty model', async()=>{
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#finishModelMenuItem'}));
				expect(await item.isDisabled()).toBeTruthy();
			});
			it('finish model option available on a non-empty model', async()=>{
				component.elements = [{} as Element];
				const item = await menu.getHarness(MatMenuItemHarness.with({selector: '#finishModelMenuItem'}));
				expect(await item.isDisabled()).toBeFalsy();
			});
			it('should call onFileSelected when modelFileInput is clicked', async()=>{
				const spy = spyOn(component, 'onFileSelected');
				const item = fixture.debugElement.query(By.css('#modelFileInput'));
				item.triggerEventHandler('change',{});
				fixture.detectChanges();
				expect(spy).toHaveBeenCalled();
			});
			it('should call onLoadModel when loadModelMenuItem is clicked', async()=>{
				const spy = spyOn(component, 'onLoadModel');
				const item = await menu.getHarness(
					MatMenuItemHarness.with({selector: '#loadModelMenuItem'})
					);
				await item.click();
				expect(spy).toHaveBeenCalled();
			});
			it('should call onExportModel when exportModelMenuItem is clicked', async()=>{
				component.elements = [{} as Element ];
				const spy = spyOn(component, 'onExportModel');
				const item = await menu.getHarness(
					MatMenuItemHarness.with({selector: '#exportModelMenuItem'})
				);
				expect(await item.isDisabled()).toBeFalsy();
				await item.click();
				expect(spy).toHaveBeenCalled();
			});
			it('should call onFinishModel when finishModelMenuItem is clicked', async()=>{
				component.elements = [{} as Element ];
				const spy = spyOn(component, 'onFinishModel');
				const item = await menu.getHarness(
					MatMenuItemHarness.with({selector: '#finishModelMenuItem'})
				);
				expect(await item.isDisabled()).toBeFalsy();
				await item.click();
				expect(spy).toHaveBeenCalled();
			});
		}); // describe #modelMenu

		describe('Menu #elementMenu tests:', ()=>{
			beforeEach(async()=>{
				menu = await loader.getHarness(MatMenuHarness.with({selector: '#elementMenu'}));
				await menu.open();
			});
			it('should call onAddElement when addElementMenuItem is clicked', async()=>{
				const spy = spyOn(component, 'onAddElement');
				const item = await menu.getHarness(
					MatMenuItemHarness.with({selector: '#addElementMenuItem'})
				);
				await item.click();
				expect(spy).toHaveBeenCalled();
			});
		}); //describe #elementMenu
	});

	describe('Component tests:', ()=>{
		
		it('onFileSelected() should call on to read the file', waitForAsync(() => {
			const dummyJson = { elements:[], relations: [] };
			const frspy = spyOn(component, 'readFile').and.resolveTo(dummyJson);
			component.onFileSelected(new Blob());
			expect(frspy).toHaveBeenCalled();
		}));
		it('readFile should return the json object from the file', async () => {
			const dummyJson = { elements:[], relations: [] };
			const dummyfile = new File(
				['{"elements":[], "relations": []}'],
				'filename', 
				{type: 'text/json'}
			);
			const data = await component.readFile(dummyfile);
			expect(data).toEqual(dummyJson);
		});
		it('when readFile is finished, the parsing should be requested', fakeAsync(()=>{
			const dummyJson = { elements:[], relations: [] };
			spyOn(component, 'readFile').and.resolveTo(dummyJson);
			const elementspy = spyOn(component, 'parseElements');
			const relationspy = spyOn(component, 'parseRelations');
			component.onFileSelected(new File([""],'test'))
			fixture.detectChanges();
			tick();
			expect(elementspy).toHaveBeenCalled();
			expect(relationspy).toHaveBeenCalled();
		}));
		it('should parse all the elements', fakeAsync(()=>{
			const dummyEles = { elements: [
				{name: 'ele1', attributes: []} as Element, 
				{name: 'ele2', attributes: []} as Element
			]};
			component.parseElements(dummyEles);
			fixture.detectChanges();
			tick();
			expect(component.elements.length).toBe(2);
			expect(component.elements[0].name).toBe('ele1');
		}));
		it('should parse all the relations', fakeAsync(()=>{
			const dummyRels = { relations: [
				{name: 'rel1'} as Relation, 
				{name: 'rel2'} as Relation
			]};
			component.parseRelations(dummyRels);
			fixture.detectChanges();
			tick();
			expect(component.relations.length).toBe(2);
			expect(component.relations[0].name).toBe('rel1');
		}));
	});

});
