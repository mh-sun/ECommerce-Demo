import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logStatus = new BehaviorSubject<boolean>((localStorage.getItem('loggedUser')!==null));

  public getLogStatus(){
    return this._logStatus
  }

  logIn(user:any){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    this._logStatus.next(true)
  }
  logout(){
    localStorage.removeItem('loggedUser')
    this._logStatus.next(false)
  }
}
