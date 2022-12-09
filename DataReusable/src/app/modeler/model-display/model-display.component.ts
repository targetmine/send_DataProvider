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
	// the current model 
	protected _model!: Record<string, Element>;
	get model(): Record<string, Element> { return this._model; }

	// elements required for table display
	@ViewChild(MatTable, {static: true}) modelTable!: MatTable<Element>;
	protected _modelTableSource = new MatTableDataSource<string>();
	get modelTableSource(): MatTableDataSource<string> {return this._modelTableSource; }
  protected _displayedColumns: string[] = ['name', 'attributes'];
	get displayedColumns(): string[] { return this._displayedColumns; }

	constructor(
		private readonly modelServ: ShareModelService
	) { }

  ngOnInit(): void {
		this.modelServ.dataModel.subscribe(data => {
			this._model = data;
			this._modelTableSource = new MatTableDataSource<string>(Object.keys(this._model));
		});
	}

}
