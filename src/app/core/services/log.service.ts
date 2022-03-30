import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private user!:User|null
  private _logStatus = new BehaviorSubject<boolean>((localStorage.getItem('loggedUser')!==null));
  public loggedUser = new BehaviorSubject<User|null>(null)

  constructor(){
    let str = localStorage.getItem('loggedUser')
    str === null ? this.loggedUser.next(null) : this.loggedUser.next(JSON.parse(str))
    this.loggedUser.subscribe({
      next: u=>this.user = u
    })
  }

  public getLogStatus(){
    return this._logStatus
  }

  logIn(user:any){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    this._logStatus.next(true)
    this.loggedUser.next(user)
  }
  logout(){
    localStorage.removeItem('loggedUser')
    this._logStatus.next(false)
    this.loggedUser.next(null)
  }
  storeUser(){
    localStorage.setItem('loggedUser', JSON.stringify(this.user))
  }
}
