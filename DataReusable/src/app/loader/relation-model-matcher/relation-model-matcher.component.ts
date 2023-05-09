import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Relation } from 'src/app/shared/models/relation';
import { Attribute } from 'src/app/shared/models/attribute';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { FilePreviewService } from 'src/app/shared/services/file-preview.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { AttributeType } from 'src/app/shared/models/attribute';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-relation-model-matcher',
  templateUrl: './relation-model-matcher.component.html',
  styleUrls: ['./relation-model-matcher.component.css']
})
export class RelationModelMatcherComponent implements OnInit {
	previewTableColumns: string[] = [];

	@ViewChild('relationsTable')
	relationTable!: MatTable<Relation[]>;
	relationTableData: MatTableDataSource<Relation> = new MatTableDataSource<Relation>([]);
	relationTableColumns: string[] = ['source', 'srcElement', 'target','trgElement'];

	relationForm: FormRecord<FormControl<string | null >> = new FormRecord({});

  constructor(
		private readonly modelService: ShareModelService,
		private readonly databaseService: DatabaseService,
		private readonly filePreviewService: FilePreviewService
	) { }

  ngOnInit(): void {
		this.filePreviewService.previewColumns$.subscribe(data => this.previewTableColumns = data);

		this.modelService.relations.subscribe(data =>{
			this.relationTableData = new MatTableDataSource<Relation>(data);
			data.forEach((r: Relation) => {
				this.relationForm.setControl(`${r.name}_src`, new FormControl());
				this.relationForm.addControl(`${r.name}_trg`, new FormControl());
			});
		})
  }

	onSubmit(): void {
		// all the relations in the model 
		const relations = this.modelService.relations.value;
		relations.map(rel => {
			const src_col = this.relationForm.get(`${rel.name}_src`)?.value;
			const trg_col = this.relationForm.get(`${rel.name}_trg`)?.value;
			// for which relation in the model am I trying to upload data	
			if( src_col && trg_col ){	
				const src_idx = this.previewTableColumns.indexOf(src_col); //index of source column
				const trg_idx = this.previewTableColumns.indexOf(trg_col); //index of target column
				const use_fr = this.filePreviewService.includeColumnNames ? 1 : 0;		
				switch (rel.cardinality){
					case 'one to one': {	
						this.uploadOneToOne(rel, src_idx, trg_idx, use_fr)
							.then(response => console.log(response))
							.catch(error => console.error(error));
						break;
					}
					case 'one to many': {
						this.uploadOneToMany(rel, src_idx, trg_idx, use_fr)
							.then()
							.catch(error => console.error(error));
						break;
					}
					case 'many to many': {
						// const pkeys = [`src_${rel.srcAttribute}`, `trg_${rel.trgAttribute}`];
						// let columns = [`src_${rel.srcAttribute}`, `trg_${rel.trgAttribute}`];
						// let types: AttributeType[] = [];
						// const filteredData = data?.map(row => {

						// });
						// this.databaseService.uploadElement(
						// 	element,
						// 	pkeys,
						// 	columns,
						// 	filteredData
						// )
						break;
					}
				}
			}	
		});	
	}

	uploadOneToOne(rel: Relation, src_idx: number, trg_idx: number, use_fr: number): 
		Promise<HttpResponse<Object>> {
		
		const data = this.filePreviewService.fileData?.slice(use_fr);
		const pkeys: string[] = [rel.srcAttribute];
		const columns: string[] = [rel.srcAttribute, `${rel.trgElement}_${rel.trgAttribute}`];
		
		const filteredData = data?.map(row => {
			const values = row.split(',');
			return [`'${values[src_idx]}'`, `'${values[trg_idx]}'`];
		});
	
		return this.databaseService.uploadElement(
			rel.srcElement, // to which element we are loading
			pkeys, // what are the primary keys of the element
			columns, // what columns are we loading
			filteredData // and the data.. each row contains value for pkeys and columns
		);
	}

	uploadOneToMany(rel: Relation, src_idx: number, trg_idx: number, use_fr: number): 
		Promise<HttpResponse<Object>> {
		
		const data = this.filePreviewService.fileData?.slice(use_fr);
		const pkeys: string[] = [rel.trgAttribute];
		const columns: string[] = [rel.trgAttribute, `${rel.srcElement}_${rel.srcAttribute}`];
		const filteredData = data?.map(row => {
			const values = row.split(',');
			return [`'${values[trg_idx]}'`, `'${values[src_idx]}'`];
		});

		return this.databaseService.uploadElement(
			rel.trgElement, // to which element we are loading
			pkeys, // what are the primary keys of the element
			columns, // what columns are we loading
			filteredData // and the data.. each row contains value for pkeys and columns
		);
}
}
