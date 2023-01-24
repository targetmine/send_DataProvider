import { ShareModelService } from './share-model.service';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';

describe('Service: ShareModelService', () => {
	let service: ShareModelService;
	let e: Element;
	let a: Attribute;

  beforeEach(() => {
    service = new ShareModelService();
		e = { name: 'ele1', attributes: [{ name: 'attr1', type: 'number', unique: false }]};
		service.addElement(e);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should be initialized with an empty DataModel', () => {
		service = new ShareModelService();
		expect(service.elements.getValue()).toEqual([]);
	});

	it('should add the requested <element> to the model', () => {
		expect(service.elements.getValue().length).toBe(1);
		expect(service.elements.getValue()).toContain(e);
	});

	it('should not add duplicated elements', ()=>{
		expect(service.elements.getValue()).toContain(e);
		service.addElement(e);
		expect(service.elements.getValue().length).toBe(1);
		expect(service.elements.getValue()).toContain(e);
	});

	it('should be able to rename an <element> from the model', ()=>{
		service.renameElement('ele1', 'newName');
		e.name = 'newName';
		expect(service.elements.getValue()).toContain(e);
	});

	it('should remove the requested <element> from the model', ()=>{
		service.removeElement('ele1');
		expect(service.elements.getValue()).toEqual([]);
	});

	it('should not remove unexisting element', () => {
		service.removeElement('test');
		expect(service.elements.getValue().length).toBe(1);
		expect(service.elements.getValue()).toContain(e);
	});

 	it('should add an <attribute> to the corresponding <element> in the model', ()=>{
		let atrs = service.elements.getValue()[0].attributes;
		expect(atrs.length).toBe(1);
		expect(atrs).toContain(a);
	});

	it('should be able to rename an <attribute> from the given <element> in the model', ()=>{
		service.renameAttribute('ele1', 'attr1', 'newName');
		let atrs = service.elements.getValue()[0].attributes;
		expect(atrs[0].name).toBe('newName');
	});

	it('should be able to update an <attribute> from the given <element> in the model', ()=>{
		let atrs = service.elements.getValue()[0].attributes;
		expect(atrs[0].type).toEqual('number');
		expect(atrs[0].unique).toBeFalse();
		
		a.type = 'string';
		a.unique = true;
		service.updateAttribute('ele1', 'attr1', a);
		atrs = service.elements.getValue()[0].attributes;
		expect(atrs[0].type).toEqual('string');
		expect(atrs[0].unique).toBeTrue();
	});
	
	it('should remove an <attribute> from the corresponding <element> in the model', ()=>{
		service.removeAttribute('ele1', 'attr1');
		let atrs = service.elements.getValue()[0].attributes;
		expect(atrs).toEqual([]);
	});
});


