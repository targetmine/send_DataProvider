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
		baseElement = { name: 'base', attributes: [] } as Element;
		service = new ShareModelService()
		service.elements.next([ baseElement ]);
	});

	it('should be able to add Elements', () => {
		let testElement: Element = { name: 'test', attributes: [] };
		service.addElement(testElement);
		expect(service.elements.getValue().length).toBe(2);
		expect(service.elements.getValue()).toContain(testElement);
	});

	it('should not add duplicated elements', ()=>{
		expect(service.elements.getValue().length).toBe(1);
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
		baseAttribute = { name: 'id', type: 'integer', unique: true } as Attribute;
		baseElement = { name: 'base', attributes: [ baseAttribute ] } as Element;
		service = new ShareModelService()
		service.elements.next([ baseElement ]);
	});
 	
	it('should add an Attribute', ()=>{
		let test = { name: 'test', type: 'integer', unique: false } as Attribute;
		service.addAttribute('base', test);
		expect(service.elements.getValue()[0].attributes.length).toBe(2);
		expect(service.elements.getValue()[0].attributes).toContain(test);
	});

	it('should not add duplicate attributes', ()=>{
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
		service.addAttribute('base', baseAttribute);
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
	})

	it('should rename an Attribute', ()=>{
		service.renameAttribute('base', 'id', 'test');
		expect(service.elements.getValue()[0].attributes.length).toBe(1);
		expect(service.elements.getValue()[0].attributes[0].name).toBe('test');
	});

	it('should update the properties of an Attribute', ()=>{
		baseAttribute.type = 'text';
		baseAttribute.unique = false;
		service.updateAttribute('base', 'id', baseAttribute);
		expect(service.elements.getValue()[0].attributes[0].type).toEqual('text');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeFalse();
	});

	it('should toogle the uniqueness property of an Attribute', () => {
		expect(service.elements.getValue()[0].attributes[0].unique).toBeTrue();
		service.toggleUnique('base', 'id');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeFalse();
		service.toggleUnique('base', 'id');
		expect(service.elements.getValue()[0].attributes[0].unique).toBeTrue();
	});
	
	it('should remove an Attribute', ()=>{
		service.removeAttribute('base', 'id');
		expect(service.elements.getValue()[0].attributes).toEqual([]);
	});
});

describe('Service: ShareModelService - Relation routines', () => {
	let service: ShareModelService;
	let baseRelation: Relation;
	beforeEach(() => {
		baseRelation = {
			name: 'testRelation', 
			srcElement: 'source', 
			srcAttribute: 'srcAttribute',
			trgElement: 'target',
			trgAttribute: 'trgAttribute',
			cardinality: 'one to one' 
		};
		service = new ShareModelService();
		service.relations.next([baseRelation]);
	});

	it('should add a new Relation', () => {
		let test = {name: 'test'} as Relation;
		service.addRelation(test);
		expect(service.relations.getValue().length).toBe(2);
		expect(service.relations.getValue()).toContain(test);
	});

	it('should not add duplicated relations', () => {
		expect(service.relations.getValue().length).toBe(1);
		service.addRelation(baseRelation);
		expect(service.relations.getValue().length).toBe(1);
	})

	it('should remove a relation based on its name', () => {
		expect(service.relations.getValue().length).toBe(1);
		service.removeRelation('testRelation');
		expect(service.relations.getValue()).toEqual([]);
	})
	
	it('should remove all Relations based on Element name', () => {
		service.relations.next([
			{name: '1', srcElement: 'remove'} as Relation,
			{name: '2', srcElement: 'doNotRemove'} as Relation,
			
			{name: '3', trgElement: 'remove'} as Relation,
			{name: '4', trgElement: 'doNotRemove'} as Relation
		]);
		expect(service.relations.getValue().length).toBe(4);
		service.removeRelationElement('remove');
		expect(service.relations.getValue().length).toBe(2);
		expect(service.relations.getValue()[0].srcElement).toBe('doNotRemove');
		expect(service.relations.getValue()[1].trgElement).toBe('doNotRemove');
	});

	it('should remove all Relations based on Attribute name', () => {
		service.relations.next([
			{name: '1', srcAttribute: 'remove'} as Relation,
			{name: '2', srcAttribute: 'doNotRemove'} as Relation,
			{name: '3', trgAttribute: 'remove'} as Relation,
			{name: '4', trgAttribute: 'doNotRemove'} as Relation
		]);
		expect(service.relations.getValue().length).toBe(4);
		service.removeRelationAttribute('remove');
		expect(service.relations.getValue().length).toBe(2);
		expect(service.relations.getValue()[0].srcAttribute).toBe('doNotRemove');
		expect(service.relations.getValue()[1].trgAttribute).toBe('doNotRemove');
	});
});