export enum AttributeType{
	STRING = 'string',
	NUMBER = 'number',
}

export class ObjectAttribute {
	private name: string;
	private type: AttributeType;

	constructor(name: string, type: AttributeType){
		this.name = name;
		this.type = type != undefined ? type : AttributeType.NUMBER;
	}
}

export class DataObject {
	private name: string;
	private key: string;
	private attributes: ObjectAttribute[];
	private relations: string[];

	/**
	 * A basic element of a data model, it can be thought of as a table
	 * in the context of a relational database
	 * @param name the identifier for the object type
	 */
	constructor(name?: string){
		this.name = name ? name : '';
		this.key = '';
		this.attributes = [];
		this.relations = [];
	}

	addAtribute(att: ObjectAttribute){
		this.attributes.push(att);
	}

	getName(): string{ return this.name; }
	getKey(): string{ return this.key; }
}
