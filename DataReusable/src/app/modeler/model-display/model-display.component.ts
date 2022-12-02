import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { Element } from '../../shared/models/element';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.css']
})
export class ModelDisplayComponent implements OnInit{

	// elements required for table display
	@ViewChild(MatTable, {static: true}) paginator!: MatTable<Element>;
	
	public dataModel!: Record<string, Element>;
	dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['name', 'attributes'];

	constructor(
		private readonly modelServ: ShareModelService
	) { }

  ngOnInit(): void {
		this.modelServ.getDataModel().subscribe( data => {
			this.dataModel = data;
			console.log(`model-display ${Object.keys(this.dataModel).length}`);
			this.dataSource = new MatTableDataSource<Element>(Object.values(this.dataModel));
		})
	}

}
