import { ShareModelService } from './share-model.service';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';

describe('Service: ShareModelService', () => {
	let service: ShareModelService;
	let e: Element;
	let a: Attribute;

  beforeEach(() => {
    service = new ShareModelService();
		e = new Element('ele1');
		a = { name: 'attr1', type: 'number', unique: false };
		service.addElement(e);
		service.addAttribute('ele1', a);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should be initialized with an empty DataModel', () => {
		service = new ShareModelService();
		expect(service.dataModel.getValue()).toEqual([]);
	});

	it('should add the requested <element> to the model', () => {
		expect(service.dataModel.getValue().length).toBe(1);
		expect(service.dataModel.getValue()).toContain(e);
	});

	it('should not add duplicated elements', ()=>{
		expect(service.dataModel.getValue()).toContain(e);
		service.addElement(e);
		expect(service.dataModel.getValue().length).toBe(1);
		expect(service.dataModel.getValue()).toContain(e);
	});

	it('should be able to rename an <element> from the model', ()=>{
		service.renameElement('ele1', 'newName');
		e.name = 'newName';
		expect(service.dataModel.getValue()).toContain(e);
	});

	it('should remove the requested <element> from the model', ()=>{
		service.removeElement('ele1');
		expect(service.dataModel.getValue()).toEqual([]);
	});

	it('should not remove unexisting element', () => {
		service.removeElement('test');
		expect(service.dataModel.getValue().length).toBe(1);
		expect(service.dataModel.getValue()).toContain(e);
	});

 	it('should add an <attribute> to the corresponding <element> in the model', ()=>{
		let atrs = service.dataModel.getValue()[0].attributes;
		expect(atrs.length).toBe(1);
		expect(atrs).toContain(a);
	});

	it('should be able to rename an <attribute> from the given <element> in the model', ()=>{
		service.renameAttribute('ele1', 'attr1', 'newName');
		let atrs = service.dataModel.getValue()[0].attributes;
		expect(atrs[0].name).toBe('newName');
	});

	it('should be able to update an <attribute> from the given <element> in the model', ()=>{
		let atrs = service.dataModel.getValue()[0].attributes;
		expect(atrs[0].type).toEqual('number');
		expect(atrs[0].unique).toBeFalse();
		
		a.type = 'string';
		a.unique = true;
		service.updateAttribute('ele1', 'attr1', a);
		atrs = service.dataModel.getValue()[0].attributes;
		expect(atrs[0].type).toEqual('string');
		expect(atrs[0].unique).toBeTrue();
	});
	
	it('should remove an <attribute> from the corresponding <element> in the model', ()=>{
		service.removeAttribute('ele1', 'attr1');
		let atrs = service.dataModel.getValue()[0].attributes;
		expect(atrs).toEqual([]);
	});
});


