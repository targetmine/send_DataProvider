enum AttributeType{
	STRING = 'string',
	NUMBER = 'number',
}

class ObjectAttribute {
	private name: string;
	private type: AttributeType;

	constructor(name: string){
		this.name = name;
		this.type = AttributeType.NUMBER;
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
	constructor(name: string){
		this.name = name;
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

export const ELEMENT_DATA: DataObject[] = [
  new DataObject('Hydrogen'),
  new DataObject('Helium'),
  new DataObject('Lithium'),
  new DataObject('Beryllium'),
  new DataObject('Boron'),
  new DataObject('Carbon'),
  new DataObject('Nitrogen'),
  new DataObject('Oxygen' ),
  new DataObject('Fluorine' ),
  new DataObject( 'Neon'),
  new DataObject( 'Sodium' ),
  new DataObject( 'Magnesium'),
  new DataObject( 'Aluminum'),
  new DataObject( 'Silicon' ),
  new DataObject( 'Phosphorus'),
  new DataObject( 'Sulfur'),
  new DataObject( 'Chlorine'),
  new DataObject( 'Argon'),
  new DataObject( 'Potassium'),
  new DataObject( 'Calcium')
];