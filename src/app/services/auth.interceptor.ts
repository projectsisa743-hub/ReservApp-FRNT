import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Recuperar el token
  const token = localStorage.getItem('token');

  // 2. Si existe, clonar la petición y agregar el header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 3. Si no hay token, pasar la petición normal
  return next(req);
};