import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const LLService = inject(LocalStorageService);
  const token = LLService.getVariable('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
