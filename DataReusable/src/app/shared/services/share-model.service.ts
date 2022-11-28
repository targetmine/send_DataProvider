import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataObject } from '../models/datamodel';


@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	// the data model to be shared between components
	private dataModel: BehaviorSubject<DataObject[]> = new BehaviorSubject<DataObject[]>([]);

	constructor() { }

	/**
	 * Returns the list of entities and relations that make up the current data
	 * model for the application
	 * @returns the current data model
	 */
	public getDataModel(): BehaviorSubject<DataObject[]> {
		return this.dataModel;
	}

	/**
	 * Add a new Entity to the current data model
	 * @param obj the Data object  to be added
	 */
	public addData(obj: DataObject): void {
		const current = this.dataModel.value;
		const updated = [...current, obj];
		this.dataModel.next(updated);

		console.log(`service ${this.dataModel}`);
	}
}
