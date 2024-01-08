import { TestBed } from '@angular/core/testing';

import { MaintainanceService } from './maintainance.service';

describe('MaintainanceService', () => {
  let service: MaintainanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
