import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	protected _dataModel$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
	get dataModel(): BehaviorSubject<Element[]> { return this._dataModel$; }

	public addElement(ele: Element): void {
		let updated = this._dataModel$.value;
		let eles = updated.map(v => v.name);
		if (eles.indexOf(ele.name) !== -1 )
			return;
		
		updated.push(ele);
		this._dataModel$.next(updated);
	}

	public renameElement(name: string, newName: string): void {
		let updated = this._dataModel$.value.map(v => {
			if( v.name === name )
				v.name = newName;
			return v;
		});
		this._dataModel$.next(updated);
	}
	
	public removeElement(name: string): void {
		let updated = this._dataModel$.value.filter(v => v.name !== name);
		this._dataModel$.next(updated);
	}

	public addAttribute(eleName: string, attr: Attribute):void {
		let updated = this._dataModel$.value.map(v => {
			if( v.name === eleName )
				v.addAtribute(attr);
			return v;
		});
		this._dataModel$.next(updated);
	}

	public renameAttribute(eleName: string, attName: string, newName: string): void {
		let updated = this._dataModel$.value.map(v =>{
			if( v.name === eleName)
				v.renameAttribute(attName, newName);
			return v;
		});
		this._dataModel$.next(updated);
	}

	public updateAttribute(eleName: string, attName: string, attr: Attribute): void {
		let updated = this._dataModel$.value.map(v => {
			if( v.name === eleName )
				v.updateAttribute(attName, attr);
			return v;
		});
		this._dataModel$.next(updated);
	}

	public toggleUnique(eleName: string, attName: string): void {
		let updated = this._dataModel$.value.map(v=>{
			if( v.name === eleName )
				v.toogleAttributeUniqueness(attName);
			return v;
		});
		this._dataModel$.next(updated);
	}

	public removeAttribute(eleName: string, attrName: string): void{
		let updated = this._dataModel$.value.map(v =>{
			if( v.name === eleName )
				v.removeAttribute(attrName);
			return v;
		});
		this._dataModel$.next(updated);
	}	
}
