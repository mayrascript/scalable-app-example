import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PrivateGuard } from 'src/app/core/guards/private.guard';
import { ApiService } from 'src/app/core/services/app/api/api.service';
import { createSpyObj } from 'src/app/core/utils/create-spy-obj';
import { PRIVATE_FALLBACK_URL } from 'src/app/core/constants/global-tokens';

describe('PrivateGuard', () => {
  let guard: PrivateGuard;
  let apiMock: jest.Mocked<ApiService>;

  beforeEach(() => {
    apiMock = createSpyObj(ApiService);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: PRIVATE_FALLBACK_URL, useValue: '' },
      ],
    });
    guard = TestBed.inject(PrivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
