import { ChangeDetectionStrategy, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementRenameDialogComponent } from '../element-rename-dialog/element-rename-dialog.component';
import { AddAttributeDialogComponent } from '../add-attribute-dialog/add-attribute-dialog.component';
import { AddRelationDialogComponent } from '../add-relation-dialog/add-relation-dialog.component';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelDisplayComponent implements OnInit{
	// the current model 
	protected _model: Element[] = [];
	set model(eles: Element[]) { this._model = eles; }
	
	// elements required for table display
	@ViewChild(MatTable, {static: true}) modelTable!: MatTable<Element[]>;
	
	protected _displayedColumns: string[] = ['elements','attributes','relations'];
	get displayedColumns(): string[]{ return this._displayedColumns; }
	
	constructor(
		protected readonly _modelServ: ShareModelService,
		public dialog: MatDialog
	) { }

	get modelServ(): ShareModelService { return this._modelServ; }

	ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
			if(this._model.length > 0) this.modelTable.renderRows();
		});
	}

	onRenameElement(name: string){
		const dialogRef = this.dialog.open(
			ElementRenameDialogComponent, 
			<MatDialogConfig<any>>{	
				data: ['Element', name],
				restoreFocus: false 
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined ){
				this._modelServ.renameElement(name, result);
			}		
		});
	}

	onAddAttribute(name: string){
		const dialogRef = this.dialog.open(
			AddAttributeDialogComponent, 
			<MatDialogConfig<any>>{ element: name, restoreFocus: false }
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined ){
				this._modelServ.addAttribute(name, result);
			}
		})
	}

	onRemoveElement(name: string){
		const dialogRef = this.dialog.open(
			RemoveElementDialogComponent,
			<MatDialogConfig<any>>{
				data: 'Element',
				restoreFocus: false}
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result ){ //true
				this._modelServ.removeElement(name);
			}
		});
	}

	onRenameAttribute(elementName: string, attributeName: string){
		const dialogRef = this.dialog.open(
			ElementRenameDialogComponent,
			<MatDialogConfig<any>>{
				data: ['Attribute', attributeName],
				restoreFocus: false
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			if(result !== undefined)
				this._modelServ.renameAttribute(elementName, attributeName, result);
		})
	}

	onRemoveAttribute(elementName: string, attributeName: string){
		const dialogRef = this.dialog.open(
			RemoveElementDialogComponent,
			<MatDialogConfig<any>>{
				data: 'Attribute',
				restoreFocus: false
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			if(result) //true
				this._modelServ.removeAttribute(elementName, attributeName);
		})
	}

	onToggleUnique(elementName: string, attributeName: string){
		this._modelServ.toggleUnique(elementName, attributeName);
	}

	/** TODO */
	onAddRelation(srcEle:string ){
		// const dialogRef = this.dialog.open(
		// 	AddRelationDialogComponent, 
		// 	<MatDialogConfig<any>>{ src_element: srcEle, restoreFocus: false }
		// );
		// dialogRef.afterClosed().subscribe(result => {
		// 	if( result !== undefined ){
		// 		this._modelServ.addRelation();
		// 	}
		// })
	}

}


@Component({
	selector: 'remove-element-dialog',
	template: `<h1 mat-dialog-title>Remove {{type}}:</h1>
	<div mat-dialog-content>
		<p *ngIf="type === 'Element'">
			Do you really want to remove the element and all of its attributes and 
			relations?
		</p>
		<p *ngIf="type === 'Attribute'">
			Do you really want to remove the attribute and all of its relations?
		</p>
	</div>
	<div mat-dialog-actions>
			<button mat-button
				(click)="this.dialogRef.close(false)"
			>Cancel
			</button>
			<button mat-button
				(click)="this.dialogRef.close(true)"
			>OK
			</button>
		</div>
	`
})
export class RemoveElementDialogComponent{
	protected type!: string;
	constructor(
		public dialogRef: MatDialogRef<RemoveElementDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string
	){
		this.type = data;
	}
}