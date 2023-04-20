import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
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
		public dialog: MatDialog,
		private router: Router
	) { }

  ngOnInit(): void {
		this.shareModelServ.elements.subscribe(data => this.elements = data );
		this.shareModelServ.relations.subscribe(data => this.relations = data );
  }

	onFileSelected(event: any){
		if (typeof (FileReader) === 'undefined') return;
		
		const reader = new FileReader();
		reader.onload = (e: any) => {
			let text = JSON.parse(e.target.result);
			// parse elements
			let eles: Element[] = [];
			text.elements.forEach((value: any) => {
				let t: Element = { name: value.name, attributes: [] } as Element;
				value.attributes.forEach((a:any) => t.attributes.push(a as unknown as Attribute));
				eles.push(t);
			});
			this.shareModelServ.elements.next(eles);
			// parse relations
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
		};
		reader.readAsText(this.modelFileInput.nativeElement.files[0]);	
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
			if (result !== undefined){
				this.router.navigate(['/loader']);
				let eleRequests: Promise<HttpResponse<Object>>[] = [];
				for(const element of this.elements)
					eleRequests.push(this.databaseService.addElement(element))
				
				Promise.allSettled(eleRequests)
					.then(value => {
						for(const v of value)
							console.log(v);
						return;
					})
					.then(() => {
						let relRequests: Promise<HttpResponse<Object>>[] = [];
						for(const relation of this.relations)
							relRequests.push(this.databaseService.addRelation(relation));
						return Promise.allSettled(relRequests);
					})
					.then(value => {
						for(const v of value)
							console.log(v);
					});
			}
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