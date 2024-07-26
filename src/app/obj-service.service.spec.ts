import { TestBed } from '@angular/core/testing';

import { ObjServiceService } from './obj-service.service';

describe('ObjServiceService', () => {
  let service: ObjServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
