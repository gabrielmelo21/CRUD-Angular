import { TestBed } from '@angular/core/testing';

import { ImgStorageService } from './img-storage.service';

describe('ImgStorageService', () => {
  let service: ImgStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
