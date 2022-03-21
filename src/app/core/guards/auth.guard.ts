import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let arr = [null, undefined, '']
      if(!arr.includes(localStorage.getItem('logStatus'))){
        return true
      }
      else{
        this.router.navigate(['/auth/login'])
        return false
      }
  }
}
