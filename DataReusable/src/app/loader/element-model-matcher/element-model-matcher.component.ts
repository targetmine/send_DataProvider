import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Element } from 'src/app/shared/models/element';
import { DockerService } from 'src/app/shared/services/docker.service';
import { FilePreviewService } from 'src/app/shared/services/file-preview.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-element-model-matcher',
  templateUrl: './element-model-matcher.component.html',
  styleUrls: ['./element-model-matcher.component.css']
})
export class ElementModelMatcherComponent implements OnInit {
	previewTableColumns: string[] = [];

	@ViewChild('elementTable')
	elementTable!: MatTable<Element[]>;
	elementTableData: MatTableDataSource<Element> = new MatTableDataSource<Element>();
	elementTableColumns: string[] = ['elements', 'attributes'];

	elementForm = new FormGroup({});

  constructor(
		public readonly modelService: ShareModelService,
		public readonly dockerService: DockerService,
		public readonly filePreviewService: FilePreviewService
	) { }

  ngOnInit(): void {
		this.filePreviewService.previewColumns$.subscribe(data => this.previewTableColumns = data);
		
		this.modelService.elements.subscribe(data => {
			this.elementTableData = new MatTableDataSource<Element>(data);
			this.elementForm = new FormGroup({});
			for (const ele of data){
				for (const attr of ele.attributes){
					let control = new FormControl('None');
					if (attr.unique)
						control.addValidators(Validators.required);
					this.elementForm.addControl(`${ele.name}_${attr.name}`, control);
				}
			}
		});
  }

	onSubmit() {
		this.elementTableData.data.forEach(ele =>{
			
			let idx: number[] = []; 
			let pkeys: string[] = [];
			let cols: string[] = [];
			ele.attributes.forEach((attr) => {
				const col: string | undefined = this.elementForm.get(`${ele.name}_${attr.name}`)?.value;
				if ( col !== undefined && col !== 'None'){
					if(attr.unique) pkeys.push(attr.name);
					cols.push(attr.name);
					idx.push(this.previewTableColumns.indexOf(col));
				}
			});

			if (cols.length > 0){
				console.log(ele.name);
				console.log(idx, pkeys, cols);
			
				const firstRow = this.filePreviewService.includeColumnNames ? 1 : 0;
				const filteredData = this.filePreviewService.fileData?.slice(firstRow).map(row => {
					const values = row.split(',');
					let r = [];
					for (const i of idx)
						r.push(values[i])
					return r;
				});

				console.log(filteredData);

				this.dockerService.uploadElement(ele.name, pkeys, cols, filteredData)
				.subscribe(response =>{
					console.log(response);
				});
			}	
		});
	}
}
