import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'DataReusable';
	// tabs using for navigation purposes in the main app
	protected tabs: any = [];
	private activeTabIndex: number = 0;
	
	/**
	 * 
	 * @param router 
	 */
	constructor(private router:Router){
		// initialize navigation tabs
		this.tabs = [
			{ label: 'Model Builder', link: './builder', index: 0 },
			//{ label: 'File Parser', link: './parser', index: 1 },
		];
	}

	/**
	 * 
	 */
	ngOnInit(): void {
		// update the currently active tag on user interaction
		this.router.events.subscribe((res) => {
			this.activeTabIndex = this.tabs.indexOf(
				this.tabs.find((t: { link: string; }) => t.link === '.'+this.router.url)
			);
		});
	}
}
