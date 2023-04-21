import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

	tabs$: BehaviorSubject<any[]>;
  
	constructor(
		private router: Router
	){ 
		this.tabs$ = new BehaviorSubject<any[]>([
			{ 
				label: 'Model Builder', 
				link: './builder', 
				active: true, 
				index: 0, 
				disabled: false 
			},
			{ 
				label: 'Data Loader', 
				link: './loader', 
				active: false, 
				index: 1, 
				disabled: true 
			},
		]);
	
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd ))
			.subscribe((res) => {
				if( res instanceof NavigationEnd ){
					console.log(res);
					let tabs = this.tabs$.value.map( (t: {active: boolean, link: string}) => {
						t.active = t.link === '.'+res.url ? true : false;
						return t;
					});
					this.tabs$.next(tabs);
				}
			});
	}

	onTabToggleEnabled(i: number): void{
		let value = this.tabs$.value;
		if(value[i].index === i)
			value[i].disabled = !value[i].disabled;
		else{
			value = value.map((t: { index: number; disabled: boolean; }) => {
				if(t.index === i)
					t.disabled = !t.disabled;
				return t;
			})
		}
		this.tabs$.next(value);
	}
}
