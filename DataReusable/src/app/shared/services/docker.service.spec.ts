import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DockerService } from './docker.service';

describe('DockerService', () => {
  let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let service: DockerService;
	
  beforeEach(() => {
    service = new DockerService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});