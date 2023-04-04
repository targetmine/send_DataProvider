import { ChangeDetectionStrategy, Component, OnInit, ViewChild, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementRenameDialogComponent } from 'src/app/modeler/element-rename-dialog/element-rename-dialog.component';
import { AddItemDialogComponent } from 'src/app/modeler/add-item-dialog/add-item-dialog.component';
import { Relation } from 'src/app/shared/models/relation';
import { AttributeType } from '../../models/attribute';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelDisplayComponent implements OnInit{
	// the current model 
	elements: MatTableDataSource<Element> = new MatTableDataSource<Element>();
	relations: MatTableDataSource<Relation> = new MatTableDataSource<Relation>();
	
	// table for Element display
	@ViewChild('elementsTable')
	elementTable!: MatTable<Element[]>;
	elementTableColumns: string[] = ['elements','attributes'];
	// table used for Relations display
	@ViewChild('relationsTable') 
	relationTable!: MatTable<Relation[]>;
	relationTableColumns: string[] = ['source', 'target', 'cardinality', 'actions'];

	@Input() editing: boolean = false;
	@Output()	uploadElementEmitter = new EventEmitter<string>();

	constructor(
		protected readonly modelServ: ShareModelService,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.modelServ.elements.subscribe(data => {
			this.elements = new MatTableDataSource<Element>(data);
		});
		this.modelServ.relations.subscribe(data => {
			this.relations = new MatTableDataSource<Relation>(data);
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
				this.modelServ.renameElement(name, result);
			}		
		});
	}

	onAddAttribute(name: string){
		const dialogRef = this.dialog.open(
			AddItemDialogComponent, 
			<MatDialogConfig<any>>{ 
				data: { type: 'Attribute'},
				restoreFocus: false 
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined ){
				this.modelServ.addAttribute(name, result);
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
				this.modelServ.removeElement(name);
				this.modelServ.removeRelationElement(name);
			}
		});
	}

	emitUploadElement(elementName: string){
		this.uploadElementEmitter.emit(elementName);
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
				this.modelServ.renameAttribute(elementName, attributeName, result);
		})
	}
	
	onToggleUnique(elementName: string, attributeName: string){
		this.modelServ.toggleUnique(elementName, attributeName);
	}

	onAddRelation(srcEle:string, srcAttribute: string, srcType: AttributeType ){
		let data: any = {};
		data.type = 'Relation';
		data['srcEle'] = srcEle; 
		data['srcAttr'] = srcAttribute;
		data.targets = [];
		this.elements.data.forEach(v => {
			let t = { name: v.name, attributes: [] as string[] };
			v.attributes.forEach(a => {
				if (a.unique){
					t['attributes'].push(a.name);
				}
			});
			if (t['attributes'].length > 0)
				data.targets.push(t);
		});
		const dialogRef = this.dialog.open(
			AddItemDialogComponent, 
			<MatDialogConfig<any>>{ data: data, restoreFocus: false }
		);
		dialogRef.afterClosed().subscribe(result => {
			if( result !== undefined ){
				const trgType = this.elements.data.filter(n => n.name === result.element)[0].attributes.filter(a => a.name === result.attribute)[0].type;
				let relName = `${srcEle[0]}${srcAttribute.slice(0,3)}_${result.element[0]}${result.attribute.slice(0,3)}_`;
				relName += result.cardinality === 'one to one' ? '1to1' : result.cardinality === 'many to many' ? '*to*' : '1to*';
				this.modelServ.addRelation({
					name: relName,
					srcElement: srcEle, 
					srcAttribute: srcAttribute, 
					srcType: srcType,
					trgElement: result.element,
					trgAttribute: result.attribute, 
					trgType,
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
				this.modelServ.removeAttribute(elementName, attributeName);
				this.modelServ.removeRelationAttribute(attributeName);
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
			if(result) this.modelServ.removeRelation(name);
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