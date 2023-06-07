import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';
import { firstValueFrom } from 'rxjs';
import { ShareModelService } from './share-model.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
		private http: HttpClient,
		private modelService: ShareModelService
	) { }

	public saveModel(elements: Element[], relations: Relation[]): Promise<HttpResponse<Object>>{
		const url = `${environment.serverURL}/provider/model/`;
		const body = {
			elements: elements,
			relations: relations
		}
		return firstValueFrom(this.http.post(url, body, {
			headers: {'Content-type': 'application/json'},
			observe: 'response'
		}));
	}

	public addElement(element: Element): Promise<HttpResponse<Object>>{
		const url = `${environment.serverURL}/provider/element/`;
		let body: any = {
			name: element.name,
			columns: [],
			primaryKeys: []
		};
		for (const attr of element.attributes){
			body.columns.push(`${attr.name} ${attr.type}`);
			if(attr.unique) body.primaryKeys.push(attr.name);
		};
		return firstValueFrom(this.http.post(url, body, {
			headers: { 'Content-type': 'application/json'	},
			observe: 'response'
		}));
	}

	public addRelation(relation: Relation): Promise<HttpResponse<Object>>{
		const eles = this.modelService.elements.getValue();
		switch (relation.cardinality){
			case 'one to one': {
				const url = `${environment.serverURL}/provider/element/add-column/`;
				const columns = eles
					.filter (e => e.name === relation.trgElement)
					.reduce((e,c) => [...e, ...c.attributes], [] as Attribute[])
					.filter(a => a.unique)
					.map(a => { return {name: `${relation.trgElement}_${a.name}`, type: a.type} })
					;
				const body = {
					name: relation.srcElement,
					columns
				};
				return firstValueFrom(this.http.put(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
			}
			case 'one to many': {
				const url = `${environment.serverURL}/provider/element/add-column/`;
				const columns = eles
					.filter (e => e.name === relation.srcElement)
					.reduce((e,c) => [...e, ...c.attributes], [] as Attribute[])
					.filter(a => a.unique)
					.map(a => {return {name: `${relation.srcElement}_${a.name}`, type: a.type} })
					;
				const body = {
					name: relation.trgElement,
					columns
				};return firstValueFrom(this.http.put(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
			}
			case 'many to many': {
				const url = `${environment.serverURL}/provider/element/`;
				let columns: any[] = [];
				let primaryKeys: any[] = [];
				eles
					.filter (e => e.name === relation.srcElement)
					.reduce((e,c) => [...e, ...c.attributes], [] as Attribute[])
					.filter(a => a.unique)
					.forEach(a => {
						columns.push(`src_${a.name} ${a.type}`);
						primaryKeys.push(`src_${a.name}`);
					});
				eles
					.filter (e => e.name === relation.trgElement)
					.reduce((e,c) => [...e, ...c.attributes], [] as Attribute[])
					.filter(a => a.unique)
					.forEach(a => {
						columns.push(`trg_${a.name} ${a.type}`);
						primaryKeys.push(`trg_${a.name}`);
					});
				const body = {
					name: `${relation.srcElement}_${relation.trgElement}`,
					primaryKeys: primaryKeys,
					columns: columns
				};return firstValueFrom(this.http.post(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
			}
		}
	}

	public uploadElement(element: string, primaryKeys: string[], columns: string[], data: any){
		const url = `${environment.serverURL}/provider/element/${element}`
		const body = {
			columns: columns,
			primaryKeys: primaryKeys,
			data: data
		}
		return firstValueFrom(this.http.put(url, body, {
			headers:{ 'Content-type': 'application/json' },
			observe: 'response'
		}));
	}

}
