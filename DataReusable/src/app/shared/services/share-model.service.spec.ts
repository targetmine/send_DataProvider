import { ShareModelService } from './share-model.service';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';
import { Relation } from '../models/relation';

describe('Service: ShareModelService - Service definition', () => {
	let service: ShareModelService;
  beforeEach(() => {
    service = new ShareModelService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should be initialized with an empty list of Elements and Relations', () => {
		expect(service.elements.getValue()).toEqual([]);
		expect(service.relations.getValue()).toEqual([]);
	});
});

describe('Service: ShareModelService - Element routines', () => {
	let service: ShareModelService;
	let baseElement: Element;
	beforeEach(() => {
		service = new ShareModelService();
		baseElement = { name: 'base', attributes: [] };
		service.addElement(baseElement);
	});

	it('should be able to add Elements', () => {
		let testElement: Element = { name: 'test', attributes: [] };
		service.addElement(testElement);
		expect(service.elements.getValue()).toContain(testElement);
	});

	it('should not add duplicated elements', ()=>{
		service.addElement(baseElement);
		expect(service.elements.getValue().length).toBe(1);
	});

	it('should rename an Element', ()=>{
		service.renameElement('base', 'newName');
		expect(service.elements.getValue().length).toBe(1);
		expect(service.elements.getValue()[0].name).toBe('newName');
	});

	it('should remove an Element', ()=>{
		service.removeElement('base');
		expect(service.elements.getValue()).toEqual([]);
	});

	it('should not remove unexisting element', () => {
		service.removeElement('test');
		expect(service.elements.getValue().length).toBe(1);
		expect(service.elements.getValue()).toContain(baseElement);
	});
});

describe('Service: ShareModelService - Attribute routines', () => {
	let service: ShareModelService;
	let baseElement: Element;
	let baseAttribute: Attribute;
	beforeEach(() => {
		service = new ShareModelService();
		baseElement = { name: 'base', attributes: [] };
		baseAttribute = { name: 'id', type: 'number', unique: true}
		service.addElement(baseElement);
	});
 	
	it('should add an Attribute', ()=>{
		service.addAttribute('base', baseAttribute);
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
		expect(service.elements.getValue()[0].attributes).toContain(baseAttribute);
	});

	it('should rename an Attribute', ()=>{
		service.addAttribute('base', baseAttribute);
		service.renameAttribute('base', 'id', 'newName');
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
		expect(service.elements.getValue()[0].attributes[0].name).toBe('newName');
	});

	it('should update the properties of an Attribute', ()=>{
		service.addAttribute('base', baseAttribute);
		baseAttribute.type = 'string';
		baseAttribute.unique = false;
		service.updateAttribute('base', 'id', baseAttribute);
		expect(service.elements.getValue()[0].attributes[0].type).toEqual('string');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeFalse();
	});

	it('should toogle the uniqueness property of an Attribute', () => {
		service.addAttribute('base', baseAttribute);
		expect(service.elements.getValue()[0].attributes[0].unique).toBeTrue();
		service.toggleUnique('base', 'id');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeFalse();
		service.toggleUnique('base', 'id');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeTrue();
	});
	
	it('should remove an Attribute', ()=>{
		service.addAttribute('base', baseAttribute);
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
		service.removeAttribute('base', 'id');
		expect(service.elements.getValue()[0].attributes).toEqual([]);
	});
});

describe('Service: ShareModelService - Relation routines', () => {
	let service: ShareModelService;
	let baseRelation: Relation;
	beforeEach(() => {
		service = new ShareModelService();
		baseRelation = {
			name: 'testRelation', 
			srcElement: 'source', 
			srcAttribute: 'srcAttribute',
			trgElement: 'target',
			trgAttribute: 'trgAttribute',
			cardinality: 'one-one' 
		};
	});

	it('should add a new Relation', () => {
		service.addRelation(baseRelation);
		expect(service.relations.getValue().length).toBe(1);
		expect(service.relations.getValue()).toContain(baseRelation);
	});
	
	it('should remove all Relations based on Element name', () => {
		service.addRelation({name: '1', srcElement: 'remove'} as Relation);
		service.addRelation({name: '2', srcElement: 'doNotRemove'} as Relation);
		service.addRelation({name: '3', trgElement: 'remove'} as Relation);
		service.addRelation({name: '4', trgElement: 'doNotRemove'} as Relation);
		expect(service.relations.getValue().length).toBe(4);
		service.removeRelationElement('remove');
		expect(service.relations.getValue().length).toBe(2);
		expect(service.relations.getValue()[0].srcElement).toBe('doNotRemove');
		expect(service.relations.getValue()[1].trgElement).toBe('doNotRemove');
	});

	it('should remove all Relations based on Attribute name', () => {
		service.addRelation({name: '1', srcAttribute: 'remove'} as Relation);
		service.addRelation({name: '2', srcAttribute: 'doNotRemove'} as Relation);
		service.addRelation({name: '3', trgAttribute: 'remove'} as Relation);
		service.addRelation({name: '4', trgAttribute: 'doNotRemove'} as Relation);
		expect(service.relations.getValue().length).toBe(4);
		service.removeRelationAttribute('remove');
		expect(service.relations.getValue().length).toBe(2);
		expect(service.relations.getValue()[0].srcAttribute).toBe('doNotRemove');
		expect(service.relations.getValue()[1].trgAttribute).toBe('doNotRemove');
	});
});