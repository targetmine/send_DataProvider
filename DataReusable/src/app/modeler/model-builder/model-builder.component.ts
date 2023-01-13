import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element'; 

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	// the current model used for the database
	protected _model: Element[] = [];
	get model() { return this._model; }
	set model(eles: Element[]) { this._model = eles; }
	
	// control to select the addition of an element or relation to the model
	// const actions = [
	// 	{ value: 'load-model', text: 'Load model', disabled: false },
	// 	{ value: 'save-model', text: 'Save model', disabled: true },
	// </mat-option>
	// <mat-option 
	// 	value="add-element"
	// 	>Add new Element
	// </mat-option>
	// <mat-option 
	// 	value="add-relation" 
	// 	[disabled]="model.length == 0"
	// 	>Add new Relationvalue: text: disabled: true
	// 	}
	// ];
	actionType: FormControl = new FormControl('', Validators.required);

	// control to add new Element to the model
	elementName: FormControl = new FormControl('',
		Validators.compose([
			Validators.required, 
			Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
	);
	// controls to add a new Relation to the model
	sourceElement: FormControl = new FormControl(null, Validators.required);
	targetElement: FormControl = new FormControl(null, Validators.required);
	
  constructor(
		private readonly modelServ: ShareModelService,
		private snackBar: MatSnackBar
	) { }

  ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
		});
  }

	onActionChange(event:any){
		console.log(`AT ${this.actionType}`);
		switch(this.actionType.value){
			case 'save-model':
				console.log('savemodel');
				this.onSaveModel(event);
		}
	}

	onAddElement(event: any) {
		event.preventDefault(); // don't refresh the page
		if( this.elementName.valid )
			this.modelServ.addElement(new Element(this.elementName.value));
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}

	onSaveModel(event:any){
		/* convert model to text */
		let modelText = JSON.stringify(this._model);//.toString();
		const a = document.createElement('a');
		let objectUrl;
	
		objectUrl = URL.createObjectURL(new Blob([modelText], {type: "text/text"}));
		a.download = `model.txt`;
		
		a.href = objectUrl;
		a.click();
		URL.revokeObjectURL(objectUrl);	
	}

	selectedFile: any = null;
	onFileSelected(event: any):void {
		this.selectedFile = event.target.files[0];
		
	}
}
