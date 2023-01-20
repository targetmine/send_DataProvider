import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from 'src/app/shared/models/element';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ElementRenameDialogComponent } from '../element-rename-dialog/element-rename-dialog.component';
import { AddAttributeDialogComponent } from '../add-attribute-dialog/add-attribute-dialog.component';

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
			<MatDialogConfig<any>>{	name: name, restoreFocus: false }
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
	// 	this._modelServ.removeElement(name);
	}

	onRenameAttribute(name: any){

	}

	onRemoveAttribute(name: any){
	// 	let s = name as string;
	}

	onToggleUnique(name: string){

	}

}

