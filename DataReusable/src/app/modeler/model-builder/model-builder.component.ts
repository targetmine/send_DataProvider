import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataObject } from 'src/app/shared/models/datamodel';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css']
})
export class ModelBuilderComponent implements OnInit {

	// the current dataModel used for the database
	public data!: DataObject[];

	// elements for the form used in model's field definition/manipulation
	actionType: FormControl = new FormControl(null, Validators.required);

	newElementName: FormControl = new FormControl('',
		Validators.compose([
			Validators.required, 
			Validators.pattern('[a-zA-Z]*')
		])
	);

	// elementForm;
	relationForm = this.formBuilder.group({
		source: new FormControl(null,{ 
			validators: Validators.required
		}),
		target: [null, Validators.required]
	})

  constructor(
		private readonly modelServ: ShareModelService,
		private formBuilder: FormBuilder) { }

  ngOnInit(): void {
		
  }

	onClickAddElement(event: any) {
		const newEle = new DataObject(this.newElementName.value);
		this.modelServ.addData(newEle);
		event.preventDefault();
	}
}
