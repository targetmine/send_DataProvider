import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute } from 'src/app/shared/models/attribute';

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
	
	actionType: FormControl = new FormControl('', Validators.required);

	@ViewChild('modelFileInput')
	modelFileInput!: ElementRef;

	// control to add new Element to the model
	elementName: FormControl = new FormControl('',
		Validators.compose([
			Validators.required, 
			Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
	);
	
	constructor(
		private readonly modelServ: ShareModelService,
		private snackBar: MatSnackBar
	) { }

  ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
		});
  }

	onLoadModel(event:any){
		event.preventDefault();
		this.modelFileInput.nativeElement.click(); // loading file dialog
	}

	onFileSelected(event: any){
		if (typeof (FileReader) !== 'undefined') {
		 	const reader = new FileReader();
			reader.onload = (e: any) => {
				let text = JSON.parse(e.target.result);
				let eles: Element[] = [];
				text.forEach((value: any) => {
					let t:Element = new Element(value._name);
					value._attributes.forEach((a:any) => t.addAtribute(a as unknown as Attribute));
					eles.push(t);
				});
				this.modelServ.dataModel.next(eles);
			};
			reader.readAsText(this.modelFileInput.nativeElement.files[0]);
		}
	}

	onSaveModel(event:any){
		event.preventDefault();
		/* convert model to text */
		let modelText = JSON.stringify(this._model);
		let objectUrl = URL.createObjectURL(new Blob([modelText], {type: "text/text"}));
		const a = document.createElement('a');
		a.download = `model.txt`;
		a.href = objectUrl;
		a.click();
		URL.revokeObjectURL(objectUrl);	
	}

	onAddElement(event: any) {
		event.preventDefault(); // don't refresh the page
		if( this.elementName.valid )
			this.modelServ.addElement(new Element(this.elementName.value));
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}
}
