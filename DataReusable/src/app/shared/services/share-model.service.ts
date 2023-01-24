import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Element } from '../models/element';
import { Attribute } from '../models/attribute';
import { Cardinality, Relation } from '../models/relation';

@Injectable({
  providedIn: 'root'
})
export class ShareModelService {
	protected _elements$: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
	get elements(): BehaviorSubject<Element[]> { return this._elements$; }

	protected _relations$: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
	get relations(): BehaviorSubject<Relation[]> { return this._relations$; }

	public addElement(ele: Element): void {
		let updated = this._elements$.value;
		let eles = updated.map(v => v.name);
		if (eles.indexOf(ele.name) !== -1 )
			return;
		
		updated.push(ele);
		this._elements$.next(updated);
	}

	public renameElement(name: string, newName: string): void {
		let updated = this._elements$.value.map(v => {
			if( v.name === name )
				v.name = newName;
			return v;
		});
		this._elements$.next(updated);
	}
	
	public removeElement(name: string): void {
		let updated = this._elements$.value.filter(v => v.name !== name);
		this._elements$.next(updated);
	}

	public addAttribute(elementName: string, attribute: Attribute):void {
		let updated = this._elements$.value.map(v => {
			if( v.name === elementName ){
				let atts = v.attributes.map(a => { return a.name; });
				if (atts.indexOf(attribute.name) !== -1 ) // dont overwrited attributes
					v.attributes.push(attribute);
			}
			return v;
		});
		this._elements$.next(updated);
	}

	public renameAttribute(elementName: string, attributeName: string, newName: string): void {
		let updated = this._elements$.value.map(v =>{
			if( v.name === elementName)
				v.attributes = v.attributes.map(a => {
					if(a.name === attributeName)
						a.name = newName;
					return a;
				});
			return v;
		});
		this._elements$.next(updated);
	}

	public updateAttribute(elementName: string, attributeName: string, attribute: Attribute): void {
		let updated = this._elements$.value.map(v => {
			if( v.name === elementName )
				v.attributes = v.attributes.map(a => {
					if(a.name == attributeName){
						a.type = attribute.type;
						a.unique = attribute.unique;
					}
					return a;
				});
			return v;
		});
		this._elements$.next(updated);
	}

	public toggleUnique(elementName: string, attributeName: string): void {
		let updated = this._elements$.value.map(v=>{
			if( v.name === elementName )
				v.attributes = v.attributes.map(a => {
					if(a.name === attributeName)
						a.unique = !a.unique;
					return a;
				});
			return v;
		});
		this._elements$.next(updated);
	}

	public removeAttribute(elementName: string, attributeName: string): void{
		let updated = this._elements$.value.map(v =>{
			if( v.name === elementName )
				v.attributes = v.attributes.filter(a => a.name !== attributeName);
			return v;
		});
		this._elements$.next(updated);
	}	

	public addRelation(srcEle: string, trgEle: string, srcAttr: string, trgAttr: string, card: Cardinality){
		if (trgEle < srcEle){
			let ae = srcEle; srcEle = trgEle; trgEle = ae; 
			let aa = srcAttr; srcAttr = trgAttr; trgAttr = aa;
		}
		
		let rname = srcEle+srcAttr+trgEle+trgAttr;
		let updated = this._relations$.value;
		let rels = updated.map(v => v.name);
		if (rels.indexOf(rname) !== -1)
			return;
		updated.push({
			name:rname,
			srcElement: srcEle, srcAttribute: srcAttr,
			trgElement: trgEle, trgAttribute: trgAttr,
			cardinality: card
		} as Relation);
		this._relations$.next(updated);
	}

	public removeRelation(){

	}

}
