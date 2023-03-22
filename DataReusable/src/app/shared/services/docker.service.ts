import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from '../models/element';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(
		private http: HttpClient
	) { }

	public addElements(eles: Element[]){
		const url = `${environment.serverURL}/provider/elements/`;
		
		let tables = [];
		for (const ele of eles){
			let table: any = {
				name: '',
				columns: [],
				primaryKeys: []
			};
			table['name'] = ele.name;
			for (const attr of ele.attributes){
				table.columns.push(`${attr.name} ${attr.type}`);
				if (attr.unique)
					table.primaryKeys.push(attr.name);
			};
			
			tables.push(table);
		}
		const body = {
			tables: tables
		};
		return this.http.post(url, body, {
			headers: {
				'Content-type': 'application/json'
			},
			observe: 'response'
		});
	}

	public uploadElement(element: string, primaryKeys: string[], columns: string[], data: any){
		const url = `${environment.serverURL}/provider/element/${element}`
		const body = {
			columns: columns,
			primaryKeys: primaryKeys,
			data: data
		}
		return this.http.put(url, body, {
			headers:{
				'Content-type': 'application/json'
			},
			observe: 'response'
		});
	}

	public commitDataContainer(){
		console.log('start: commit database image')
		const url = `${environment.serverURL}/builder/commit/`;
		return this.http.post(url, {observe: 'response'});
	}

}
