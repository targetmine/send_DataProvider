import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'DataReusable - Provider';
	// tabs using for navigation purposes in the main app
	protected tabs: any[] = [];
	protected activeTabIndex: number = 0;
	
	/**
	 * 
	 * @param router 
	 */
	constructor(
		private readonly navitationService: NavigationService
	){ }

	/**
	 * 
	 */
	ngOnInit(): void {
		// initialize navigation tabs
		this.navitationService.tabs$.subscribe(tabs => this.tabs = tabs);
	}	
}
