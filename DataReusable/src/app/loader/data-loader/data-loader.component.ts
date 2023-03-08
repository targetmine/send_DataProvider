import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DockerService } from 'src/app/shared/services/docker.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';
import { UploadItemDialogComponent } from '../upload-item-dialog/upload-item-dialog.component';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css']
})
export class DataLoaderComponent implements OnInit {

	options: string[]|undefined = [];

  constructor(
		private readonly modelServ: ShareModelService,
		private readonly dockerService: DockerService,
		public dialog: MatDialog
	) { }

  ngOnInit(): void {
  }

	loadElement(event: any){
		const ele = this.modelServ.getElement(event);
		this.options = ele?.attributes.map(a => a.name);
		const dialogRef = this.dialog.open(
			UploadItemDialogComponent,
			<MatDialogConfig<any>>{
				data: {
					type: 'Element',
					isElement: true,
					options: this.options
				},
				restoreFocus: false
			}
		);
		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			// if( result !== undefined )
			// 	this.dockerService.commit(result);
		});
	}

	onSaveDB(event: any){
		event.preventDefault();
		this.dockerService.commitDataContainer()
			.subscribe((data) => {
				console.log('Database commited');
			});
	}



}
