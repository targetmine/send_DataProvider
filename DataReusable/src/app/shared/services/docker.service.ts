import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from '../models/element';
import { Relation } from '../models/relation';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(
		private http: HttpClient
	) { }

	public createPostgresContainer(eles: Element[], rels: Relation[]) {
		console.log('start: startPostgresContainer');
		const url = `${environment.serverURL}/builder/tables/`;
		const body = `[${JSON.stringify(eles)}, ${JSON.stringify(rels)}]`;
		return this.http.post(url, body, {
				headers: {
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
