import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { Attribute } from 'src/app/shared/models/attribute';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelDisplayComponent implements OnInit{
	// the current model 
	protected _model: Element[] = [];
	set model(eles: Element[]) { this._model = eles; };
	
	// elements required for table display
	@ViewChild(MatTable, {static: true}) modelTable!: MatTable<Element[]>;
	protected _modelTableSource = new MatTableDataSource<Element>();
	set modelTableSource(source: MatTableDataSource<Element>) { this._modelTableSource = source; }
	protected _displayedColumns: string[] = ['elements','attributes','relations'];
	get displayedColumns(): string[]{ return this._displayedColumns; }
	
	constructor(
		protected readonly _modelServ: ShareModelService,
		// public dialog: MatDialog
	) { }

	get modelServ(): ShareModelService { return this._modelServ; }

  ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
			this._modelTableSource = new MatTableDataSource<Element>(data);
		});
		
		/* use this only for testing */
		// this._model = [
		// 	{
		// 		_name: 'gene',
		// 		_attributes: [
		// 			{ name: 'id', type: 'string', unique: true } as Attribute,
		// 			{ name: 'other', type: 'number', unique: false } as Attribute
		// 		]
		// 	} as unknown as Element,
		// 	{
		// 		_name: 'ab40',
		// 		_attributes: [
		// 			{name: 'value', type: 'number', unique: false } as Attribute
		// 		]
		// 	} as unknown as Element,
		// ];

		this._modelTableSource = new MatTableDataSource<Element>(this._model);
	}



	/**
	 * @param name the name of the element being edited 
	 */
	onRenameElement(name: string){
	// 	const dialogRef = this.dialog.open(ElementRenameDialog, <MatDialogConfig<any>>{	name: name, restoreFocus: false });
	// 	dialogRef.afterClosed().subscribe(result => {
	// 		if( result !== undefined )
	// 			this._modelServ.renameElement(name, result);
	// 	});
	}

	onAddAttribute(name: string){

	}

	onRemoveElement(name: string){
	// 	this._modelServ.removeElement(name);
	}

	onRenameAttribute(name: any){

	}

	onRemoveAttribute(name: any){
	// 	let s = name as string;
	}


		// /**
	//  * handle the addition of a single attribute to the selected element
	//  * @param event 
	//  */
	// onClickAddAttribute(event:any){
	// 	event.preventDefault();
	// 	if( this.attributeForm.valid ){
	// 		const parent = this.attributeForm.get('selectedElement')?.value;
	// 		const name = this.attributeForm.get('newAttribute')?.value;
	// 		const type = this.attributeForm.get('attributeType')?.value;
	// 		const unique = this.attributeForm.get('isUnique')?.value;
	// 		const newAttr = new Attribute(<AttributeType>type!, unique!);
	// 		this.modelServ.addAttribute(parent!, name!, newAttr);
	// 	}
	// 	else
	// 		this.snackBar.open('Some elements of the attribute definition are invalid', 'Close');

	// }

	onToggleUnique(name: string){

	}

}

// @Component({
// 	selector: 'element-rename-dialog',
// 	templateUrl: 'element-rename-dialog.html',
// })
// export class ElementRenameDialog {
// 	newName: FormControl = new FormControl('', 
// 		Validators.compose([
// 			Validators.required,
// 			Validators.pattern('[a-zA-Z]*')
// 		])
// 	);

// 	constructor(
// 		public dialogRef: MatDialogRef<ElementRenameDialog>,
// 		@Inject(MAT_DIALOG_DATA) public name: string
// 	){
// 		this.newName.setValue(name);
// 	}

// 	onCancel(): void{
// 		this.dialogRef.close(undefined);
// 	}
// }

