import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { FilePreviewService } from 'src/app/shared/services/file-preview.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class DataLoaderComponent implements OnInit {

	@ViewChild('loadFileInput')
	loadFileInput !:ElementRef;
	inputFileForm = new FormGroup({
		fileName: new FormControl('', Validators.required),
		includeColumnNames: new FormControl(this.filePreviewService.includeColumnNames)
	});
	
	@ViewChild('previewTable')
	previewTable!: MatTable<string[]>
	previewTableData: MatTableDataSource<string> = new MatTableDataSource<string>([]);
	previewTableColumns: string[] = [];

	modelComponent: FormControl = new FormControl<string>('Element');
	
  constructor(
		private readonly modelServ: ShareModelService,
		private readonly databaseService: DatabaseService,
		public readonly filePreviewService: FilePreviewService	
	) { }

  ngOnInit(): void {
		this.filePreviewService.previewData$.subscribe(data => this.previewTableData = data);
		this.filePreviewService.previewColumns$.subscribe(data => this.previewTableColumns = data);
		
		const f = this.filePreviewService.fileName;
		if (f !== undefined )
			this.inputFileForm.patchValue({fileName: f});
	}

	onInputFileChange(){
		const inputFile = this.loadFileInput.nativeElement.files[0];
		this.inputFileForm.patchValue({fileName: inputFile.name});
		this.filePreviewService.loadFile(inputFile);		
	// 	if (typeof(FileReader) === 'undefined') throw new Error('FileReader undefined');

	// 	this.inputFile = this.loadFileInput.nativeElement.files[0];
	// 	this.inputFileForm.patchValue({fileName: this.inputFile.name});
	// 	const reader = new FileReader();
	// 	reader.onload = (e:any) => {
	// 		this.input = e.target.result.trim().split('\n');
	// 		this.filePreviewService.parsePreview();
	// 	};
	// 	reader.onerror = (error: any) => {
	// 		this.input = error;
	// 		console.log(error);
	// 	}
	// 	reader.readAsText(this.inputFile);
	}


}
