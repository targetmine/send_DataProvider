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

	public getDataModel(): BehaviorSubject<DataObject[]> {
		return this.dataModel;
	}

	public addData(obj: DataObject): void {
		const current = this.dataModel.value;
		const updated = [...current, obj];
		this.dataModel.next(updated);

		console.log(`service ${this.dataModel}`);
	}
}
