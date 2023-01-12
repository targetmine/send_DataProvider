import { Attribute } from "./attribute";

/** A basic element of a data model, it can be thought of as a table
 * in the context of a relational database */
export class Element{
	protected _name: string;
	get name(): string { return this._name; }
	set name(n: string) { this._name = n};

	protected _attributes: Attribute[];
	get attributes(): Attribute[] { return this._attributes };
	set attributes(atts: Attribute[]) { this._attributes = atts };

	// private relations: string[];
	// private key: string;
	
	constructor(name: string){
		this._name = name;
		this._attributes = [];
	}

	addAtribute(att: Attribute): void{
		let names = this._attributes.map((v) => v.name);
		if (names.indexOf(att.name) !== -1 )
			return;
		this._attributes.push(att);
	}
	
	renameAttribute(name: string, newName: string): void {
		this._attributes = this._attributes.map((v) => {
			if(v.name == name)
				v.name = newName;
			return v;
		});
	} 

	updateAttribute(name: string, att: Attribute): void {
		this._attributes = this._attributes.map((v) => {
			if(v.name == name){
				v.type = att.type;
				v.unique = att.unique;
			}
			return v;
		});
	}

	removeAttribute(name: string): void{
		this._attributes = this._attributes.filter(v => v.name !== name);
	}	
}
