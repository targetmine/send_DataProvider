import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataObject } from './shared/models/datamodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'DataReusable';
	tabs: any = [];
	activeTabIndex: number = 0;

	public dataModel: DataObject[] = [];

	constructor(private router:Router){
		this.tabs = [
			{ label: 'Model Builder', link: './builder', index: 0 },
			{ label: 'File Parser', link: './parser', index: 1 },
		]
	}

	ngOnInit(): void {
		this.router.events.subscribe((res) => {
			this.activeTabIndex = this.tabs.indexOf(
				this.tabs.find((t: { link: string; }) => t.link === '.'+this.router.url)
			);
		})
	}
}
