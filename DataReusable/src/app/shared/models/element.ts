import { Attribute } from "./attribute";

export class Element {
	private name: string;
	private attributes: Record<string, Attribute>;
	// private relations: string[];
	// private key: string;
	
	/**
	 * A basic element of a data model, it can be thought of as a table
	 * in the context of a relational database
	 * @param name the identifier for the object type
	 */
	constructor(name?: string){
		this.name = name ? name : '';
		this.attributes = {};
	}

	getName(): string{ return this.name; }

	getAttributes(): Record<string, Attribute>{ 
		return this.attributes; 
	}
	addAtribute(name: string, att: Attribute): void{
		this.attributes[name] = att;
	}
	removeAttribute(att: string): boolean{
		console.log(this.attributes);
		if (att in this.attributes){
			delete this.attributes[att];
			return true;
		}
		return false;
	}
	
}
