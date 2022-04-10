import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public userSubscription:any
  public loggedUser = new BehaviorSubject<User|null>(null)

  private url = 'http://localhost:3000/'

  constructor(private http:HttpClient){
    let str = localStorage.getItem('loggedUser')
    if(str === null){
      this.loggedUser.next(null)
    }
    else{
      this.loggedUser.next(JSON.parse(str))
    }
    this.loggedUser.subscribe(user=>{
      this.storeUser(user)
      http.put<User>(this.url+'users/'+user?.id, user).subscribe(res=>{console.log(res)})
    })
  }
    
  getUsers(){
      let link = this.url + 'users'
      return this.http.get<User[]>(link)
  }

  Registration(user: User){
      let link = this.url + 'users'
      return this.http.post(link, user);
  }

  logIn(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    this.loggedUser.next(user)
    
  }
  logout(){
    localStorage.removeItem('loggedUser')
    this.loggedUser.next(null)
  }
  storeUser(user:User|null){
    if(user === null) return
    localStorage.setItem('loggedUser', JSON.stringify(user))
  }
}
