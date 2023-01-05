export type AttributeType = 'string' | 'number';
export const ATTRIBUTE_TYPES = ['string', 'number'];

interface IAttribute{
	type: AttributeType;
	unique: boolean;
}

/**
 * Convenience class used to manage the definition of the attributes an element
 * in the data model contains
 */
export class Attribute implements IAttribute {
	protected _type: AttributeType;
	protected _unique: boolean;

	constructor(type: AttributeType, unique: boolean = false){
		this._type = type;
		this._unique = unique;
	}

	get type(): AttributeType { return this._type; }
	set type(t: AttributeType) { this._type = t; }
	
	get unique(): boolean { return this._unique; }
	set unique(u: boolean) { this._unique = u; }
}