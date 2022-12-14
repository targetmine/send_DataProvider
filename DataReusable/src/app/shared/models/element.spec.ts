import { Attribute } from "./attribute";
import { Element } from "./element";

describe('Class: Element', () => {
	let element: Element;
	let attr: Attribute;

	beforeEach(() => {
		element = new Element('ele1');
		attr = new Attribute('number');
		element.addAtribute('attr1', attr);
	});

	it(`should create`, () => {
		expect(element).toBeTruthy();
	})

	it(`should have an empty list of attributes by default`, () => {
		element = new Element('ele1');
		expect(element.attributes).toEqual({});
	});

	it(`should add an attribute when one is provided`, () => {
		element.addAtribute('test', attr);
		expect(element.attributes).toEqual(jasmine.objectContaining({'test': attr}));
	});

	it(`should rename an existing attribute`, () => {
		element.renameAttribute('attr1', 'newName');
		expect(element.attributes).toEqual(jasmine.objectContaining({'newName': attr}));
		expect(element.attributes).not.toEqual(jasmine.objectContaining({'attr1': attr}));
	});

	it('should update an existing attribute', () => {
		attr.type = 'string'
		element.updateAttribute('attr1', attr);
		expect(element.attributes['attr1'].type).toBe('string');
	});

	it(`should return true after removing an attribute `, () => {
		expect(element.removeAttribute('attr1')).toBeTrue();
	});

	it(`should not include a removed element in its list of attributes`, () => {
		element.removeAttribute('attr1');
		expect(element.attributes).not.toEqual(jasmine.objectContaining({'attr1': attr}));
	});

	it(`should return false when removal of attribute is not possible`, () => {
		expect(element.removeAttribute('test')).toBeFalse();
	});

	it(`should have an unaltered list of attributes after an unsuccesful removal`, () => {
	 	let alist = element.attributes;
		element.removeAttribute('test');
		let blist = element.attributes;
		expect(alist).toEqual(blist);	
	});
});