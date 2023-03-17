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
		
		const body = JSON.stringify(eles);
		return this.http.post(url, body, {
			headers: {
				'Content-type': 'application/json'
			},
			observe: 'response'
		});
	}

	public uploadElement(element: string, columns: string[], data: any){
		const url = `${environment.serverURL}/provider/element/${element}`
		const body = {
			columns: columns,
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
