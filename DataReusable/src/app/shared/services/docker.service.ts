import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Element } from '../models/element';
import { Relation } from '../models/relation';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(
		private http: HttpClient
	) { }

	public startPostgresContainer(): Promise<string>{
		const url = `${environment.serverURL}/container/`;
		return new Promise((resolve, reject) => {
			const container = this.http.get(url, {observe: 'response'})
			.subscribe({
				next: (res: any) => {
					resolve(res.value);
				},
				error: (err: any) => {
					reject(err);
				},
				complete: () => {
					console.log('finished');
				}
			});
		});
	}

	public createTables(eles: Element[], rels: Relation[]): Promise<string>{
		const url =`${environment.serverURL}/tables/`;
		const body = `[${JSON.stringify(eles)}, ${JSON.stringify(rels)}]`;
		return new Promise((resolve, reject) => {
			const tables = this.http.post(url, body, {
				headers: {
					'Content-type': 'application/json'
				},
				observe: 'response'
			})
			.subscribe({
				next: (res: any) => {
					resolve(res.value);
				},
				error: (err: any) => {
					reject(err);
				},
				complete: () => {
					console.log('finished');
				}
			});
		});
	}

}
