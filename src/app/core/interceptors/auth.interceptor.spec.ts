import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { PUBLIC_FALLBACK_URL } from 'src/app/core/constants/global-tokens';
import { createSpyObj } from 'src/app/core/utils/create-spy-obj';

describe('AuthInterceptor', () => {
  let authMock: jest.Mocked<AuthService>;
  authMock = createSpyObj(AuthService);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authMock },
        { provide: PUBLIC_FALLBACK_URL, useValue: '' },
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
