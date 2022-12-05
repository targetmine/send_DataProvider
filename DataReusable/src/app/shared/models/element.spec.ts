import { Attribute } from "./attribute";
import { Element } from "./element";

describe('Class: Element', () => {
	let element: Element;
	let attr: Attribute;

	beforeEach(() => {
		element = new Element('test');
		attr = new Attribute('attr1', 'string');
		element.addAtribute('attr1', attr);
	});

	it(`should have <name> as the name of the element when provided`, () =>{
		element = new Element('name');
		expect(element.getName()).toEqual('name');
	});

	it(`should add an attribute when one is provided`, () => {
		element.addAtribute('test', new Attribute('test', 'number'));
		expect(Object.keys(element.getAttributes())).toContain('test');
	});

	it(`should return true after removing an attribute `, () => {
		expect(element.removeAttribute('attr1')).toBeTrue();
	});

	it(`should not include a removed element in its list of attributes`, () => {
		element.addAtribute('test', new Attribute('test', 'number'));
		expect(element.getAttributes()).not.toContain('test');
	});

	it(`should return false when removal of attribute is not possible`, () => {
		expect(element.removeAttribute('test')).toBeFalse();
	});

	it(`should have an unaltered list of attributes after an unsuccesful removal`, () => {
		let attr = new Attribute('test', 'string');
		element.addAtribute('test', attr);
		let blist = element.getAttributes();
		element.removeAttribute('empty');
		let alist = element.getAttributes();
		expect(alist).toEqual(blist);
		
	});

});