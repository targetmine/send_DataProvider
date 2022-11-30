import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataObject, ObjectAttribute, AttributeType } from 'src/app/shared/models/datamodel';
import { ShareModelService } from 'src/app/shared/services/share-model.service';


@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	// the current dataModel used for the database
	private data!: Record<string, DataObject>;
	protected dataLength: number = 0;
	protected elements: string[] = [];

	// elements for the form used in model's field definition/manipulation
	actionType: FormControl = new FormControl(null, Validators.required);
	// control used for the addition of a new Entity (element) to the data model
	newElement: FormControl = new FormControl('',
		Validators.compose([
			Validators.required, 
			Validators.pattern('[a-zA-Z]*')
		])
	);
	// controls used for the addition of a single attribute to an Entity that is 
	// already part of the data model
	attributeForm = this.formBuilder.group({
		selectedElement: new FormControl('', { validators: Validators.required }),
		newAttribute: new FormControl('', { 
			validators: Validators.compose([ 
				Validators.required, 
				Validators.pattern('[a-zA-Z0-9]*')
			])
		}),
		attributeType: new FormControl('', { validators: Validators.required }),
		isUnique: new FormControl(true),
	});
	
	
	
	// elementForm;
	relationForm = this.formBuilder.group({
		source: new FormControl(null,{ 
			validators: Validators.required
		}),
		target: [null, Validators.required]
	})

  constructor(
		private readonly modelServ: ShareModelService,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar) { }

  ngOnInit(): void {
		this.modelServ.getDataModel().subscribe(data => {
			this.data = data;
			this.dataLength = Object.keys(this.data).length;
			this.elements = Object.keys(this.data);
		})
  }

	/**
	 * handle the request for addition of a single element to the current data 
	 * model
	 * @param event 
	 */
	onClickAddElement(event: any) {
		event.preventDefault(); // don't refresh the page ?
		if( this.newElement.valid )
			this.modelServ.addData(this.newElement.value);
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}

	/**
	 * handle the addition of a single attribute to the selected element
	 * @param event 
	 */
	onClickAddAttribute(event:any){
		const newAttr = new ObjectAttribute('otro', AttributeType.STRING);
		this.modelServ.addAttribute('otro', newAttr);
		event.preventDefault();
	}
}
