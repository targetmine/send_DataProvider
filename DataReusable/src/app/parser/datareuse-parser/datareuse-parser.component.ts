import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datareuse-parser',
  templateUrl: './datareuse-parser.component.html',
  styleUrls: ['./datareuse-parser.component.css']
})
export class DatareuseParserComponent {

	firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required],
	});

	isLinear = false; // whether steps should be completed on sequence or not
  
	constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
