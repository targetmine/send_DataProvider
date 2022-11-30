import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataObject, ObjectAttribute } from '../models/datamodel';


@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	// the data model to be shared between components
	private dataModel: BehaviorSubject<Record<string,DataObject>> = new BehaviorSubject<{[key: string]: DataObject}>({});

	constructor() { }

	/**
	 * Returns the list of entities and relations that make up the current data
	 * model for the application
	 * @returns the current data model
	 */
	public getDataModel(): BehaviorSubject<{[key: string]: DataObject}> {
		return this.dataModel;
	}

	/**
	 * Add a new Entity to the current data model
	 * @param obj the Data object  to be added
	 */
	public addData(obj: string): void {
		let updated = this.dataModel.value;
		updated[obj] = new DataObject(obj);
		this.dataModel.next(updated);

		console.log(`service ${this.dataModel}`);
	}

	public addAttribute(obj: string, opts: ObjectAttribute):void {
		this.dataModel.value[obj].addAtribute(opts);
	}
}
