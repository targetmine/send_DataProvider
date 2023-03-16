import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Element } from 'src/app/shared/models/element';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-upload-item-dialog',
  templateUrl: './upload-item-dialog.component.html',
  styleUrls: ['./upload-item-dialog.component.css']
})
export class UploadItemDialogComponent implements OnInit {
	elements: Element[] = [];

	type: 'Element' | 'Attribute' | 'Relation' = 'Element'
	loading: boolean = false;
	isElement: boolean = false;
	isAttribute: boolean = false;
	isRelation: boolean = false;
	options: string[];

	inputFile !: File;
	input !:string[];

	elementForm = new FormGroup({
		fileName: new FormControl('', Validators.required,),
		includeColumnNames: new FormControl(true)
	});

	@ViewChild('loadFileInput')
	loadFileInput !:ElementRef;

	@ViewChild('previewTable')
	previewTable!: MatTable<string[]>
	previewTableData: MatTableDataSource<string> = new MatTableDataSource<string>([]);
	previewTableColumns: string[] = [];
	
  constructor(
		private readonly modelServ: ShareModelService,
		public dialogRef: MatDialogRef<UploadItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	){
		this.type = data.type;
		this.isElement = data.isElement;
		this.options = data.options;
	}

  ngOnInit(): void {
		this.modelServ.elements.subscribe(data => this.elements = data);
  }

	onFileSelected(event: Event) {
		if( typeof(FileReader) === 'undefined' ) throw new Error('FileReader undefined');

		this.inputFile = this.loadFileInput.nativeElement.files[0];
		this.elementForm.patchValue({fileName: this.inputFile.name});
	}

	loadFile(){
		const reader = new FileReader();
		this.loading = true;
		reader.onload = (e:any) => {
			
			this.input = e.target.result.split('\n');
			this.parsePreview();
			this.loading = false;
		};
		reader.onerror = (error: any) => {
			this.input = error;
			console.log(error);
			this.loading = false;
		}
		reader.readAsText(this.inputFile);
	}

	parsePreview(){

		if(this.elementForm.get('includeColumnNames')?.value){
			this.previewTableColumns = this.input[0].split(',')
			this.previewTableData = new MatTableDataSource(this.input.slice(1,5));
		}
		else{
			const n = this.input[0].split(',').length;
			this.previewTableColumns = [ ...Array(n)].map((_, i) => `Column ${i}`);
			this.previewTableData = new MatTableDataSource(this.input.slice(0,4));
		}
		
	}

	onSubmit() {
		this.loading = true;
		this.dialogRef.close(undefined);
		throw Error('UPLOAD Needs to be implemented');
	}
		
	onCancel() {
		this.loading = false;
		
		this.dialogRef.close(undefined);
	}	

}
