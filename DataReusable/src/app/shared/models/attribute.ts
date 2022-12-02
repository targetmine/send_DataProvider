export type AttributeType = 'string' | 'number';
export const ATTRIBUTE_TYPES = ['string', 'number'];

/**
 * Convenience class used to manage the definition of the attributes an element
 * in the data model contains
 */
export class Attribute {
	private name: string;
	private type: AttributeType;
	private unique: boolean;

	constructor(name: string, type: AttributeType, unique: boolean = false){
		this.name = name;
		this.type = type;
		this.unique = unique;
	}

	getName(): string { return this.name; }
	
	getType(): string { return this.type; }
	setType(t: AttributeType): void { this.type = t; }
	
	isUnique(): boolean { return this.unique; }
	setUnique(): void { this.unique = true; }
	setNonUnique(): void { this.unique = false; }
}