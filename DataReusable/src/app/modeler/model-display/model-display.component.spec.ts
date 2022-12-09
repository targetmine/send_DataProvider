import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { ModelDisplayComponent } from './model-display.component';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';

describe('ModelDisplayComponent: integration test', () => {
  let component: ModelDisplayComponent;
  let fixture: ComponentFixture<ModelDisplayComponent>;
	let service: ShareModelService;

	let e: Element;
	let a: Attribute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDisplayComponent);
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

	it('should rename an element from the model', ()=>{
		let e: Element = new Element();
		service.addElement('ele1', e);
		fixture.detectChanges();
		console.log(component.model);
		expect(component.model).toEqual(service.dataModel.getValue());
	});
	it('should remove an element from the model');

	it('should rename an attribute from an element in the model');
	it('should update an attribute from an element in the model');
	it('should remove an attribute from an element in the model');

});


// it('should create', () => {
// 	expect(component).toBeTruthy();
// });