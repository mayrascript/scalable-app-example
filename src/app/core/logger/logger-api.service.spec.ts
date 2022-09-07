import { TestBed } from '@angular/core/testing';

import { LoggerApiService } from './logger-api.service';

describe('LoggerApiService', () => {
  let service: LoggerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
