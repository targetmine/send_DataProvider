import { Attribute } from "./attribute";

describe('Class: Attribute', () => {
	let attribute: Attribute;

	beforeEach(() => {
		attribute = new Attribute('number');
	});

	it(`should create`, () => {
		expect(attribute).toBeTruthy();
	})

	it(`should have 'string' as the default `, () => {
		expect(attribute.type).toEqual('number');
	});

	it(`should update the type of an attribute`, () => {
		attribute.type = 'string';
		expect(attribute.type).toEqual('string');
	});

	it(`should not be unique by default`, () => {
		expect(attribute.unique).toBeFalsy();
	});

	it(`should update the unique value when requested`, () => {
		attribute.unique = true;
		expect(attribute.unique).toBeTruthy();
	});
});
