import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logStatus = new BehaviorSubject<boolean>((localStorage.getItem('loggedUser')!==null));
  public loggedUser = new BehaviorSubject<object|null>(null)

  constructor(){
    let str = localStorage.getItem('loggedUser')
    if (str === null) return
    let user = JSON.parse(str)
    this.loggedUser.next(user)
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
}
