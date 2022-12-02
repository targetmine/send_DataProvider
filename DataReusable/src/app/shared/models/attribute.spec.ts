import { Attribute } from "./attribute";

describe('Class: Attribute', () => {
	let attribute: Attribute | null;

	beforeEach(() => {
		attribute = new Attribute('test', 'string');
	});

	afterEach(() => {
		attribute = null;
	});

	it(`should have 'test' as the name of the attribute`, () => {
		expect(attribute?.getName()).toEqual('test');
	});

	it(`should have 'string' as the default `, () => {
		expect(attribute?.getType()).toEqual('string');
	});

	it(`should update the type of an attribute`, () => {
		attribute?.setType('number');
		expect(attribute?.getType()).toEqual('number');
	});

	it(`should not be unique by default`, () => {
		expect(attribute?.isUnique()).toBeFalsy();
	});

	it(`should be set unique when using setUnique`, () => {
		attribute?.setUnique();
		expect(attribute?.isUnique()).toBeTruthy();
	});

	it(`should be set to non unique when using setNonUnique`, () => {
		attribute = new Attribute('test', 'string', true);
		attribute?.setNonUnique();
		expect(attribute?.isUnique()).toBeFalsy();
	});

});
