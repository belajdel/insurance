import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenStorageService} from "../services/token-storage.service";

export const roleGuard: CanActivateFn = (route, state) => {
  return  route.data?.['role'].includes(inject(TokenStorageService).getUser()?.role) ? true : inject(Router).navigate(['/dashboard'])
};
