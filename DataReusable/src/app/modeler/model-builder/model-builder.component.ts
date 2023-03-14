import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { DockerService } from 'src/app/shared/services/docker.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Element } from 'src/app/shared/models/element'; 
import { Attribute } from 'src/app/shared/models/attribute';
import { Relation } from 'src/app/shared/models/relation';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';

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
		private readonly dockerService: DockerService,
		public dialog: MatDialog
	) { }

  ngOnInit(): void {
		this.modelServ.elements.subscribe(data => this.elements = data );
		this.modelServ.relations.subscribe(data => this.relations = data );
  }

	onLoadModel(event:any){
		event.preventDefault();
		// use a hidden html input to select a file and load it
		// on selection of file onFileSelected method is triggered
		this.modelFileInput.nativeElement.click(); 
	}

	onFileSelected(event: any){
		if (typeof (FileReader) !== 'undefined') {
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
				this.modelServ.elements.next(eles);
				// parse relations
				let rels: Relation[] = [];
				text.relations.forEach((value: any) => {
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

	onExportModel(event:any){
		event.preventDefault();
		/* convert model to text */
		let elementsText = JSON.stringify(this.elements);
		let relationText = JSON.stringify(this.relations);
		let objectUrl = URL.createObjectURL(new Blob([`{\n\t"elements": ${elementsText},\n\t"relations": ${relationText}\n}`], {type: "text/text"}));
		const a = document.createElement('a');
		a.download = `model.txt`;
		a.href = objectUrl;
		a.click();
		URL.revokeObjectURL(objectUrl);	
	}

	onFinishModel(event:any){
		event.preventDefault();
		/* run container with postgres database */
		

		const dialogRef =  this.dialog.open(
			FinishModelDialogComponent,
			<MatDialogConfig<any>>{
				restoreFocus: false
			}
		)
		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined){
				this.dockerService.addElements(this.elements)
					.subscribe((data) => {
						console.log('step1',data);
					});
				}
		})

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
				this.modelServ.addElement(result);	
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