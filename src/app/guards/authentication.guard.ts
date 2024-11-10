import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {

  let token = localStorage.getItem('SecurityKey')
  if (token) {
    return true;
  } else {
    return false
  }
};
