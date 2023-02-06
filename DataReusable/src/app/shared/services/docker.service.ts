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

	// public startPostgresContainer(): Promise<string>{
	// 	console.log('start: startPostgresContainer');
	// 	const url = `${environment.serverURL}/container/`;
		
	// 	let p: Promise<string> = new Promise((resolve, reject) => {
	// 		const container = this.http.get(url, {observe: 'response'})
	// 		.subscribe({
	// 			next: (res: any) => {
	// 				console.log('next:', res);
	// 				resolve(res.value);
	// 			},
	// 			error: (err: any) => {
	// 				console.log('Error: startPostgresContainer');
	// 				reject(err);
	// 			},
	// 			complete: () => {
	// 				console.log('finished');
	// 			}
	// 		});
	// 	});
	// 	return p;
	// }

	public startPostgresContainer() {
		console.log('start: startPostgresContainer');
		const url = `${environment.serverURL}/container/`;
		return this.http.get(url, {observe: 'response'});
	}

	public createTables(eles: Element[], rels: Relation[]){
		const url =`${environment.serverURL}/tables/`;
		const body = `[${JSON.stringify(eles)}, ${JSON.stringify(rels)}]`;
		return this.http.post(url, body, {
				headers: {
					'Content-type': 'application/json'
				},
				observe: 'response'
			});
	}

	// public createTables(eles: Element[], rels: Relation[]): Promise<string>{
	// 	const url =`${environment.serverURL}/tables/`;
	// 	const body = `[${JSON.stringify(eles)}, ${JSON.stringify(rels)}]`;
	// 	return new Promise((resolve, reject) => {
	// 		const tables = this.http.post(url, body, {
	// 			headers: {
	// 				'Content-type': 'application/json'
	// 			},
	// 			observe: 'response'
	// 		})
	// 		.subscribe({
	// 			next: (res: any) => {
	// 				resolve(res.value);
	// 			},
	// 			error: (err: any) => {
	// 				reject(err);
	// 			},
	// 			complete: () => {
	// 				console.log('finished');
	// 			}
	// 		});
	// 	});
	// }

	public commitDataContainer(): Promise<string>{
		const url = `${environment.serverURL}/commit/`;
		return new Promise((resolve, reject) => {
			const image = this.http.get(url, {observe: 'response'})
				.subscribe({
					next: (res:any) => resolve(res.value),
					error: (err:any) => reject(err),
					complete: () => console.log('finished')
				});
		});
	}

}
