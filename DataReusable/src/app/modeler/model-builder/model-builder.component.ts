import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute, AttributeType, ATTRIBUTE_TYPES } from 'src/app/shared/models/attribute';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	protected AttributeTypes: string[] = ATTRIBUTE_TYPES;
	// the current dataModel used for the database
	private data!: Record<string, Element>;
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
		isUnique: new FormControl(false),
	});
	//
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
			this.modelServ.addElement(this.newElement.value);
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}

	/**
	 * handle the addition of a single attribute to the selected element
	 * @param event 
	 */
	onClickAddAttribute(event:any){
		event.preventDefault();
		if( this.attributeForm.valid ){
			const parent = this.attributeForm.get('selectedElement')?.value;
			const name = this.attributeForm.get('newAttribute')?.value;
			const type = this.attributeForm.get('attributeType')?.value;
			const unique = this.attributeForm.get('isUnique')?.value;
			const newAttr = new Attribute(name!, <AttributeType>type!, unique!);
			this.modelServ.addAttribute(parent!, newAttr);
		}
		else
			this.snackBar.open('Some elements of the attribute definition are invalid', 'Close');

	}
}
