import { DataObject, ELEMENT_DATA } from './datamodel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datareuse-parser',
  templateUrl: './datareuse-parser.component.html',
  styleUrls: ['./datareuse-parser.component.css']
})
export class DatareuseParserComponent implements OnInit {
	
	public infoFile: boolean = true;
	public relFile: boolean = false;

	public dataModel: DataObject[] = [];
	
	/** */
	constructor() { }

	/** */
  ngOnInit(): void {
		// this.dataModel = ELEMENT_DATA;
	}
}
