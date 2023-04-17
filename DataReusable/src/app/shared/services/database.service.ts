import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from '../models/element';
import { Relation } from 'src/app/shared/models/relation';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
		private http: HttpClient
	) { }

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
		return new Promise((resolve, reject) => resolve(new HttpResponse<Object>({})));
	}

	public addRelationOneToOne(table: string, columns: any[]){
		const url = `${environment.serverURL}/provider/relation/one-to-one/`;
		const body = { table, columns };
		return firstValueFrom(this.http.post(url, body, {
			headers: { 'Content-type': 'application/json'},
			observe: 'response'
		}));
	}

	public addRelationOneToMany(table: string, columns: any[]){
		const url = `${environment.serverURL}/provider/relation/one-to-one/`;
	}
	
	public addRelationManyToMany(){
		const url = `${environment.serverURL}/provider/relation/many-to-many/`;
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
