import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public userSubscription:any
  // private _logStatus = new BehaviorSubject<boolean>((localStorage.getItem('loggedUser')!==null));
  public loggedUser = new BehaviorSubject<User|null>(null)

  constructor(private http:HttpClient){
    let str = localStorage.getItem('loggedUser')
    if(str === null){
      this.loggedUser.next(null)
      // this._logStatus.next(false)
    }
    else{
      this.loggedUser.next(JSON.parse(str))
      // this._logStatus.next(true)
    }
  }

  private url = 'http://localhost:3000/'
    
  getUsers(){
      let link = this.url + 'users'
      return this.http.get<User[]>(link)
  }

  Registration(user: User){
      let link = this.url + 'users'
      return this.http.post(link, user);
  }

  // public getLogStatus(){
  //   return this._logStatus
  // }

  logIn(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    // this._logStatus.next(true)
    this.loggedUser.next(user)
    
  }
  logout(){
    localStorage.removeItem('loggedUser')
    // this._logStatus.next(false)
    this.loggedUser.next(null)
  }
  storeUser(user:User|null){
    if(user === null) return
    localStorage.setItem('loggedUser', JSON.stringify(user))
  }
}
