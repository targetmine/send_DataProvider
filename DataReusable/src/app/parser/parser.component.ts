import { DataObject } from '../shared/models/datamodel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent implements OnInit {
	// the model that represents the data to be stored in a particular instance
	// of the application
	public dataModel: DataObject[] = [];
	
	public infoFile: boolean = true;
	public relFile: boolean = false;

	// loading of information needs to be followed in a linear way
	public isLinear: boolean = true;

	// form used to control the selection of the uploading file and its type
	fileForm = this.formBuilder.group({
		fileName: ['', Validators.required],
		fileType: ['info']
	})

	@ViewChild('fileInput') fileInput: any;
	
	/** 
	 * formBuilder: used to pack the forms on the interface
	 */
	constructor(
		private formBuilder: FormBuilder
	) { }

	/** */
  ngOnInit(): void {
		// this.dataModel = ELEMENT_DATA;
	}

	/**
	 * Method executed when a file is selected from the corresponding dialog
	 */
	onChangeFileInput(): void {
		const files: { [key: string]: File } = this.fileInput.nativeElement.files;
		this.fileForm.get('fileName')?.setValue(files[0].name);
		console.log(this.fileForm.value);
	}

	/**
	 * 
	 */
	onChangeFileTypeSelect(): void {
		this.infoFile = !this.infoFile;
		this.relFile = !this.relFile;
	}

	/**
	 * Method executed when the file selection input element of the interface is
	 * clicked
	 */
	onClickFileInput(): void {
		this.fileInput.nativeElement.click();
	}
	
}
