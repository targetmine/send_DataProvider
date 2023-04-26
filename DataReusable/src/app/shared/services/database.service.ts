import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from 'src/app/shared/models/element';
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
		let url = `${environment.serverURL}/provider/relation/${relation.name}`;
		const eles = this.modelService.elements.getValue();
		let body: any = {	};
		switch (relation.cardinality){
			case 'one to one': case 'many to one':
				body.element = relation.srcElement;
				body.columns = []
				eles
					.filter(e => e.name === relation.trgElement)
					.map(e => {
						e.attributes.forEach(a => {
							if(a.unique)
								body.columns.push({name: `${e.name}_${a.name}`, type: a.type});
						});
					});
				return firstValueFrom(this.http.post(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
			case 'one to many':
				body.element = relation.trgElement;
				body.columns = [];
				eles
					.filter(e => e.name === relation.srcElement)
					.map(e => {
						e.attributes.forEach(a => {
							if(a.unique)
								body.columns.push({name: `${e.name}_${a.name}`, type: a.type})
						});
					});
				return firstValueFrom(this.http.post(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
			default: //'many to many'
				url = `${environment.serverURL}/provider/element/`;
				body.name = `${relation.srcElement}${relation.srcAttribute}${relation.trgElement}${relation.trgAttribute}`;
				body.columns = [];
				body.primaryKeys = [];
				eles
					.filter(e => e.name === relation.srcElement || e.name === relation.trgElement)
					.map(e => {
						e.attributes.forEach(a => {
							if (a.unique){
								body.columns.push(`${e.name}_${a.name} ${a.type}`);
								body.primaryKeys.push(`${e.name}_${a.name}`);
							}
						});
					});
				return firstValueFrom(this.http.post(url, body, {
					headers: {'Content-type': 'application/json'},
					observe: 'response'
				}));
		}
	}

	public addRelationOneToOne(table: string, columns: any[]){
		const url = `${environment.serverURL}/provider/relation/one-to-one/`;
		const body = { table, columns };
		return firstValueFrom(this.http.post(url, body, {
			headers: { 'Content-type': 'application/json'},
			observe: 'response'
		}));
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
