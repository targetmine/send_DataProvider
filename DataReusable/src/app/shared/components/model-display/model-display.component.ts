import { ChangeDetectionStrategy, Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementRenameDialogComponent } from 'src/app/modeler/element-rename-dialog/element-rename-dialog.component';
import { AddItemDialogComponent } from 'src/app/modeler/add-item-dialog/add-item-dialog.component';
import { AddRelationDialogComponent } from 'src/app/modeler/add-relation-dialog/add-relation-dialog.component';
import { Relation } from 'src/app/shared/models/relation';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelDisplayComponent implements OnInit{
	@Input()
	editing: boolean = false;
	
	// the current model 
	protected _elements: Element[] = [];
	set elements(eles: Element[]) { this._elements = eles; };
	protected _relations: Relation[] = [];
	set relations(rels: Relation[]) { this._relations = rels; };
	
	// elements required for Element display
	@ViewChild('elementsTable') elementTable!: MatTable<Element[]>;
	protected _elementTableColumns: string[] = ['elements','attributes'];
	get displayedColumns(): string[]{ return this._elementTableColumns; }
	
	@ViewChild('relationsTable') relationTable!: MatTable<Relation[]>;
	protected _relationTableColumns: string[] = ['source', 'target', 'cardinality', 'actions'];

	constructor(
		protected readonly _modelServ: ShareModelService,
		public dialog: MatDialog
	) { }

	get modelServ(): ShareModelService { return this._modelServ; }

	ngOnInit(): void {
		this.modelServ.elements.subscribe(data => {
			this._elements = data;
			if(this._elements.length > 0) this.elementTable.renderRows();
		});
		this.modelServ.relations.subscribe(data => {
			this._relations = data;
			if(this._relations.length > 0) this.relationTable.renderRows();
		})
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
			AddItemDialogComponent, 
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
			if( result === true ){
				this._modelServ.removeElement(name);
				this._modelServ.removeRelationElement(name);
			}
		});
	}

	onUploadElement(elementName: string){
		/* TO-DO */
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
	
	onToggleUnique(elementName: string, attributeName: string){
		this._modelServ.toggleUnique(elementName, attributeName);
	}

	onAddRelation(srcEle:string, srcAttribute: string ){
		let data: any = {};
		data['srcEle'] = srcEle; 
		data['srcAttr'] = srcAttribute;
		data.targets = [];
		this._elements.forEach(v => {
			let t = { name: v.name, attributes: [] as string[] };
			v.attributes.forEach(a => {
				if (a.unique)
					t['attributes'].push(a.name);
			});
			if (t['attributes'].length > 0)
				data.targets.push(t);
		});
		const dialogRef = this.dialog.open(
			AddRelationDialogComponent, 
			<MatDialogConfig<any>>{ data: data, restoreFocus: false }
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined ){
				this._modelServ.addRelation({
					name: srcEle+result.element, 
					srcElement: srcEle, 
					srcAttribute: srcAttribute, 
					trgElement: result.element,
					trgAttribute: result.attribute, 
					cardinality: result.cardinality
				});
			}
		});
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
			if( result === true ){
				this._modelServ.removeAttribute(elementName, attributeName);
				this._modelServ.removeRelationAttribute(attributeName);
			}
		});
	}

	onUploadAttribute(elementName: string, attributeName: string){
		/* TO-DO */
	}

	onRemoveRelation(name: string){
		const dialogRef = this.dialog.open(
			RemoveElementDialogComponent,
			<MatDialogConfig<any>>{
				data: 'Relation',
				restoreFocus: false
			}
		);
		dialogRef.afterClosed().subscribe(result =>{
			if(result) this._modelServ.removeRelation(name);
		});
	}

	onUploadRelation(name:string){
		/* TO-DO */
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
		<p *ngIf="type === 'Relation'">
			Really remove the relation?
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