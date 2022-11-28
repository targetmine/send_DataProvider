import { TestBed } from '@angular/core/testing';

import { ShareModelService } from './share-model.service';

describe('ShareModelService', () => {
  let service: ShareModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
