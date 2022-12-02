import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Element } from '../models/element';
import { Attribute, AttributeType } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	// the data model to be shared between components
	private dataModel: BehaviorSubject<Record<string,Element>> = new BehaviorSubject<{[key: string]: Element}>({});

	constructor() { }

	/**
	 * Returns the list of entities and relations that make up the current data
	 * model for the application
	 * @returns the current data model
	 */
	public getDataModel(): BehaviorSubject<{[key: string]: Element}> {
		return this.dataModel;
	}

	/**
	 * Add a new Entity to the current data model
	 * @param obj the entity to be added
	 */
	public addElement(obj: string): void {
		let updated = this.dataModel.value;
		updated[obj] = new Element(obj);
		this.dataModel.next(updated);
	}

	public renameElement(oldName: string, newName: string){

	}

	public removeElement(obj: string): void {

	}

	public addAttribute(obj: string, opts: Attribute):void {
		let updated = this.dataModel.value;
		updated[obj].addAtribute(opts.getName(), opts);
		this.dataModel.next(updated);
	}

	/**
	 * 
	 * @param ele the element whose attribute we are trying to remove
	 * @param attr the attribute to be removed
	 * @returns true if attribute was remove, false otherwise
	 */
	public removeAttribute(ele: string, attr: string): boolean{
		let updated = this.dataModel.value;
		let result = updated[ele].removeAttribute(attr);
		this.dataModel.next(updated);
		return result;
	}
}
