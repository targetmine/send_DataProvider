import { ChangeDetectionStrategy, Component, Directive, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
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
	protected _model: Record<string, Element> = {};
	get model(): Record<string, Element> { return this._model; }

	// elements required for table display
	@ViewChild(MatTable, {static: true}) modelTable!: MatTable<Record<string,Element>>;
	protected _modelTableSource = new MatTableDataSource<Element>();
	get modelTableSource(): MatTableDataSource<Element> {return this._modelTableSource; }
  protected _displayedColumns: string[] = ['elements','attributes','relations'];
	get displayedColumns(): string[] { return this._displayedColumns; }

	constructor(
		protected readonly _modelServ: ShareModelService,
		public dialog: MatDialog
	) { }

	get modelServ(): ShareModelService { return this._modelServ; }

  ngOnInit(): void {
		// this.modelServ.dataModel.subscribe(data => {
		// 	this._model = data;
		// 	this._modelTableSource = new MatTableDataSource<Element>(Object.values(this._model));
		// });
		let e1: Element = new Element('gene');
		e1.addAtribute('id', new Attribute('string', true));
		e1.addAtribute('other', new Attribute('number'));
		let e2: Element = new Element('ab40');
		// 	name: 'gene',
		// 	attributes: {
		// 		id: <Attribute>{ type: 'string', unique: true },
		// 		other: <Attribute>{ type: 'number', unique: false }
		// 	}
		// }
		
		this._model = {'gene': e1, 'ab40': e2};
		
		// gene: lement>{
				
		// 	},
		// 	ab40: <Element>{
		// 		name: 'ab40',
		// 		attributes: {
		// 			gene: <Attribute>{ type: 'string', unique: true },
		// 			value: <Attribute>{ type: 'number', unique: false }
		// 		}
		// 	}
		// };
		this._modelTableSource = new MatTableDataSource<Element>(Object.values(this._model));
	}

	/**
	 * 
	 */
	onRemoveElement(name: string){
		this._modelServ.removeElement(name);
	}

	/**
	 * 
	 * @param name the name of the element being edited 
	 */
	onDisplayRenameElement(name: string){
		const dialogRef = this.dialog.open(ElementRenameDialog, <MatDialogConfig<any>>{	name: name, restoreFocus: false });
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined )
				this._modelServ.renameElement(name, result);
		});
	}

	onAddAttribute(name: string){

	}

	onDisplayEditAttribute(name: any){

	}

	onRemoveAttribute(name: any){
		let s = name as string;
	}

	isUnique(value: any): boolean{
		console.log('enter', value.unique);
			return value.unique;
		
	}

	log(msg: any){
		console.log(msg);
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

}

@Component({
	selector: 'element-rename-dialog',
	templateUrl: 'element-rename-dialog.html',
})
export class ElementRenameDialog {
	newName: FormControl = new FormControl('', 
		Validators.compose([
			Validators.required,
			Validators.pattern('[a-zA-Z]*')
		])
	);

	constructor(
		public dialogRef: MatDialogRef<ElementRenameDialog>,
		@Inject(MAT_DIALOG_DATA) public name: string
	){
		this.newName.setValue(name);
	}

	onCancel(): void{
		this.dialogRef.close(undefined);
	}
}

