import { DataObject, ELEMENT_DATA } from './datamodel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datareuse-parser',
  templateUrl: './datareuse-parser.component.html',
  styleUrls: ['./datareuse-parser.component.css']
})
export class DatareuseParserComponent implements OnInit {
	
	public infoFile: boolean = true;
	public relFile: boolean = false;

	public dataModel: DataObject[] = [];

	// loading of information needs to be followed in a linear way
	public isLinear: boolean = true;

	// form used to control the selection of the uploading file and its
	// type
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
		this.dataModel = ELEMENT_DATA;
	}

	/**
	 * Method executed when a file is selected from the corresponding dialog
	 */
	onChangeFileInput(): void {
		const files: { [key: string]: File } = this.fileInput.nativeElement.files;
		this.fileForm.get('fileName')?.setValue(files[0].name);
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
