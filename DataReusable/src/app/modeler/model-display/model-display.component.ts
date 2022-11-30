import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { DataObject } from '../../shared/models/datamodel';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	// elements required for table display
	@ViewChild(MatTable, {static: true}) paginator!: MatTable<DataObject>;
	
	public dataModel!: Record<string, DataObject>;
	dataSource = new MatTableDataSource<DataObject>();
  displayedColumns: string[] = ['name'];

	constructor(
		private readonly modelServ: ShareModelService
	) { }

  ngOnInit(): void {
		this.modelServ.getDataModel().subscribe( data => {
			this.dataModel = data;
			console.log(`model-display ${Object.keys(this.dataModel).length}`);
			this.dataSource = new MatTableDataSource<DataObject>(Object.values(this.dataModel));
		})
	}

}
