import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { ModelBuilderComponent } from './model-builder.component';

import { ModelerModule } from '../modeler.module';
import { ShareModelService } from '../../shared/services/share-model.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Element } from 'src/app/shared/models/element'; 
import { Relation } from 'src/app/shared/models/relation';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatMenuHarness, MatMenuItemHarness } from '@angular/material/menu/testing';
import { MatButtonHarness } from '@angular/material/button/testing';


@Injectable()
class mockShareModelService extends ShareModelService{
	protected override _elements$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
	protected override _relations$: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
}

@Injectable()
class mockDatabaseService extends DatabaseService{}

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

	describe('Template tests:', () => {
		let loader: HarnessLoader;
		let component: ModelBuilderComponent;
		let fixture: ComponentFixture<ModelBuilderComponent>;
		beforeEach(async() => {
			TestBed.configureTestingModule({
				imports:[]
			})
			.compileComponents();
			fixture = TestBed.createComponent(ModelBuilderComponent);
			component = fixture.componentInstance;
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

		let menu: MatMenuHarness;
		it('should not display the menu on start', async()=>{
			menu = await loader.getHarness(MatMenuHarness.with({selector: '#modelMenu'}));
			expect(await menu.isOpen()).toBeFalsy();
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

});
