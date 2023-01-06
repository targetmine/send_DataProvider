import { Attribute } from "./attribute";
import { Element } from "./element";

describe('Class: Element', () => {
	let element: Element;
	let attr: Attribute;

	beforeEach(() => {
		element = new Element('ele1');
		attr = {
			name: 'attr1',
			type: 'number',
			unique: false
		} as Attribute
	});

	it(`should create`, () => {
		expect(element).toBeTruthy();
	})

	it(`should have the correct name`, ()=>{
		expect(element.name).toBe('ele1');
	});

	it(`should be renamed when requested`, ()=>{
		element.name = 'newName';
		expect(element.name).toBe('newName');
	})

	it(`should not have attributes on initialization`, () => {
		expect(element.attributes).toEqual([]);
	});

	it(`should add an attribute when one is provided`, () => {
		element.addAtribute(attr);
		expect(element.attributes.length).toBe(1);
		expect(element.attributes).toContain(attr);
	});

	it(`should not add an existing attribute`, ()=>{
		element.addAtribute(attr);
		expect(element.attributes.length).toBe(1);
		element.addAtribute(attr);
		expect(element.attributes.length).toBe(1);
	});

	it(`should rename an existing attribute`, () => {
		element.addAtribute(attr);
		element.renameAttribute('attr1', 'newName');
		expect(element.attributes[0].name).toBe('newName');
	});

	it('should update the type of existing attribute', () => {
		element.addAtribute(attr);
		expect(element.attributes[0].type).toBe('number');
		attr.type = 'string'
		element.updateAttribute('attr1', attr);
		expect(element.attributes[0].type).toBe('string');
	});

	it('should update the uniqueness of existing attribute', () => {
		element.addAtribute(attr);
		expect(element.attributes[0].unique).toBeFalse();
		attr.unique = true;
		element.updateAttribute('attr1', attr);
		expect(element.attributes[0].unique).toBeTrue();
	});

	it(`should remove the requested attribute`, () => {
		element.addAtribute(attr);
		expect(element.attributes).toContain(attr);
		element.removeAttribute('attr1');
		expect(element.attributes).not.toContain(attr);
	});

	it(`should not remove an unexisting element`, () => {
	 	element.addAtribute(attr);
		element.removeAttribute('test');
		expect(element.attributes).toContain(attr);
	});
});