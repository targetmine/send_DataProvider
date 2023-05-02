import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Relation } from 'src/app/shared/models/relation';
import { Attribute } from 'src/app/shared/models/attribute';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { FilePreviewService } from 'src/app/shared/services/file-preview.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { AttributeType } from 'src/app/shared/models/attribute';

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
		const elements = this.modelService.elements.value;
		const relations = this.modelService.relations.value;
		relations.map(rel => {
			const src_col = this.relationForm.get(`${rel.name}_src`)?.value;
			const trg_col = this.relationForm.get(`${rel.name}_trg`)?.value;
			
			if( src_col && trg_col ){
				const idx = [
					this.previewTableColumns.indexOf(src_col),
					this.previewTableColumns.indexOf(trg_col),				
				];
				const fr = this.filePreviewService.includeColumnNames ? 1 : 0;
				const data = this.filePreviewService.fileData?.slice(fr);
				switch (rel.cardinality){
					case 'one to one': {	
						const pkeys = [rel.srcAttribute];
						let columns = [rel.srcAttribute];
						let types: AttributeType[] = [];
						elements
							.filter (e => e.name === rel.trgElement)
							.reduce((e,c) => [...e, ...c.attributes], [] as Attribute[])
							.forEach(a => { 
								if(a.unique){ 
									columns.push(`${rel.trgElement}_${a.name}`);
									types.push(a.type);
								}
							});
						const filteredData = data?.map(row => {
							const values = row.split(',');
							let r: any[] = [];
							idx.forEach((i,j) => {
								if( types[j] === 'text' || types[j] === 'varchar(40)')
									r.push(`'${values[i]}'`);
								else
									r.push(`'${values[i]}'`);
							});
							return r;
						});
					
						this.databaseService.uploadElement(
							rel.srcElement,
							pkeys,
							columns,
							filteredData
						)
						.then(response => console.log(response))
						.catch(error => console.error(error))
						;
					}
					
				}
			}	
		});
			
	}
}
