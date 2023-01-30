import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	// the current model used for the database
	protected _elements: Element[] = [];
	get model() { return this._elements; }
	set model(eles: Element[]) { this._elements = eles; }

	protected _relations!: Relation[];
	
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
		this.modelServ.elements.subscribe(data => this._elements = data );
		this.modelServ.relations.subscribe(data => this._relations = data );
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
				// parse elements
				let eles: Element[] = [];
				text[0].forEach((value: any) => {
					let t: Element = { name: value.name, attributes: [] } as Element;
					value.attributes.forEach((a:any) => t.attributes.push(a as unknown as Attribute));
					eles.push(t);
				});
				this.modelServ.elements.next(eles);
				// parse relations
				let rels: Relation[] = [];
				text[1].forEach((value: any) => {
					let r: Relation = { 
						name: value.name, 
						srcElement: value.srcElement,
						srcAttribute: value.srcAttribute,
						trgElement: value.trgElement,
						trgAttribute: value.trgAttribute,
						cardinality: value.cardinality
					} as Relation;
					rels.push(r);
				});
				this.modelServ.relations.next(rels);
			};
			reader.readAsText(this.modelFileInput.nativeElement.files[0]);
		}
	}

	onSaveModel(event:any){
		event.preventDefault();
		/* convert model to text */
		let elementsText = JSON.stringify(this._elements);
		let relationTexs = JSON.stringify(this._relations);
		let objectUrl = URL.createObjectURL(new Blob([`[${elementsText}],[${relationTexs}`], {type: "text/text"}));
		const a = document.createElement('a');
		a.download = `model.txt`;
		a.href = objectUrl;
		a.click();
		URL.revokeObjectURL(objectUrl);	
	}

	onAddElement(event: any) {
		event.preventDefault(); // don't refresh the page
		if( this.elementName.valid )
			this.modelServ.addElement({ name: this.elementName.value, attributes: [] });
		else
			this.snackBar.open('The name for the new element is invalid', 'Close');
	}
}
