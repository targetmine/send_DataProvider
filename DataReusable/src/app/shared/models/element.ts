import { Attribute } from "./attribute";

/**
 * A basic element of a data model, it can be thought of as a table
 * in the context of a relational database
 */
export class Element {
	protected _name: string;
	protected _attributes: Record<string, Attribute>;
	// private relations: string[];
	// private key: string;
	
	constructor(name: string){
		this._name = name;
		this._attributes = {};
	}

	get name(): string { return this._name; }
	set name(n: string) { this._name = n};

	get attributes(): Record<string, Attribute> { return this._attributes };
	addAtribute(name: string, att: Attribute): void{
		this.attributes[name] = att;
	}

	renameAttribute(name: string, newName: string): void {
		if (name in this.attributes){
			this.attributes[newName] = this.attributes[name];
			delete this.attributes[name];
		}
	} 

	updateAttribute(name: string, att: Attribute): void {
		if (name in this.attributes){
			this.attributes[name] = att;
		}
	}

	removeAttribute(att: string): boolean{
		if (att in this.attributes){
			delete this.attributes[att];
			return true;
		}
		return false;
	}
	
}
