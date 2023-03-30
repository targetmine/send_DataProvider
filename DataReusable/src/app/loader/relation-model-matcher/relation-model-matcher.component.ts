import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Relation } from 'src/app/shared/models/relation';
import { DockerService } from 'src/app/shared/services/docker.service';
import { FilePreviewService } from 'src/app/shared/services/file-preview.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

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
	relationTableColumns: string[] = ['source', 'target','relations'];

	relationForm = new FormGroup({});

  constructor(
		private readonly modelService: ShareModelService,
		private readonly dockerService: DockerService,
		private readonly filePreviewService: FilePreviewService
	) { }

  ngOnInit(): void {
		this.filePreviewService.previewColumns$.subscribe(data => this.previewTableColumns = data);

		this.modelService.relations.subscribe(data =>{
			this.relationTableData = new MatTableDataSource<Relation>(data);
			this.relationForm = new FormGroup({});
			for (const r of data){
				console.log(r);
				let control = new FormControl('None');
				this.relationForm.addControl(r.name, new FormControl('None'));
			}
		})
  }

	onSubmit(): void {
		throw new Error('need to implement');
	}

}
