import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { ShareModelService } from './share-model.service';

describe('DockerService', () => {
  let service: DatabaseService;
	let httpClient: HttpClient;
	let smService: ShareModelService;
	
  beforeEach(() => {
		TestBed.configureTestingModule({});
    service = new DatabaseService(httpClient, smService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});