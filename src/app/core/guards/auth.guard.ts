import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../models/user.model';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private user:User|null = null
  constructor(private router:Router, private logger:LogService){
    this.logger.loggedUser.subscribe({
      next:(u)=>{        
        this.user = u
      }
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(this.user !== null){
        return true
      }
      else{
        this.router.navigate(['/auth/login'])
        return false
      }
  }
}
