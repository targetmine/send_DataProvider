import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Element } from 'src/app/shared/models/element'; 
import { ATTRIBUTE_TYPES } from 'src/app/shared/models/attribute';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	protected AttributeTypes: string[] = ATTRIBUTE_TYPES;
	
	// the current model used for the database
	protected _model!: Record<string, Element>;
	get model(): Record<string, Element> { return this._model; }
	// how many elements are currently in the model
	protected _modelLength: number = 0;
	get modelLength(): number { return this._modelLength; }
	// what are the names of the elements currently in the model
	protected _elements: string[] = [];
	get elements(): string[] { return this._elements; }

	// elements for the form used in model's field definition/manipulation
	actionType: FormControl = new FormControl('', Validators.required);
	// control used for the addition of a new Entity (element) to the data model
	elementName: FormControl = new FormControl('',
		Validators.compose([
			Validators.required, 
			Validators.pattern('[a-zA-Z]*')
		])
	);
	
	// controls used for the addition of a single attribute to an Entity that is 
	// already part of the data model
	// attributeForm = this.formBuilder.group({
	// 	selectedElement: new FormControl('', { validators: Validators.required }),
	// 	newAttribute: new FormControl('', { 
	// 		validators: Validators.compose([ 
	// 			Validators.required, 
	// 			Validators.pattern('[a-zA-Z0-9]*')
	// 		])
	// 	}),
	// 	attributeType: new FormControl('', { validators: Validators.required }),
	// 	isUnique: new FormControl(false),
	// });
	//
	sourceElement: FormControl = new FormControl(null, Validators.required);
	targetElement: FormControl = new FormControl(null, Validators.required);
	

  constructor(
		private readonly modelServ: ShareModelService,
		// private formBuilder: FormBuilder,
		private snackBar: MatSnackBar) { }

  ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
			this._modelLength = Object.keys(this._model).length;
			this._elements = Object.keys(this._model);
		})
  }

	/**
	 * handle the request for addition of a single element to the current data 
	 * model
	 * @param event 
	 */
	onClickAddElement(event: any) {
		event.preventDefault(); // don't refresh the page ?
		if( this.elementName.valid ){
			let newEle = new Element(this.elementName.value);
			this.modelServ.addElement(this.elementName.value, newEle);
		}
			
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}


}
