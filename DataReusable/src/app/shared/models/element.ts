import { Attribute } from "./attribute";

/**
 * A basic element of a data model, it can be thought of as a table
 * in the context of a relational database
 */
export class Element {
	protected _attributes: Record<string, Attribute>;
	// private relations: string[];
	// private key: string;
	
	constructor(){
		this._attributes = {};
	}

	get attributes(): Record<string, Attribute> { return this._attributes };
	addAtribute(name: string, att: Attribute): void{
		this.attributes[name] = att;
	}
	removeAttribute(att: string): boolean{
		if (att in this.attributes){
			delete this.attributes[att];
			return true;
		}
		return false;
	}
	
}
