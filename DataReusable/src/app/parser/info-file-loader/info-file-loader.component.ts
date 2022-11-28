import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataObject } from '../../shared/models/datamodel';


@Component({
  selector: 'app-info-file-loader',
  templateUrl: './info-file-loader.component.html',
  styleUrls: ['./info-file-loader.component.css']
})
export class InfoFileLoaderComponent implements OnInit {
	// the current dataModel used for the database
	@Input() data !: DataObject[];

	/* elemenents for the form used in data field definition */
	objectForm = this._formBuilder.group({
		selectedObject: null,
	});
	
	
	
	constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

	


}
