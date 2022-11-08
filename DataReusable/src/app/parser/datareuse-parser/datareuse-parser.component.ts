import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';

/* handling interface to use in the definition of data fields */
export interface DataField {
	name: string,
	type: string,
}

const TYPES: any[] = [
	{value: 'string'},
	{value: 'number'},
]

@Component({
  selector: 'app-datareuse-parser',
  templateUrl: './datareuse-parser.component.html',
  styleUrls: ['./datareuse-parser.component.css']
})
export class DatareuseParserComponent {
	/* currently user defined data fields */
	myDataFields: DataField[] = [];
	/** list of available data types for fields */
	types = TYPES;
	displayedColumns = ['select', 'name', 'type'];

	/* data source and currently selected elements from the data fields table */
	dataSource = new MatTableDataSource<DataField>(this.myDataFields);
	selection = new SelectionModel<DataField>(true, []);

	/* elemenents for the form used in data field definition */
	dataFieldForm = this._formBuilder.group({
		fieldName: [''],
		fieldType: ['string'],
	});

	fileForm = this._formBuilder.group({
		fileName: [''],
	});

	isLinear = false; // whether steps should be completed on sequence or not

	@ViewChild(MatTable) table!: MatTable<DataField>;
	@ViewChild('fileInput') fileInput: any;
	
	file: File | null = null;
	fileName: string | null = '';
	
	/**
	 * 
	 * @param _formBuilder 
	 */
	constructor(private _formBuilder: FormBuilder) { }

	/**
	 * 
	 */
  ngOnInit(): void {
  }

	  /** 
		 * Determine if all rows are selected by comparing whether the number of 
		 * selected elements matches the total number of rows. 
		 */
		isAllSelected() {
			const numSelected = this.selection.selected.length;
			const numRows = this.dataSource.data.length;
			return numSelected === numRows;
		}
	
		/** Selects all rows if they are not all selected; otherwise clear selection. */
		toggleAllRows() {
			if (this.isAllSelected()) {
				this.selection.clear();
				return;
			}
			this.selection.select(...this.dataSource.data);
		}
	
		/** The label for the checkbox on the passed row */
		checkboxLabel(row?: DataField): string {
			if (!row) {
				return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
			}
			return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
		}
		
		addDataField() {
			// const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
			let name = this.dataFieldForm.get('fieldName')?.value;
			name = ( name !== null && name !== undefined )? name : ''; 
			let type = this.dataFieldForm.get('fieldType')?.value;
			type = ( type !== null && type !== undefined )? type : ''; 
			this.myDataFields.push({ name, type });
			this.table.renderRows();
		}
	
		removeDataFields() {
			this.myDataFields.forEach( (ele, i) => {
				if (this.selection.isSelected(ele))
					this.myDataFields.splice(i, 1);
			});
			this.selection = new SelectionModel<DataField>(true, []);
			this.table.renderRows();
			
		}

	/**
	 * 
	 */
	onClickFileInputButton(){
		this.fileInput.nativeElement.click();
	}

	/**
	 * 
	 */
	onChangeFileInput(){
		const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
		this.fileName = this.file.name;
	}

}
