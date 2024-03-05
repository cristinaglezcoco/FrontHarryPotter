import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core'

export const authorizedGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  if(!token){
    router.navigate(['/login'])
    return false
  }
  return true
};
