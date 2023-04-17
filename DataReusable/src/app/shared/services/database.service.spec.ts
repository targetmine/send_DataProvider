import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatabaseService } from './database.service';

describe('DockerService', () => {
  let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let service: DatabaseService;
	
  beforeEach(() => {
    service = new DatabaseService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});