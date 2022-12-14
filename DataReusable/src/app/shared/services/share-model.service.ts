import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	// the data model to be shared between components
	protected _dataModel: BehaviorSubject<Record<string,Element>> = new BehaviorSubject<{[key: string]: Element}>({});

	constructor() { }

	get dataModel(): BehaviorSubject<{[key: string]: Element}> {
		return this._dataModel;
	}

	/**
	 * Add a new Element to the current data model
	 * @param obj the element to be added
	 */
	public addElement(name: string, obj: Element): void {
		let updated = this._dataModel.value;
		updated[name] = obj;
		this._dataModel.next(updated);
	}

	public removeElement(name: string): void {
		let updated = this._dataModel.value;
		if (name in updated){
			delete updated[name];
			this._dataModel.next(updated);
		}
	}

	public renameElement(name: string, newName: string): void {
		let updated = this._dataModel.value;
		if (name in updated){
			updated[name].name = newName;
			updated[newName] = updated[name];
			delete updated[name];
			this._dataModel.next(updated);
		}
	}

	public addAttribute(eleName: string, attName: string, attr: Attribute):void {
		let updated = this._dataModel.value;
		updated[eleName].addAtribute(attName, attr);
		this._dataModel.next(updated);
	}

	public renameAttribute(eleName: string, attName: string, newName: string): void {
		let updated = this._dataModel.value;
		updated[eleName].renameAttribute(attName, newName);
		this._dataModel.next(updated);
	}

	public updateAttribute(eleName: string, attName: string, attr: Attribute): void {
		let updated = this._dataModel.value;
		updated[eleName].updateAttribute(attName, attr);
		this._dataModel.next(updated);
	}

	/**
	 * 
	 * @param ele the element whose attribute we are trying to remove
	 * @param attr the attribute to be removed
	 * @returns true if attribute was remove, false otherwise
	 */
	public removeAttribute(ele: string, attr: string): void{
		let updated = this._dataModel.value;
		updated[ele].removeAttribute(attr);
		this._dataModel.next(updated);
	}

	
}
