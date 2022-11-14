import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataObject } from '../datareuse-parser/datamodel';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	// elements required for table display
	@ViewChild(MatTable, {static: true}) paginator!: MatTable<DataObject>;
	@Input() data !: DataObject[];
	dataSource = new MatTableDataSource<DataObject>();
  displayedColumns: string[] = ['name'];

	constructor() { }

  ngOnInit(): void {
			this.dataSource = new MatTableDataSource<DataObject>(this.data);
	}

}
