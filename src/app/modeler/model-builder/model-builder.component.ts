import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.css'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModelBuilderComponent implements OnInit {
	// the current model used for the database
	elements: Element[] = [];
	relations: Relation[] = [];
	
	@ViewChild('modelFileInput')
	modelFileInput!: ElementRef;

	constructor(
		private readonly shareModelServ: ShareModelService,
		private readonly databaseService: DatabaseService,
		private readonly navigationService: NavigationService,
		public dialog: MatDialog,
		private router: Router
	) { }

  ngOnInit(): void {
		this.shareModelServ.elements.subscribe(data => this.elements = data );
		this.shareModelServ.relations.subscribe(data => this.relations = data );
  }

	onFileSelected(files: any): void{
		this.readFile(files[0])
			.then(text => {
				this.parseElements(text);
				this.parseRelations(text);
			});
	}

	readFile(file: File): Promise<any>{
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const data = JSON.parse(e.target.result);
				resolve(data);
			}
			reader.readAsText(file);		
		});
	}
	
	parseElements(text: { elements: Element[]; }){
			let eles: Element[] = [];
			text.elements.forEach((value: any) => {
				let t: Element = { name: value.name, attributes: [] } as Element;
				value.attributes.forEach((a:any) => t.attributes.push(a as unknown as Attribute));
				eles.push(t);
			});
			this.shareModelServ.elements.next(eles);
	}

	parseRelations(text: { relations: Relation[]; }){
		let rels: Relation[] = [];
		text.relations.forEach((value: any) => {
			let r: Relation = { 
				name: value.name, 
				srcElement: value.srcElement,
				srcAttribute: value.srcAttribute,
				srcType: value.type,
				trgElement: value.trgElement,
				trgAttribute: value.trgAttribute,
				trgType: value.trgType,
				cardinality: value.cardinality
			} as Relation;
			rels.push(r);
		});
		this.shareModelServ.relations.next(rels);
	}

	onLoadModel(event:any): void{
		event.preventDefault();
		this.modelFileInput.nativeElement.click(); 
	}

	onExportModel(event:any): void{
		event.preventDefault();
		/* convert model to text */
		let elementsText = JSON.stringify(this.elements);
		let relationText = JSON.stringify(this.relations);
		let objectUrl = URL.createObjectURL(new Blob([`{\n\t"elements": ${elementsText},\n\t"relations": ${relationText}\n}`], {type: "text/text"}));
		const a = document.createElement('a');
		a.download = `model.json`;
		a.href = objectUrl;
		a.click();
		URL.revokeObjectURL(objectUrl);	
	}

	onFinishModel(event:any): void{
		event.preventDefault();
		const dialogRef =  this.dialog.open(
			FinishModelDialogComponent,
			<MatDialogConfig<any>>{
				restoreFocus: false
			}
		)
		dialogRef.afterClosed().subscribe(result => {
			if (result === undefined) return;
			// request to create all the elements
			let eleRequests: Promise<HttpResponse<Object>>[] = [];
			for(const element of this.elements)
				eleRequests.push(this.databaseService.addElement(element));
				
			Promise.allSettled(eleRequests)
			.then(() => {
				let relRequests: Promise<HttpResponse<Object>>[] = [];
				for(const relation of this.relations)
					relRequests.push(this.databaseService.addRelation(relation));
				return Promise.allSettled(relRequests);
			})
			.then(() => {
				this.databaseService.saveModel(this.elements, this.relations);
			})
			.then(() => {
				// change to the loader tab
				this.router.navigate(['/loader']);
				this.navigationService.onTabToggleEnabled(0);
				this.navigationService.onTabToggleEnabled(1);
			})
			.catch(error => {
				console.log('finish model error');
			})
			.finally(()=>{
				console.log('finally');
			});
		});
	}

	onAddElement(event: any) {
		const dialogRef = this.dialog.open(
			AddItemDialogComponent,
			<MatDialogConfig<any>>{
				data: { type: 'Element' },
				restoreFocus: false
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined){
				this.shareModelServ.addElement(result);	
			}
		});
	}
}

@Component({
	selector: 'finish-model-dialog',
	template: `<h1 mat-dialog-title>Finish model</h1>
	<div mat-dialog-content>
		<p>You will not be able to further change the model. On completion, the system
			will proceed to the data uploading stage.</p>
		<p>If unsure, you can cancel the process and export the current model
			(Model -> Export model to file), before proceeding with the completion and
			data upload. </p>
	</div>
	<div mat-dialog-actions>
		<button mat-button
			(click)="this.dialogRef.close(undefined)"
		>Cancel
		</button>
		<button mat-button
			(click)="this.dialogRef.close(true)"
		>OK
		</button>
	</div>
`
})
export class FinishModelDialogComponent{
	constructor(
		public dialogRef: MatDialogRef<FinishModelDialogComponent>,
	) {}
}