import { ShareModelService } from './share-model.service';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';

describe('Service: ShareModelService', () => {
	let service: ShareModelService;
	let e: Element;
	let a: Attribute;

  beforeEach(() => {
    service = new ShareModelService();
		e = new Element();
		a = new Attribute('number');
		e.addAtribute('attr1', a);
		service.addElement('ele1', e);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should be initialized with an empty DataModel', () => {
		service = new ShareModelService();
		expect(service.dataModel.getValue()).toEqual({});
	});

	it('should add the requested <element> to the model', () => {
		service.addElement('test', e);
		expect(service.dataModel.getValue()).toEqual(jasmine.objectContaining({'test': e}));
	});

	it('should remove the requested <element> from the model', ()=>{
		service.removeElement('ele1');
		expect(service.dataModel.getValue()).toEqual({});
	});

	it('should keep an unaltered model when trying to remove unexisting element', () => {
		let alist = service.dataModel.getValue();
		service.removeElement('nonele');
		let blist = service.dataModel.getValue();
		expect(alist).toEqual(blist);
	});

	it('should be able to rename an <element> from the model', ()=>{
		service.renameElement('ele1', 'newName');
		expect(service.dataModel.getValue()).toEqual(jasmine.objectContaining({'newName': e}));
	});

 	it('should add an <attribute> to the corresponding <element> in the model', ()=>{
		service.addAttribute('ele1', 'test', a);
		let atrs = service.dataModel.getValue()['ele1'].attributes;
		expect(atrs).toEqual(jasmine.objectContaining({'test': a}));
	});

	it('should be able to rename an <attribute> from the given <element> in the model', ()=>{
		service.renameAttribute('ele1', 'attr1', 'newName');
		let atrs = service.dataModel.getValue()['ele1'].attributes;
		expect(atrs).toEqual(jasmine.objectContaining({'newName': a}));
		expect(atrs).not.toEqual(jasmine.objectContaining({'attr1': a}));
	});

	it('should be able to update an <attribute> from the given <element> in the model', ()=>{
		a.type = 'string';
		a.unique = true;
		service.updateAttribute('ele1', 'attr1', a);
		let atrs = service.dataModel.getValue()['ele1'].attributes;
		expect(atrs['attr1']).toEqual(a);
	});
	
	it('should remove an <attribute> from the corresponding <element> in the model', ()=>{
		service.removeAttribute('ele1', 'attr1');
		let atrs = service.dataModel.getValue()['ele1'].attributes;
		expect(atrs).toEqual({});
	});
});


