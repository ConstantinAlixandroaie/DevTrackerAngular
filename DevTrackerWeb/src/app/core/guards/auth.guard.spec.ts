import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../features/auth/services/auth.service';

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree'], { url: '/current' });

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => TestBed.inject(AuthGuard).canActivate());

  it('should be created', () => {
    expect(TestBed.inject(AuthGuard)).toBeTruthy();
  });

  it('should allow activation if authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = executeGuard();
    expect(result).toBeTrue();
  });

  it('should redirect to login if not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const fakeUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(fakeUrlTree);

    const result = executeGuard();
    expect(result).toBe(fakeUrlTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(
      ['auth/login'],
      { queryParams: { returnUrl: '/current' } }
    );
  });
});
