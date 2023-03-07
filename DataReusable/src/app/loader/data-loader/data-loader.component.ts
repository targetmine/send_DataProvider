import { Component, OnInit } from '@angular/core';
import { DockerService } from 'src/app/shared/services/docker.service';
import { ShareModelService } from 'src/app/shared/services/share-model.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css']
})
export class DataLoaderComponent implements OnInit {

  constructor(
		private readonly modelServ: ShareModelService,
		private readonly dockerService: DockerService,
	) { }

  ngOnInit(): void {
  }

	onSaveDB(event: any){
		event.preventDefault();
		this.dockerService.commitDataContainer()
			.subscribe((data) => {
				console.log('Database commited');
			});
	}

	loadElement(event: any){
		console.log(`Captured loadElement: ${event}`);
	}

}
